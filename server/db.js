'use strict';
let db;
const sqlite = require('sqlite3');
db = new sqlite.Database('office.db', (err) => {
  if(err) throw err;
});

exports.init = (database) => {
  db = database;
}

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


exports.listOfCounter = () => {
  return new Promise((resolve, reject) => {
    const sql = 'select * from counter';
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const counter = rows.map((e) => (
        {
          id: e.id_counter,
          officer: e.officer,
          name: e.name,
        })
      );
      resolve(counter)
      
    });

  });
};

//list of the services --> needed in the fronted when the administrator has to setup a queue 
//admin select the service from the list
exports.listOfServices = () => {
  return new Promise((resolve, reject) => {
    const sql = 'select * from service  ';

    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      
      const services = rows.map((e) => (
        {
          id: e.id_service,
          type: e.service_type,
          time: e.service_time,
          counters : []
        })
      );
      

      resolve(services)
    });
  });
};


exports.getService=(id_service) => {
  return new Promise((resolve,reject)=>{
    const sql='SELECT * FROM SERVICE WHERE id_service=?';
    db.get(sql,[id_service],(err,row)=>{
      if(err){
        reject(err);
        return;
      }
      if (row!=null || row !=undefined)
        resolve(1)
      else 
        resolve(-1)
    })
  })
}


exports.listOfCounterService = (id_service) => {
  return new Promise((resolve, reject) => {
    const sql = 'select counter from helpdesk where service = ?';
    db.all(sql, [id_service], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      const counters= rows.map(counter => (
        {
            id_counter: counter.counter,
        })
    );

    resolve(counters);
  });
})
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


exports.insertHelpDesk = (serviceId, countList) => {
  return new Promise ((resolve,reject) => {
    countList.forEach(countId => {
      const sql = 'INSERT INTO helpdesk(counter, service) VALUES(?, ?)';
      db.run(sql, [countId, serviceId], function (err) {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }
      });
    });
    resolve(1);  //everything is ok. Insert has been done
  })
}


exports.searchHelpdeskService = (service) => {
  return new Promise((resolve, reject) => {
    const sql = 'select * from helpdesk where service = ?';
    db.get(sql, [service], (err, row) => {
      if (row==null)
        resolve(-1) //errore
      else
        resolve(1) //esiste
    });

  });
};

exports.searchLastTicket = (service) => {
  return new Promise((resolve, reject) => {
    const sql = 'select max(customer_number) as max_num from ticket where service =  ?';
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
    const sql = 'INSERT INTO ticket(customer_number, service) VALUES(?,?)';
    db.run(sql, [ticket.customer_number, ticket.service], function (err) {
      if (err) {
        console.log(err)
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};


exports.deleteService=(id_service) => {
  return new Promise((resolve,reject)=>{
    const sql='DELETE FROM SERVICE WHERE id_service=?';
    db.run(sql,[id_service],function(err){
      if(err){
        reject(err);
        return;
      }else{
        const sql2='DELETE FROM TICKET WHERE service=?';
        db.run(sql2,[id_service],function(err){
          if(err){
            reject(err);
            return;
          }else{
            const sql3='DELETE FROM HELPDESK WHERE service=?';
            db.run(sql3,[id_service],function(err){
              if(err){
                reject(err);
                return;
              }else{
                resolve(true);
              }
            })
          }
        });
      }
    })
  })
}