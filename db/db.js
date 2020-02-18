const pg = require("pg");

const pool = new pg.Pool({ database: "flashzoo" });

module.exports = {
  query: (sql, params) => {
    return pool.query(sql, params);
  }
};
