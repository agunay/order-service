import sqlite3, { Database, Statement } from 'sqlite3';

class SqliteDb {
  private _db?: Database;

  get database() {
    if (!this._db) {
      throw new Error('Cannot access database before connecting');
    }
    return this._db;
  }

  connect(path: string) {
    this._db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.log(`Error connecting to the database: ${err}`);
      } else {
        console.log('Connected to the database...');
      }
    });
  }

  close() {
    this._db?.close((err) => {
      // console.error(err);
      throw err;
    });
  }

  getRow(sql: string, params: any[] = []) {
    try {
      return new Promise((resolve, reject) => {
        this._db?.get(sql, params, (err: Error, result: Statement) => {
          if (err) {
            return reject(err);
          } else {
            resolve(result);
          }
        });
      });
    } catch (err) {
      console.error(err);
    }
  }
}

export const sqliteDb = new SqliteDb();
