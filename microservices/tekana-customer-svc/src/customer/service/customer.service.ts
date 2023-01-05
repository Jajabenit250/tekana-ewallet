import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from './jwt.service';
import {
    RegisterRequestDto,
    LoginRequestDto,
    ValidateRequestDto,
    RegCustomerRequestDto,
    RegCustomersRequestDto,
} from '../customer.dto';
import { Customer } from '../customer.entity';
import {
    LoginResponse,
    RegisterResponse,
    ValidateResponse,
    RegCustomerResponse,
    RegCustomersResponse,
} from '../customer.pb';

@Injectable()
export class CustomerService {
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>;

    @Inject(JwtService)
    private readonly jwtService: JwtService;

    public async register({
        email,
        password,
        fullName,
        nationalId,
        gender,
    }: RegisterRequestDto): Promise<RegisterResponse> {
        let customer: Customer = await this.repository.findOne({
            where: { email },
        });

        if (customer) {
            return { status: HttpStatus.CONFLICT, error: ['E-Mail already exists'] };
        }

        console.log('----');

        customer = new Customer();

        customer.email = email;
        customer.password = this.jwtService.encodePassword(password);
        customer.gender = gender;
        customer.nationalId = nationalId;
        customer.fullName = fullName;

        await this.repository.save(customer);

        return { status: HttpStatus.CREATED, error: null };
    }

    public async login({
        email,
        password,
    }: LoginRequestDto): Promise<LoginResponse> {
        const customer: Customer = await this.repository.findOne({
            where: { email },
        });

        if (!customer) {
            return {
                status: HttpStatus.NOT_FOUND,
                error: ['E-Mail not found'],
                token: null,
            };
        }

        const isPasswordValid: boolean = this.jwtService.isPasswordValid(
            password,
            customer.password,
        );

        if (!isPasswordValid) {
            return {
                status: HttpStatus.NOT_FOUND,
                error: ['Password wrong'],
                token: null,
            };
        }

        const token: string = this.jwtService.generateToken(customer);

        return { token, status: HttpStatus.OK, error: null };
    }

    public async validate({
        token,
    }: ValidateRequestDto): Promise<ValidateResponse> {
        const decoded: Customer = await this.jwtService.verify(token);

        if (!decoded) {
            return {
                status: HttpStatus.FORBIDDEN,
                error: ['Token is invalid'],
                customerId: null,
            };
        }

        const customer: Customer = await this.jwtService.validateUser(decoded.id);

        if (!customer) {
            return {
                status: HttpStatus.CONFLICT,
                error: ['User not found'],
                customerId: null,
            };
        }

        console.log(decoded.id);
        return { status: HttpStatus.OK, error: null, customerId: decoded.id };
    }

    public async findOneCustomer({
        id,
    }: RegCustomerRequestDto): Promise<RegCustomerResponse> {
        console.log('jjjjj');
        const customer: Customer = await this.repository.findOne({
            where: { id },
        });

        if (!customer) {
            return {
                data: null,
                error: ['Customer not found'],
                status: HttpStatus.NOT_FOUND,
            };
        }

        return { data: customer, error: null, status: HttpStatus.OK };
    }

    public async findAllCustomers(
        RegCustomersRequestDto,
    ): Promise<RegCustomersResponse> {
        console.log('inside ---------');
        const customerData: Customer[] = await this.repository.find({
            select: {
                id: true,
                fullName: true,
                nationalId: true,
                email: true,
                gender: true,
            },
        });
        console.log('------', customerData);

        if (!customerData) {
            return {
                data: null,
                error: ['no customer registered'],
                status: HttpStatus.NOT_FOUND,
            };
        }

        return { status: HttpStatus.OK, error: null, data: customerData };
    }
}
