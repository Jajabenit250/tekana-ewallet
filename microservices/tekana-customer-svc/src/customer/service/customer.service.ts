import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from './jwt.service';
import { RegisterRequestDto, LoginRequestDto, ValidateRequestDto } from '../customer.dto';
import { Customer } from '../customer.entity';
import { LoginResponse, RegisterResponse, ValidateResponse } from '../customer.pb';

@Injectable()
export class CustomerService {
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>;

    @Inject(JwtService)
    private readonly jwtService: JwtService;

    public async register({ email, password }: RegisterRequestDto): Promise<RegisterResponse> {
        let customer: Customer = await this.repository.findOne({ where: { email } });

        if (customer) {
            return { status: HttpStatus.CONFLICT, error: ['E-Mail already exists'] };
        }

        customer = new Customer();

        customer.email = email;
        customer.password = this.jwtService.encodePassword(password);

        await this.repository.save(customer);

        return { status: HttpStatus.CREATED, error: null };
    }

    public async login({ email, password }: LoginRequestDto): Promise<LoginResponse> {
        const customer: Customer = await this.repository.findOne({ where: { email } });

        if (!customer) {
            return { status: HttpStatus.NOT_FOUND, error: ['E-Mail not found'], token: null };
        }

        const isPasswordValid: boolean = this.jwtService.isPasswordValid(password, customer.password);

        if (!isPasswordValid) {
            return { status: HttpStatus.NOT_FOUND, error: ['Password wrong'], token: null };
        }

        const token: string = this.jwtService.generateToken(customer);

        return { token, status: HttpStatus.OK, error: null };
    }

    public async validate({ token }: ValidateRequestDto): Promise<ValidateResponse> {
        const decoded: Customer = await this.jwtService.verify(token);

        if (!decoded) {
            return { status: HttpStatus.FORBIDDEN, error: ['Token is invalid'], customerId: null };
        }

        const customer: Customer = await this.jwtService.validateUser(decoded);

        if (!customer) {
            return { status: HttpStatus.CONFLICT, error: ['User not found'], customerId: null };
        }

        return { status: HttpStatus.OK, error: null, customerId: decoded.id };
    }
}