import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

export class RequestContext {
  readonly requestId: string;
  readonly timestamp: Date;
  readonly userId?: string;
  readonly ip: string;
  readonly userAgent: string | undefined;

  constructor(request: Request) {
    this.requestId =
      (request.headers['x-request-id'] as string) || this.generateRequestId();
    this.timestamp = new Date();
    this.userId = request.headers['user-id'] as string;
    this.ip = request.ip || 'unknown';
    this.userAgent = request.headers['user-agent'] as string | undefined;
  }

  private generateRequestId(): string {
    return uuidv4();
  }
}

export const RequestContextDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return new RequestContext(request);
  },
);
