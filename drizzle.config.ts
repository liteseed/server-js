export default {
  schema: "./src/schema.ts",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
  out: "./migrations/",
  verbose: true,
  strict: true,
}