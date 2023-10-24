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
        const employee = rows.map((e) => (
          {
            id: e.id_employee,
            name: e.name,
            surname: e.surname,
            role: e.role,
          })
        );
        resolve(employee)
        
      });

    });
};

//list of the services --> needed in the fronted when the administrator has to setup a queue 
//admin select the service from the list
exports.listOfService = () => {
  return new Promise((resolve, reject) => {
    const sql = 'select * from service';

    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const service = rows.map((e) => (
        {
          id: e.id_service,
          type: e.service_type,
          time: e.service_time,
        })
      );
      resolve(service)
      
    });

  });
};




exports.insertService = (service) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO service(service_type, service_time) VALUES(?, ?)';
    db.run(sql, [service.type, service.time], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};



exports.searchHelpdeskService = (service, helpdesk) => {
  
  return new Promise((resolve, reject) => {
    const sql = 'select * from helpdesk where id_helpdesk = ? and service = ?';
    db.get(sql, [helpdesk, service], (err, row) => {
      if (row==null)
        resolve(-1) //errore
      else
        resolve(1) //esiste
    });

  });
};

exports.searchLastTicket = (service, helpdesk) => {
  
  return new Promise((resolve, reject) => {
    const sql = 'select max(customer_number) as max_num from ticket t, helpdesk h  where h.id_helpdesk = ? and t.helpdesk = h.id_helpdesk and h.service = ?';
    db.get(sql, [helpdesk, service], (err, row) => {
      if (row.max_num==null)
        resolve(0)
      else
        console.log(row.max_num)
        resolve(row.max_num)
    });

  });
};

exports.inserTicket = (ticket) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO ticket(customer_number, helpdesk) VALUES(?,?)';
    db.run(sql, [ticket.customer_number, ticket.help_desk_num], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};


exports.insertHelpDesk = (helpdesk) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO HELPDESK(service, officer) VALUES(?,?)';
    db.run(sql, [helpdesk.service, helpdesk.officer], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};



