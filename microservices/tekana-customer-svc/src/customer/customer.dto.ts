import { IsEmail, IsString, MinLength } from 'class-validator';
import {
    LoginRequest,
    RegisterRequest,
    ValidateRequest,
    RegCustomersRequest,
    RegCustomerRequest,
} from './customer.pb';

export class LoginRequestDto implements LoginRequest {
    @IsEmail()
    public readonly email: string;

    @IsString()
    public readonly password: string;
}

export class RegisterRequestDto implements RegisterRequest {
    @IsString()
    public readonly fullName: string;

    @IsString()
    public readonly nationalId: string;

    @IsString()
    public readonly gender: 'M' | 'F' | null;

    @IsEmail()
    public readonly email: string;

    @IsString()
    @MinLength(8)
    public readonly password: string;
}

export class ValidateRequestDto implements ValidateRequest {
    @IsString()
    public readonly token: string;
}

export class RegCustomersRequestDto implements RegCustomersRequest { }

export class RegCustomerRequestDto implements RegCustomerRequest {
    @IsString()
    public readonly id: number;
}
