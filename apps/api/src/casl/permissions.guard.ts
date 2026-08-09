import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from './casl-ability.factory/casl-ability.factory';
import { PERMISSION_CHECKER_KEY, PermissionRequirement } from './check-permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules = this.reflector.get<PermissionRequirement[]>(
      PERMISSION_CHECKER_KEY,
      context.getHandler(),
    );

    if (!rules) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    // Support businessId from headers, query, or body
    const businessId = request.headers['x-business-id'] || request.body.businessId || request.query.businessId;

    if (!user || !businessId) {
      throw new ForbiddenException('Missing user or business context. Access Denied.');
    }

    const ability = await this.caslAbilityFactory.createForUser(user.userId, businessId);

    const isAllowed = rules.every((rule) => {
      if (typeof rule === 'function') {
        const allowed = rule(ability);
        console.log(`CASL Rule Evaluation: Function rule evaluated to ${allowed}`);
        return allowed;
      }
      return rule.handle(ability);
    });

    if (!isAllowed) {
      console.log(`CASL Access Denied for User: ${user.userId}, Business: ${businessId}, Rules:`, rules);
      console.log(`User Permissions:`, ability.rules);
      throw new ForbiddenException('You do not have permission to perform this action.');
    }

    request.ability = ability;
    return true;
  }
}
