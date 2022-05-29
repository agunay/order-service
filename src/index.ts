import path from 'node:path';
import { app } from './app';
import { sqliteDb } from './database/SqliteDb';
import { NotFoundError } from './errors/NotFoundError';

const startService = async () => {
  try {
    sqliteDb.connect(path.join(__dirname, 'database/customers.db'));
  } catch (err) {
    console.error(err);
  }

  process.on('SIGINT', () => sqliteDb.close());
  process.on('SIGTERM', () => sqliteDb.close());
};

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.listen(3000, () => {
  console.log('Listening on 3000...');
});

startService();
