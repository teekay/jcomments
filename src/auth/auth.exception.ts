
import { ExceptionFilter, Catch, ArgumentsHost, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(UnauthorizedException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(_: UnauthorizedException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    request.flash('login-error', 'Oops, those credentials did not work')
    const response = ctx.getResponse<Response>();
    response.redirect('/auth/login');
  }
}

@Catch(ForbiddenException)
export class SessionExpiredFilter implements ExceptionFilter {
  catch(_: ForbiddenException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    request.flash('login-error', 'Your session has expired. Please sign in again.')
    const response = ctx.getResponse<Response>();
    response.redirect('/auth/login');
  }
}
