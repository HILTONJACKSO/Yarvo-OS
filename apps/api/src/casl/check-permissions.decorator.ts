import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { AppAbility, Action, Subjects } from './casl-ability.factory/casl-ability.factory';

export interface PermissionHandler {
  handle(ability: AppAbility): boolean;
}

type PermissionHandlerCallback = (ability: AppAbility) => boolean;
export type PermissionRequirement = PermissionHandler | PermissionHandlerCallback;

export const PERMISSION_CHECKER_KEY = 'permission_checker_params_key';
export const CheckPermissions = (...requirements: PermissionRequirement[]): CustomDecorator<string> =>
  SetMetadata(PERMISSION_CHECKER_KEY, requirements);
