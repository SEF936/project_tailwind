const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  findAllUsers() {
    return this.database.query(
      `select firstname,
      lastname,
      email,
      is_admin,
      creation_date, id_user from  ${this.table}`
    );
  }

  findOneUser(id) {
    return this.database.query(
      `select firstname,
    lastname,
    email,
    is_admin,
    creation_date, id_user from  ${this.table} where id_user = ?`,
      [id]
    );
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (firstname,
        lastname,
        email,
        password,
        is_admin) values (?, ?, ?, ?, ?)`,
      [user.firstname, user.lastname, user.email, user.password, user.is_admin]
    );
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set email = ? email = ? where id = ?`,
      [user.email, user.hashPassword]
    );
  }

  selectEmail(email) {
    return this.database.query(
      `select id_user, firstname, lastname, password, is_admin from ${this.table} where email = ?`,
      [email]
    );
  }
}

module.exports = UserManager;
