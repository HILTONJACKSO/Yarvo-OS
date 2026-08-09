import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as argon2 from 'argon2';
import * as crypto from 'crypto';
import { AppWebsocketGateway } from '../websocket/app-websocket.gateway';

@Injectable()
export class StaffService {
  constructor(
    private prisma: PrismaService,
    private websocketGateway: AppWebsocketGateway
  ) {}

  async create(businessId: string, data: any) {
    const temporaryPassword = crypto.randomBytes(4).toString('hex');
    const passwordHash = await argon2.hash(temporaryPassword);

    return this.prisma.$transaction(async (tx) => {
      let user = null;
      if (data.canSignIn) {
        if (!data.email) throw new BadRequestException('Email required for sign in');
        const existingUser = await tx.user.findUnique({ where: { email: data.email } });
        if (existingUser) throw new BadRequestException('Email already in use');

        user = await tx.user.create({
          data: {
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            passwordHash,
            mustChangePassword: data.requirePasswordChange ?? true,
          }
        });
      }

      const employee = await tx.employee.create({
        data: {
          businessId,
          userId: user?.id,
          employeeCode: data.employeeCode,
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          gender: data.gender,
          dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
          jobTitle: data.jobTitle,
          employmentType: data.employmentType,
          startDate: data.startDate ? new Date(data.startDate) : null,
          departmentId: data.departmentId,
        }
      });

      if (data.branchId) {
        await tx.employeeBranch.create({
          data: {
            employeeId: employee.id,
            branchId: data.branchId,
            isPrimary: true
          }
        });
      }

      if (data.roleId) {
        await tx.employeeRole.create({
          data: {
            employeeId: employee.id,
            roleId: data.roleId,
            branchId: data.branchId
          }
        });
      }

      await tx.userActivity.create({
        data: {
          businessId,
          action: 'Staff created',
          resource: 'staff',
          resourceId: employee.id,
          description: `Created staff account for ${employee.fullName}`
        }
      });

      this.websocketGateway.broadcast('staff.updated', { action: 'created', employee });
      this.websocketGateway.broadcast('activities.updated', { action: 'created' });

      return { employee, temporaryPassword: data.canSignIn ? temporaryPassword : null };
    });
  }

  async findAll(businessId: string) {
    return this.prisma.employee.findMany({
      where: { businessId },
      include: {
        department: true,
        branches: { include: { branch: true } },
        roles: { include: { role: true } },
        user: { select: { status: true, lastLoginAt: true } }
      }
    });
  }
}
