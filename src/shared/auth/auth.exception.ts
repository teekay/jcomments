
import _ from 'lodash';
import { ExceptionFilter, Catch, ArgumentsHost, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(UnauthorizedException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(_ex: UnauthorizedException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<Request>()
    const flash = _.get(request, 'flash')
    flash.call(request, 'login-error', 'Oops, those credentials did not work')
    const response = ctx.getResponse<Response>();
    response.redirect('/auth/login');
  }
}

@Catch(ForbiddenException)
export class SessionExpiredFilter implements ExceptionFilter {
  catch(_ex: ForbiddenException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.redirect('/auth/login');
  }
}
