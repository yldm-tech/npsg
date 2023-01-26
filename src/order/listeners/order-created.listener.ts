import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { eventConstants } from 'src/user/constants';
import { OrderCreatedEvent } from '../dto/order-created.event';

@Injectable()
export class OrderCreatedListener {
  @OnEvent(eventConstants.CREATE_ORDER_EVENT)
  handleOrderCreatedEvent(event: OrderCreatedEvent) {
    console.log(
      `listened handleOrderCreatedEvent: ${event.name} - ${event.description}`,
    );
  }
}
