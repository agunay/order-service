import express, { NextFunction, Request, Response } from 'express';
import { param, body } from 'express-validator';
import * as controller from '../controllers/customerController';
import { validateRequest } from '../middlewares/validateRequest';

const router = express.Router();

router.get(
  '/api/customer/:id',
  [param('id').isUUID().withMessage('Customer ID needs to be a UUID')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await controller.getCustomer(req);
    res.status(200).send(data);
  }
);

router.post(
  '/api/customer',
  [
    body('email').not().isEmpty().withMessage('Email cannot be empty'),
    body('email').isEmail().withMessage('Needs to be a valid email'),
    body('given_name')
      .not()
      .isEmpty()
      .withMessage('Given name cannot be empty'),
    body('family_name')
      .not()
      .isEmpty()
      .withMessage('Family name cannot be empty'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await controller.createCustomer(req);
    res.status(201).send(data);
  }
);

export { router as customerRouter };
