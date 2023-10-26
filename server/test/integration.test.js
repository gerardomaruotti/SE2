const request = require('supertest');
const { app } = require('../index.js');
const sqlite3 = require('sqlite3');
const dbModule = require('../db.js');
let db;

beforeAll(async () => {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(':memory:');
    const tables = [`
    CREATE TABLE IF NOT EXISTS EMPLOYEE (
      id_employee INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(25),
      surname VARCHAR(25),
      role VARCHAR(25)
    )
  `,
      `
      CREATE TABLE IF NOT EXISTS TICKET (
        id_ticket INTEGER NOT NULL,
        service INTEGER NOT NULL,
        customer_number INTEGER NOT NULL,
        PRIMARY KEY(id_ticket AUTOINCREMENT),
        FOREIGN KEY(service) REFERENCES HELPDESK(id_service)
      )
    `,
      `
    CREATE TABLE IF NOT EXISTS HELPDESK (
      counter INTEGER NOT NULL,
      service INTEGER NOT NULL,
      PRIMARY KEY(counter, service),
      FOREIGN KEY(counter) REFERENCES COUNTER(id_counter),
      FOREIGN KEY(service) REFERENCES SERVICE(id_service)
    )
  `,
      `
      CREATE TABLE IF NOT EXISTS COUNTER (
        id_counter INTEGER NOT NULL,
        officer INTEGER NOT NULL,
        name VARCHAR(25),
        PRIMARY KEY(id_counter AUTOINCREMENT),
        FOREIGN KEY(officer) REFERENCES EMPLOYEE(id_employee)
      )
    `,
      `
      CREATE TABLE IF NOT EXISTS SERVICE (
        id_service INTEGER NOT NULL,
        service_type VARCHAR(25) NOT NULL,
        service_time INTEGER NOT NULL,
        PRIMARY KEY(id_service AUTOINCREMENT)
      )
    `
    ];

    db.serialize(() => {
      tables.forEach(sql => {
        db.run(sql, (err) => {
          if (err) {
            reject(err);
            return;
          }
        });
      });
    });

    dbModule.init(db);
    resolve();
  });
});

afterAll(() => {
  db.close();
});

describe('GET employees', () => {
  afterEach((done) => {
    db.run('DELETE FROM EMPLOYEE', [], (err) => {
      if (err) {
        console.error('Error deleting employees:', err.message);
      }
      done();
    });
  });

  test('should return an empty list when retrieving a list of employees', async () => {


    const res = await request(app).get('/api/employee');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);

  });

  test('should return a non-empty list when retrieving a list of employees', async () => {
    const employees = [
      { name: 'User1', surname: 'Example1', role: 'Manager' },
      { name: 'User2', surname: 'Example2', role: 'Admin' }
    ];

    for (const emp of employees) {
      await db.run('INSERT INTO EMPLOYEE (name, surname, role) VALUES (?, ?, ?)', [emp.name, emp.surname, emp.role]);
    }


    const res = await request(app).get('/api/employee');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);

  });
});

describe('GET counter', () => {
  afterEach((done) => {
    db.run('DELETE FROM COUNTER', [], (err) => {
      if (err) {
        console.error('Error deleting counter:', err.message);
      }
      done();
    });
  });

  test('should return an empty list when retrieving a list of counters', async () => {


    const res = await request(app).get('/api/counter');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);

  });

  test('should return a non-empty list when retrieving a list of counters', async () => {
    const counter = [
      { officer: 'Officer1', name: 'Name1' },
      { officer: 'Officer2', name: 'Name2' }
    ];

    for (const c of counter) {
      await db.run('INSERT INTO COUNTER (officer, name) VALUES (?, ?)', [c.officer, c.name]);
    }

    const res = await request(app).get('/api/counter');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);

  });
});

describe('GET services', () => {
  afterEach((done) => {
    db.run('DELETE FROM SERVICE', [], (err) => {
      if (err) {
        console.error('Error deleting counter:', err.message);
      }
      done();
    });
  });

  test('should return an empty list when retrieving a list of services', async () => {


    const res = await request(app).get('/api/services');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);

  });

  test('should return a non-empty list when retrieving a list of services', async () => {
    const services = [
      { type: 'type1', time: 1000 },
      { type: 'type2', time: 2000 }
    ];

    for (s of services) {
      await db.run('INSERT INTO SERVICE (service_type, service_time) VALUES (?, ?)', [s.type, s.time]);
    }

    const res = await request(app).get('/api/services');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);

  });
});

describe('POST services', () => {

  test('should insert a service correctly', async () => {
    const req = {
      type: 'example',
      time: 10,
      counterList: [
        1,
        2
      ]
    };

    const res = await request(app).post("/api/service").send(req);

    expect(res.status).toBe(200);
    expect(res.body).toEqual("Inserimento avvenuto con successo");
  });
});

describe('POST ticket', () => {
  test('should insert a ticket correctly', async () => {
    const helpDesk = {
      counter: 5,
      service: 5
    };
    await db.run('INSERT INTO HELPDESK (counter, service) VALUES (?, ?)', [helpDesk.counter, helpDesk.service], function (err) {
      if (err) {
        console.log(err);
        return;
      }
    }
    );

    const req = {
      service: 5,
    };

    const res = await request(app).post("/api/ticket").send(req);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(1);
  });
});


describe('DELETE service', () => {

  test('should delete a service successfully', async () => {
    const exampleService = {type: "example", time: 20};

    await db.run('INSERT INTO SERVICE (service_type, service_time) VALUES (?, ?)', [exampleService.type, exampleService.time], function (err) {
      if (err) {
        console.log(err);
        return;
      }});
    const res = await request(app).delete('/api/services/2/delete')

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Delete successful' });
  });

  test('should return 422 if idS is not a valid integer', async () => {
    const res = await request(app).delete('/api/services/Nan/delete');

    expect(res.status).toBe(422);
    expect(res.body.errors).toHaveLength(1);
  });

});
