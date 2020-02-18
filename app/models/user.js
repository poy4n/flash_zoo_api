const db = require("../../db/db");

// select all users
function all() {
  return db.query("select id from users;");
}

// find one user by id
function findById(id) {
  return db.query("select * from users where id = $1;", [id]);
}

// find one user by id
function findByEmail(email) {
  return db.query("select * from users where id = $1;", [email]);
}

// insert email to table
function create(email) {
  return db.query("insert into users set email = $1;", [email]);
}

module.exports = {
  all: all,
  findById: findById,
  findByEmail: findByEmail,
  create: create
};
