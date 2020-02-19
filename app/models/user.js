const db = require("../../db/db");

// select all users
function allUsers() {
  return db.query("select * from users;");
}

// find one user by id
function findById(id) {
  return db.query("select * from users where id = $1;", [id]);
}

// find one user by email
function findByEmail(email) {
  return db.query("select * from users where email = $1;", [email]);
}

// insert / create email to table
function createUser(email) {
  return db.query("insert into users (email) values ($1) returning *;", [email]);

}

// insert / create email to table
function deleteUser(email) {
  return db.query("delete from users where email = $1 returning *;", [email]);
}

module.exports = {
  allUsers: allUsers,
  findById: findById,
  findByEmail: findByEmail,
  createUser: createUser,
  deleteUser: deleteUser
};