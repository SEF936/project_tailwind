const AbstractManager = require("./AbstractManager");

class LoginManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(firstname, lastname, email, hashedPassword) {
    return this.database.query(
      `insert into ${this.table} (firstname, lastname, email, hashedPassword) values (?, ?, ?, ?)`,
      [firstname, lastname, email, hashedPassword]
    );
  }

  update(login) {
    return this.database.query(
      `update ${this.table} set email = ? email = ? where id = ?`,
      [login.email, login.hashedPassword]
    );
  }

  selectEmail(email) {
    return this.database.query(`select * from ${this.table} where email = ?`, [
      email,
    ]);
  }
}

module.exports = LoginManager;
