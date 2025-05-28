import { DataSource } from 'typeorm';
import { ToteEntity } from '../totes/entities/tote.entity';
import { config } from 'dotenv';
import * as process from 'node:process';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [ToteEntity], // Add your entities here
  synchronize: false, // For local dev, set to false in production
  logging: true, // Set to true to see SQL queries (can be verbose)
  migrations: [__dirname + '/database/migrations/**.(js|ts)'],
});
