export default {
  user: process.env.DATABASE_USER || 'myuser',
  host: process.env.DATABASE_HOST || 'localhost',
  database: process.env.DATABASE_NAME || 'todo',
  password: process.env.DATABASE_PASSWORD || 'password',
  port: parseInt(process.env.DATABASE_PORT as string) || 5432,
};
