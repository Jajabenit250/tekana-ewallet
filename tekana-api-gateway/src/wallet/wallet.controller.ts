import {
    Controller,
    Inject,
    Post,
    OnModuleInit,
    UseGuards,
    Req,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
    CreateWalletResponse,
    WalletServiceClient,
    WALLET_SERVICE_NAME,
    CreateWalletRequest,
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
}
