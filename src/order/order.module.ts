import { Module } from '@nestjs/common';
import { OrderCreatedListener } from './listeners/order-created.listener';
import { OrdersController } from './order.controller';
import { OrdersService } from './order.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrderCreatedListener],
})
export class OrderModule {}
