const pg = require("pg");
require('dotenv').config()

const pool = new pg.Pool(process.env);

module.exports = {
  query: (sql, params) => {
    return pool.query(sql, params);
  }
};
