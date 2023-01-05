import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpStatus,
    UnauthorizedException,
    Inject,
} from '@nestjs/common';
import { Request } from 'express';
import { ValidateResponse } from './customer.pb';
import { CustomerService } from './customer.service';

@Injectable()
export class CustomerGuard implements CanActivate {
    @Inject(CustomerService)
    public readonly service: CustomerService;

    public async canActivate(ctx: ExecutionContext): Promise<boolean> | never {
        const req: Request = ctx.switchToHttp().getRequest();
        const authorization: string = req.headers['authorization'];

        if (!authorization) {
            throw new UnauthorizedException();
        }

        const bearer: string[] = authorization.split(' ');

        if (!bearer || bearer.length < 2) {
            throw new UnauthorizedException();
        }

        const token: string = bearer[1];

        const { status, customerId }: ValidateResponse =
            await this.service.validate(token);

        req.user = customerId;

        if (status !== HttpStatus.OK) {
            throw new UnauthorizedException();
        }

        return true;
    }
}
