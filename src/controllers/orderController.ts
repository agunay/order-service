import { Request } from 'express';
import { randomUUID } from 'crypto';
import * as orderService from '../services/orderService';

const getOrder = async (req: Request) => {
  return await orderService.getOrder(req.params.id);
};

const createOrder = async (req: Request) => {
  const now = new Date();
  const id = randomUUID();
  await orderService.createOrder(
    {
      id,
      customer_id: req.body.customer_id,
      date: now.toUTCString(),
    },
    req.body.order_items
  );
  return { id };
};

export { getOrder, createOrder };
