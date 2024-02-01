import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../schema';

const client = neon(process.env.DATABASE_URL!);
const database = drizzle(client, { schema });

export default database