import { Request, Response, NextFunction } from 'express';
import * as customerService from '../services/customerService';

const getCustomer = async (req: Request, res: Response, next: NextFunction) => {
  return await customerService.getCustomer(req.params.id);
};

export { getCustomer };
