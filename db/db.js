const pg = require("pg");

const pool = new pg.Pool({ database: "flashzoo", user: "pt", password: "1234" });

module.exports = {
  query: (sql, params) => {
    return pool.query(sql, params);
  }
};
