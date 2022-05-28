import { sqliteDb } from '../database/SqliteDb';
import { Item } from '../database/types/Item';

const getItem = async (id: string) => {
  return await sqliteDb.getRecord('SELECT * FROM items WHERE id = ?', [id]);
};

const createItem = async (item: Item) => {
  return await sqliteDb.runQuery(
    'INSERT INTO items (id, name, cost, supplier) values(?, ?, ?, ?)',
    [item.id, item.name, item.cost, item.supplier]
  );
};

export { getItem, createItem };
