import { sqliteDb } from '../database/SqliteDb';

const getCustomer = async (id: string) => {
  return await sqliteDb.getRow('SELECT * FROM customers WHERE id = ?', [id]);
};

export { getCustomer };
