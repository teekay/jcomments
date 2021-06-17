import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common'

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    return request.isAuthenticated()
  }
}
