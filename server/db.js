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
