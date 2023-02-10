import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderCreatedEvent } from './dto/order-created.event';
import { eventConstants } from './order.constant';

@Injectable()
export class OrdersService {
  public orders: Order[] = [
    {
      id: 1,
      name: 'Order #1',
      description: 'Description payment #1',
    },
    {
      id: 2,
      name: 'Order #2',
      description: 'Description payment #2',
    },
  ];

  constructor(private eventEmitter: EventEmitter2) {}

  create(createOrderDto: CreateOrderDto) {
    const order = {
      id: this.orders.length + 1,
      ...createOrderDto,
    };
    this.orders.push(order);

    const orderCreatedEvent = new OrderCreatedEvent();
    orderCreatedEvent.name = order.name;
    orderCreatedEvent.description = order.description;
    this.eventEmitter.emit(
      eventConstants.CREATE_ORDER_EVENT,
      orderCreatedEvent,
    );

    return order;
  }
}
