import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './order.service';

@Controller('order')
@ApiTags('order')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @ApiOkResponse({ description: 'Create order' })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }
}
