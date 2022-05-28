import express, { NextFunction, Request, Response } from 'express';
import { param, body } from 'express-validator';
import * as controller from '../controllers/orderController';
import { validateRequest } from '../middlewares/validateRequest';

const router = express.Router();

router.get(
  '/api/order/:id',
  [param('id').isUUID().withMessage('Order ID needs to be a UUID')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await controller.getOrder(req);
    res.status(200).send(data);
  }
);

router.post(
  '/api/order',
  [
    body('customer_id').isUUID().withMessage('Customer ID needs to be a UUID'),
    body('customer_id')
      .not()
      .isEmpty()
      .withMessage('Customer ID cannot be empty'),
    body('order_items')
      .isArray()
      .withMessage('Order items needs to be an array of { order_id, item_id }'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await controller.createOrder(req);
    res.status(201).send(data);
  }
);

export { router as orderRouter };
