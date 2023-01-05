import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Customer } from '../customer.entity';
import { JwtService } from '../service/jwt.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    @Inject(JwtService)
    private readonly jwtService: JwtService;

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'forTesting',
            ignoreExpiration: true,
        });
    }

    private validate(token: string): Promise<Customer | never> {
        return this.jwtService.validateUser(token);
    }
}
