import { Injectable } from '@nestjs/common';
import { AbilityBuilder, createMongoAbility, MongoAbility, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { PrismaService } from '../../prisma.service';

export type Action = 'create' | 'read' | 'update' | 'delete' | 'manage' | 'suspend' | string;
export type Subjects = InferSubjects<any> | 'all' | string;
export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  constructor(private prisma: PrismaService) {}

  async createForUser(userId: string, businessId: string): Promise<AppAbility> {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    const employee = await this.prisma.employee.findFirst({
      where: { userId, businessId },
      include: {
        roles: {
          include: {
            role: {
              include: { permissions: { include: { permission: true } } }
            }
          }
        }
      }
    });

    if (!employee || employee.status !== 'ACTIVE') {
      return build({ detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects> });
    }

    const permissions = new Set<string>();
    for (const er of employee.roles) {
      if (er.role.status !== 'ACTIVE') continue;
      // Map OWNER role to all manage if not explicitly mapped
      if (er.role.code === 'OWNER') {
        permissions.add('all.manage');
      }
      for (const rp of er.role.permissions) {
        permissions.add(`${rp.permission.resource}.${rp.permission.action}`);
      }
    }

    if (permissions.has('all.manage')) {
      can('manage', 'all');
    }

    permissions.forEach(perm => {
      const [resource, action] = perm.split('.');
      if (action && resource && resource !== 'all') {
        can(action as Action, resource);
      }
    });

    return build({
      detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
