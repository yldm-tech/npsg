import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from '../dto/order-created.event';
import { eventConstants } from '../order.constant';

@Injectable()
export class OrderCreatedListener {
  @OnEvent(eventConstants.CREATE_ORDER_EVENT)
  handleOrderCreatedEvent(event: OrderCreatedEvent) {
    console.log(
      `listened handleOrderCreatedEvent: ${event.name} - ${event.description}`,
    );
  }
}
