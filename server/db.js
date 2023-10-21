'use strict';

const sqlite = require('sqlite3');
const db = new sqlite.Database('office.db', (err) => {
  if(err) throw err;
});


exports.listOfEmployee = () => {
    return new Promise((resolve, reject) => {
      const sql = 'select * from employee';
  
      db.all(sql, (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const aereo = rows.map((e) => (
          {
            id: e.id_employee,
            name: e.name,
            surname: e.surname,
            role: e.role,
          })
        );
        resolve(aereo)
        
      });

    });
};



exports.insertService = (service) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO service(type, description) VALUES(?, ?)';
    db.run(sql, [service.type, service.description], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};


exports.searchLastTicket = (service) => {
  return new Promise((resolve, reject) => {
    const sql = 'select max(customer_number) as max_num from ticket where service = ? ';
    console.log(service)
    db.get(sql, [service], (err, row) => {
      if (row.max_num==null)
        resolve(0)
      else
        resolve(row.max_num)
    });

  });
};

exports.inserTicket = (ticket) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO ticket(service, officer, customer_number, help_desk_num) VALUES(?,?,?,?)';
    db.run(sql, [ticket.service, ticket.officer, ticket.customer_number, ticket.help_desk_num], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};


