const db = require("../../db/db");

// select all users
function allUsers() {
  return db.query("select id from users;");
}

// find one user by id
function findById(id) {
  return db.query("select * from users where id = $1;", [id]);
}

// find one user by id
function findByEmail(email) {
  return db.query("select * from users where email = $1;", [email]);
}

// insert email to table
function createUser(email) {
  return db.query("insert into users (email) values ($1) returning * ;", [email]);
}

module.exports = {
  allUsers: allUsers,
  findById: findById,
  findByEmail: findByEmail,
  createUser: createUser
};
