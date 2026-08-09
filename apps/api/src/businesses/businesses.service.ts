import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

const DEFAULT_DEPARTMENTS = [
  'Management', 'Reception', 'Rooms', 'Restaurant', 'Kitchen', 'Bar', 'Nightclub', 
  'Beach', 'Pool', 'Events', 'Inventory', 'Finance', 'Human Resources', 'Housekeeping', 
  'Maintenance', 'Security'
];

const DEFAULT_ROLES = [
  'OWNER', 'GENERAL_MANAGER', 'RECEPTIONIST', 'CASHIER', 'WAITER', 'CHEF', 
  'BARTENDER', 'HOUSEKEEPING', 'STOREKEEPER', 'ACCOUNTANT', 'HR_MANAGER', 
  'SECURITY', 'MAINTENANCE'
];

@Injectable()
export class BusinessesService {
  constructor(private prisma: PrismaService) {}

  async setupBusinessAndBranch(userId: string, data: any) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new BadRequestException('User not found');

    return this.prisma.$transaction(async (tx) => {
      const business = await tx.business.create({
        data: {
          name: data.businessName,
          type: data.businessType,
          country: data.country,
          currency: data.currency,
          phone: data.businessPhone,
          email: data.businessEmail,
          address: data.businessAddress,
        }
      });

      // Keep BusinessMember for backward compatibility
      await tx.businessMember.create({
        data: {
          userId: userId,
          businessId: business.id,
          role: 'OWNER',
        }
      });

      const branch = await tx.branch.create({
        data: {
          businessId: business.id,
          name: data.branchName,
          code: data.branchCode,
          address: data.branchAddress,
          city: data.city,
          phone: data.branchPhone,
          email: data.branchEmail,
          timezone: data.timezone,
        }
      });

      // Seed departments
      const departmentsData = DEFAULT_DEPARTMENTS.map(name => ({
        businessId: business.id,
        name,
        code: name.toUpperCase().replace(/\s+/g, '_')
      }));
      await tx.department.createMany({ data: departmentsData });
      const departments = await tx.department.findMany({ where: { businessId: business.id } });
      const mgmtDept = departments.find(d => d.code === 'MANAGEMENT');

      // Seed roles
      const rolesData = DEFAULT_ROLES.map(name => ({
        businessId: business.id,
        name: name.replace(/_/g, ' '),
        code: name,
        isSystemRole: true
      }));
      await tx.role.createMany({ data: rolesData });
      
      const roles = await tx.role.findMany({ where: { businessId: business.id } });
      const ownerRole = roles.find(r => r.code === 'OWNER');

      const allPermissions = await tx.permission.findMany();
      if (allPermissions.length > 0 && ownerRole) {
        await tx.rolePermission.createMany({
          data: allPermissions.map(p => ({
            roleId: ownerRole.id,
            permissionId: p.id
          }))
        });
      }

      const employee = await tx.employee.create({
        data: {
          businessId: business.id,
          userId: userId,
          departmentId: mgmtDept?.id,
          employeeCode: 'EMP-001',
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          jobTitle: 'Business Owner',
          employmentType: 'Full-Time'
        }
      });

      await tx.employeeBranch.create({
        data: {
          employeeId: employee.id,
          branchId: branch.id,
          isPrimary: true
        }
      });

      if (ownerRole) {
        await tx.employeeRole.create({
          data: {
            employeeId: employee.id,
            roleId: ownerRole.id,
            branchId: null
          }
        });
      }

      return { business, branch };
    });
  }

  async getCurrentBusinesses(userId: string) {
    return this.prisma.businessMember.findMany({
      where: { userId },
      include: {
        business: {
          include: { 
            branches: {
              include: { services: true }
            }
          }
        }
      }
    });
  }

  async update(businessId: string, data: any) {
    // Basic fields
    const business = await this.prisma.business.update({
      where: { id: businessId },
      data
    });
    // In a real app we would emit web socket events here too!
    return business;
  }
}
