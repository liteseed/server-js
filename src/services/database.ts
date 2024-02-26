import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../schema';

function createDatabaseClient() {
  const connection = process.env.DATABASE_URL;
  if (connection === undefined) {
    throw Error("DATABASE_URL missing")
  }
  const client = neon(connection);
  return drizzle(client, { schema })
}

export default createDatabaseClient()
