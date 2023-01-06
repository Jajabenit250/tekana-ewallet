import {
    Controller,
    Inject,
    Post,
    OnModuleInit,
    UseGuards,
    Req,
    Get,
    Body,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
    CreateWalletResponse,
    WalletServiceClient,
    WALLET_SERVICE_NAME,
    CreateWalletRequest,
    FindOneRequest,
    FindOneResponse,
    CustomerWalletsRequest,
    CustomerWalletsResponse,
    DepositMoneyRequest,
    DepositMoneyResponse,
} from './wallet.pb';
import { CustomerGuard } from '../customer/customer.guard';
import { Request } from 'express';

@Controller('wallet')
export class WalletController implements OnModuleInit {
    private svc: WalletServiceClient;

    @Inject(WALLET_SERVICE_NAME)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.svc = this.client.getService<WalletServiceClient>(WALLET_SERVICE_NAME);
    }

    @Post()
    @UseGuards(CustomerGuard)
    private async createWallet(
        @Req() req: Request,
    ): Promise<Observable<CreateWalletResponse>> {
        const body: CreateWalletRequest = req.body;

        body.customerId = <number>req.user;

        return this.svc.createWallet(body);
    }

    @Post('/deposit')
    @UseGuards(CustomerGuard)
    private async depositMoney(
        @Body() body: DepositMoneyRequest,
    ): Promise<Observable<DepositMoneyResponse>> {
        return this.svc.depositMoney(body);
    }

    @Get('')
    @UseGuards(CustomerGuard)
    private async customerWallets(
        @Req() req: Request,
    ): Promise<Observable<CustomerWalletsResponse>> {
        const body: CustomerWalletsRequest = req.body;

        body.customerId = <number>req.user;

        return this.svc.customerWallets(body);
    }

    @Get(':accNumber')
    @UseGuards(CustomerGuard)
    private async findOne(
        @Req() req: Request,
    ): Promise<Observable<FindOneResponse>> {
        const body: FindOneRequest = { accNumber: '' };

        body.accNumber = <string>req.params.accNumber;

        return this.svc.findOne(body);
    }
}
