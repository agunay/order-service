import { sqliteDb } from '../database/SqliteDb';
import { Order } from '../database/types/Order';
import { OrderItem } from '../database/types/OrderItem';

const getOrder = async (id: string) => {
  return await sqliteDb.getRecords(
    `
      SELECT customer_id, date, item_id FROM orders 
      INNER JOIN orders_items
      ON orders.id = orders_items.order_id
      WHERE id = ?
    `,
    [id]
  );
};

const createOrder = async (order: Order, orderItems: OrderItem[]) => {
  const orderValues = `("${order.id}", "${order.customer_id}", "${order.date}")`;
  const orderItemValues: string[] = [];
  orderItems.map((orderItem) => {
    orderItemValues.push(`("${order.id}", "${orderItem}")`);
  });

  return await sqliteDb.runSerializedQuery([
    `INSERT INTO orders (id, customer_id, date) VALUES ${orderValues}`,
    `INSERT INTO orders_items (order_id, item_id) VALUES ${orderItemValues}`,
  ]);
};

export { getOrder, createOrder };
