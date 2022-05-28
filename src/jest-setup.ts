import { sqliteDb } from './database/SqliteDb';

afterAll(async () => {
  sqliteDb.close();
});
