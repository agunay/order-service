import express, { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import * as controller from '../controllers/customerController';
import { validateRequest } from '../middlewares/validateRequest';

const router = express.Router();

router.get(
  '/api/customer/:id',
  [param('id').isUUID().withMessage('Customer ID needs to be a UUID')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await controller.getCustomer(req, res, next);
    res.send(data);
  }
);

export { router as customerRouter };
