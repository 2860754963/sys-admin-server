module.exports = {
  dbPool: {
    connectionLimit: process.env.DBPOOL_LIMIT,
    host: process.env.DBPOOL_HOST,
    port: process.env.DBPOOL_PORT,
    user: process.env.DBPOOL_USER,
    password: process.env.DBPOOL_PASSWORD,
    database: process.env.DBPOOL_DATABASE,
  },
};
