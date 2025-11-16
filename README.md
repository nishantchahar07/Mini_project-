Backend setup (Node.js + PostgreSQL)

Quick start

1. Copy `.env.example` to `.env` and fill DB connection values.
2. Install dependencies:

   npm install

3. Run migrations to create the `users` table:

   npm run migrate

4. Start server:

   npm start

Endpoints

- GET /health — basic health check
- GET /dbtest — checks DB connectivity (returns server time)
- GET /api/products — sample products controller route
