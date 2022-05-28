import express, { NextFunction, Request, Response } from 'express';
import { param, body } from 'express-validator';
import * as controller from '../controllers/itemController';
import { validateRequest } from '../middlewares/validateRequest';

const router = express.Router();

router.get(
  '/api/item/:id',
  [param('id').isUUID().withMessage('Item ID needs to be a UUID')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await controller.getItem(req);
    res.status(200).send(data);
  }
);

router.post(
  '/api/item',
  [
    body('name').not().isEmpty().withMessage('Name cannot be empty'),
    body('cost').not().isEmpty().withMessage('Cost cannot be empty'),
    body('cost').isFloat().withMessage('Cost needs to be numeric'),
    body('supplier').not().isEmpty().withMessage('Given name cannot be empty'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await controller.createItem(req);
    res.status(201).send(data);
  }
);

export { router as itemRouter };
