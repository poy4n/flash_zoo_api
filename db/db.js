const pg = require("pg");
require('dotenv').config()

const pool = new pg.Pool({ database: process.env.DATABASE });

module.exports = {
  query: (sql, params) => {
    return pool.query(sql, params);
  }
};
