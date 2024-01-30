export default {
  schema: "./src/schema.ts",
  driver: 'neon',
  dbCredentials: {
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN
  },
  out: "./migrations/",
  verbose: true,
  strict: true,
}