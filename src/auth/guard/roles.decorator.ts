import { SetMetadata } from '@nestjs/common';
import { UerRole } from 'src/user/Enums/Roles';
export const STATIC_ROLE = 'roles';
export const Roles = (...roles: [UerRole, ...UerRole[]]) =>
  SetMetadata(STATIC_ROLE, roles);
