import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private apiKeys = [
    '0cc175b9c0f1b6a831c399e269772661',
    '92eb5ffee6ae2fec3ad71c777531578f',
    '4a8a08f09d37b73795649038408b5f33',
  ];
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  validateRequest(request: Request): boolean {
    if (!request.headers.authorization) return false;
    if (!this.apiKeys.includes(request.headers.authorization)) return false;
    return true;
  }
}
