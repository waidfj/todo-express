import dbConfig from '@config/db.config';
import { Pool } from 'pg';

const pool = new Pool({
  user: dbConfig.user,
  host: dbConfig.host,
  database: dbConfig.database,
  password: dbConfig.password,
  port: dbConfig.port,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
