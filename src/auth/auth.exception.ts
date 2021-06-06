
import { ExceptionFilter, Catch, ArgumentsHost, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(UnauthorizedException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(_: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    request.flash('login-error', 'Wrong username or password')
    const response = ctx.getResponse<Response>();
    response.redirect('/auth/login');
  }
}
