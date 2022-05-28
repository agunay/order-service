import { sqliteDb } from '../database/SqliteDb';
import { Customer } from '../database/types/Customer';

const getCustomer = async (id: string) => {
  return await sqliteDb.getRecord('SELECT * FROM customers WHERE id = ?', [id]);
};

const createCustomer = async (customer: Customer) => {
  return await sqliteDb.runQuery(
    'INSERT INTO customers (id, email, given_name, family_name) values(?, ?, ?, ?)',
    [customer.id, customer.email, customer.given_name, customer.family_name]
  );
};

export { getCustomer, createCustomer };
