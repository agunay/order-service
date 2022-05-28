import { Request } from 'express';
import { randomUUID } from 'crypto';
import * as itemService from '../services/itemService';

const getItem = async (req: Request) => {
  return await itemService.getItem(req.params.id);
};

const createItem = async (req: Request) => {
  const id = randomUUID();
  await itemService.createItem({ id, ...req.body });
  return { id };
};

export { getItem, createItem };
