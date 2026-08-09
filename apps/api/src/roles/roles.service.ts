import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AppWebsocketGateway } from '../websocket/app-websocket.gateway';

@Injectable()
export class RolesService {
  constructor(
    private prisma: PrismaService,
    private websocketGateway: AppWebsocketGateway
  ) {}

  async findAll(businessId: string) {
    return this.prisma.role.findMany({
      where: { businessId },
      include: {
        _count: { select: { employees: true } }
      }
    });
  }

  async findOne(businessId: string, roleId: string) {
    return this.prisma.role.findFirst({
      where: { id: roleId, businessId },
      include: { permissions: { include: { permission: true } } }
    });
  }

  async create(businessId: string, data: any) {
    const role = await this.prisma.role.create({
      data: {
        businessId,
        name: data.name,
        code: data.name.toUpperCase().replace(/\s+/g, '_'),
        description: data.description,
        isSystemRole: false
      }
    });
    this.websocketGateway.broadcast('roles.updated', { action: 'created', role });
    return role;
  }

  async updatePermissions(businessId: string, roleId: string, permissionIds: string[]) {
    const role = await this.prisma.role.findFirst({ where: { id: roleId, businessId } });
    if (!role) throw new BadRequestException('Role not found');
    
    if (role.code === 'OWNER') {
      throw new BadRequestException('Cannot modify permissions for the OWNER role');
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.rolePermission.deleteMany({ where: { roleId } });
      if (permissionIds && permissionIds.length > 0) {
        await tx.rolePermission.createMany({
          data: permissionIds.map(pid => ({ roleId, permissionId: pid }))
        });
      }
      const updatedRole = await tx.role.findUnique({ where: { id: roleId }, include: { permissions: true }});
      this.websocketGateway.broadcast('roles.updated', { action: 'permissions_updated', role: updatedRole });
      return updatedRole;
    });
  }
}
