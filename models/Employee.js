// import database
const db = require("../config/database");

// membuat class Employee
class Employee {
  // buat fungsi
  static async all() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM employees";
      db.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          console.log(results);
          resolve(results);
        }
      });
    });
  }
  

  static async create(Employee) {
    const id = await new Promise((resolve, reject) => {
        const sql = "INSERT INTO employees SET ?";
        db.query(sql, Employee, (err, results) => {
            resolve(results.insertId);
        });
    });

    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM employees WHERE id = ?`;
        db.query(sql, id, (err, results) => {
            resolve(results);
        });
    });
  }

  
  static find(id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM employees WHERE id = ?`;
        db.query(sql, id, (err, results) => {
            resolve(results[0]);
        });
    });
  }

  static async update(id, data) {
    // update data
    await new Promise((resolve, reject) => {
        // query untuk update data
        const sql = "UPDATE employees SET ? WHERE id = ?";
        db.query(sql, [data, id], (err, results) => {
            resolve(results);
        });
    });

    // select data by id
    const employee = await this.find(id);
    return employee;
  }

  static async delete(id) {
    // query delete
    return new Promise((resolve, reject) => {
        // query sql
        const sql = "DELETE FROM employees WHERE id = ?";
        db.query(sql, id, (err, results) => {
            resolve(results);
        });
    });
  }

  static search(name) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM employees WHERE name LIKE '%${name}%'`;
        db.query(sql, (err, results) => {
            resolve(results);
        });
    });
  }

  static findByStatus(status) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM employees WHERE status = ?`;
        db.query(sql, status, (err, results) => {
            resolve(results);
        });
    });
  }

}

// export class Employee
module.exports = Employee;
