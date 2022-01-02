import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../utils/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler()
    );
    Logger.log(requiredRole);
    if (!requiredRole) return true;
    const { user } = context.switchToHttp().getRequest();
    Logger.log(user);
    return requiredRole.some((r) => r === user.role);
  }
}

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) { }

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRole = this.reflector.get<string[]>(
//       ROLES_KEY,
//       context.getHandler()
//     );
//     Logger.log(requiredRole);
//     if (!requiredRole) return true;
//     const { user } = context.switchToHttp().getRequest();
//     Logger.log(user);
//     return requiredRole === user.role;
//   }
// }
