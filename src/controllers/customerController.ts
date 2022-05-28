import { Request } from 'express';
import { randomUUID } from 'crypto';
import * as customerService from '../services/customerService';

const getCustomer = async (req: Request) => {
  return await customerService.getCustomer(req.params.id);
};

const createCustomer = async (req: Request) => {
  const id = randomUUID();
  await customerService.createCustomer({ id, ...req.body });
  return { id };
};

export { getCustomer, createCustomer };
