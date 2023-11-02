const request = require('supertest');
const { app } = require('../index.js');
const db = require('../db');

jest.mock('../db');
beforeEach(() => {
  jest.clearAllMocks();
});

describe('GET employees', () => {
  test('should return an empty list when retrieving a list of employees', async () => {
    const emp = [];
    
    db.listOfEmployee.mockResolvedValueOnce(emp);
    const res = await request(app).get('/api/employee');

    expect(db.listOfEmployee).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);

  });

  test('should return a non-empty list when retrieving a list of employees', async () => {
    const emp = [
      {
        id: 1,
        name: 'Name1',
        surname: 'Surname1',
        role: 'admin'
      },
      {
        id: 2,
        name: 'Name2',
        surname: 'Surname2',
        role: 'admin'
      },
      {
        id: 3,
        name: 'Name3',
        surname: 'Surname3',
        role: 'admin'
      }
    ]

    db.listOfEmployee.mockResolvedValueOnce(emp);
    const res = await request(app).get('/api/employee');

    expect(db.listOfEmployee).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(200);
    expect(res.body).not.toHaveLength(0);
    expect(res.body).toEqual(emp);

  });

  test('should return a 500 error when an error occurs', async () => {
    db.listOfEmployee.mockRejectedValueOnce(new Error('Internal server error'));
    const res = await request(app).get('/api/employee');

    expect(db.listOfEmployee).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(500);
    expect(res.body).toEqual({});

  });
});

describe('GET counter', () => {
  test('should return an empty list when retrieving a list of counters', async () => {
    const counters = [];
    
    db.listOfCounter.mockResolvedValueOnce(counters);
    const res = await request(app).get('/api/counter');

    expect(db.listOfCounter).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);

  });

  test('should return a non-empty list when retrieving a list of counters', async () => {
    const counters = [
      {
        id: 1,
        officer: 'Officer1',
        name: 'Name1',
      },
      {
        id: 2,
        officer: 'Officer2',
        name: 'Name2',
      },
      {
        id: 3,
        officer: 'Officer3',
        name: 'Name3',
      }
    ]

    db.listOfCounter.mockResolvedValueOnce(counters);
    const res = await request(app).get('/api/counter');

    expect(db.listOfCounter).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(200);
    expect(res.body).not.toHaveLength(0);
    expect(res.body).toEqual(counters);

  });

  test('should return a 500 error when an error occurs', async () => {
    db.listOfCounter.mockRejectedValueOnce(new Error('Internal server error'));
    const res = await request(app).get('/api/counter');

    expect(db.listOfCounter).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(500);
    expect(res.body).toEqual({});

  });
});

describe('GET services', () => {
  test('should return an empty list when retrieving a list of services', async () => {
    const serv = [];
    
    db.listOfServices.mockResolvedValueOnce(serv);
    const res = await request(app).get('/api/services');

    expect(db.listOfServices).toHaveBeenCalledTimes(1);
    expect(db.listOfCounterService).toHaveBeenCalledTimes(0);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);

  });

  test('should return a non-empty list when retrieving a list of services', async () => {
    const serv = [
      {
        id: 1,
        type: 'Service1',
        time: 1800,
        counters: []
      },
      {
        id: 2,
        type: 'Service2',
        time: 1900,
        counters: []
      },
    ]

    db.listOfServices.mockResolvedValueOnce(serv);
    db.listOfCounterService.mockResolvedValue([ 1 ])
    const res = await request(app).get('/api/services');

    expect(db.listOfServices).toHaveBeenCalledTimes(1);
    expect(db.listOfCounterService).toHaveBeenCalledTimes(2);
    expect(res.status).toBe(200);
    expect(res.body).not.toHaveLength(0);
    expect(res.body).toEqual(serv);

  });

  test('should return a 500 error when an error occurs', async () => {
    db.listOfServices.mockRejectedValueOnce(new Error('Internal server error'));
    const res = await request(app).get('/api/services');

    expect(db.listOfServices).toHaveBeenCalledTimes(1);
    expect(db.listOfCounterService).toHaveBeenCalledTimes(0);
    expect(res.status).toBe(500);
    expect(res.body).toEqual({});

  });

});

describe('POST service', () => {
  test('should insert a service correctly', async () => {
    const req = {
      type: 'example',
      time: 10,
      counterList: [
        { counterId: 1 },
        { counterId: 2 }
      ]
    };
    exampleId = 1;
    helpdeskId = 2

    db.insertService.mockResolvedValueOnce(exampleId);
    db.insertHelpDesk.mockResolvedValueOnce(helpdeskId);
    const exampleService = { ...req };
    delete exampleService.counterList;

    const res = await request(app).post("/api/service").send(req);
    
    expect(db.insertService).toHaveBeenCalledTimes(1);
    expect(db.insertService).toHaveBeenCalledWith(exampleService);
    expect(db.insertHelpDesk).toHaveBeenCalledTimes(1);
    expect(db.insertHelpDesk).toHaveBeenCalledWith(exampleId, req.counterList); 
    expect(res.status).toBe(200);
    expect(res.body).toEqual("Inserimento avvenuto con successo");
  });

  test('should return a 500 error when an error occurs', async () => {
    const exampleService = {
      type: 'example',
      time: 10,
    };
    exampleId = 1;

    db.insertService.mockRejectedValueOnce(new Error('Internal server error'));
    const res = await request(app).post("/api/service").send(exampleService);
    
    expect(db.insertService).toHaveBeenCalledTimes(1);
    expect(db.insertService).toHaveBeenCalledWith(exampleService);
    expect(res.status).toBe(503);
    expect(res.body).toEqual({ error: 'Errore nell inserimento' });
  });
});

describe('POST ticket', () => {
  test('should insert a ticket correctly', async () => {
    const exampleTicket = {
      service: 1
    };
    const resTicket = {
      customer_number: 4,
      service: 1,
    };
    exampleId = 1;

    db.searchHelpdeskService.mockResolvedValueOnce(1);
    db.searchLastTicket.mockResolvedValueOnce(3);
    db.inserTicket.mockResolvedValueOnce(4);
    const res = await request(app).post("/api/ticket").send(exampleTicket);
    
    expect(db.searchHelpdeskService).toHaveBeenCalledTimes(1);
    expect(db.searchLastTicket).toHaveBeenCalledTimes(1);
    expect(db.inserTicket).toHaveBeenCalledTimes(1);
    expect(db.inserTicket).toHaveBeenCalledWith(resTicket);
    expect(res.status).toBe(200);
  });

  test('should not insert a ticket with wrong helpdesk', async () => {
    const exampleTicket = {
      service: 1,
    };
    exampleId = 1;

    db.searchHelpdeskService.mockResolvedValueOnce(-1);
    const res = await request(app).post("/api/ticket").send(exampleTicket);
    
    expect(db.searchHelpdeskService).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(503);
    expect(res.body).toEqual({ error: 'Errore nell inserimento ticket, il service non corrisponde a nessun helpdesk'});
  });

  test('should return a 500 error when an error occurs', async () => {
    const exampleTicket = {
      service: 1,
    };
    exampleId = 1;

    db.searchHelpdeskService.mockRejectedValueOnce(new Error('Internal server error'));
    const res = await request(app).post("/api/ticket").send(exampleTicket);
    
    expect(res.status).toBe(500);
    expect(res.body).toEqual({});
  });
});

describe('DELETE service', () => {
  test('should delete a service successfully', async () => {
    db.getService.mockReturnValueOnce({ type: 'example' });
    db.deleteService.mockResolvedValueOnce();

    const res = await request(app).delete('/api/services/1/delete')
    
    expect(db.getService).toHaveBeenCalledTimes(1);
    expect(db.deleteService).toHaveBeenCalledTimes(1);
    expect(db.getService).toHaveBeenCalledWith('1');
    expect(db.deleteService).toHaveBeenCalledWith('1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Delete successful' });
  });

  test('should return 422 if idS is not a valid integer', async () => {
    db.getService.mockReturnValueOnce({ type: 'example' });

    const res = await request(app).delete('/api/services/Nan/delete');

    expect(db.getService).toHaveBeenCalledTimes(0);
    expect(res.status).toBe(422);
    expect(res.body.errors).toHaveLength(1);
  });


  test('should return 503 if an error occurs', async () => {
    db.getService.mockReturnValueOnce({ type: 'example' });
    db.deleteService.mockRejectedValueOnce(new Error('Internal server error'));

    const res = await request(app).delete('/api/services/1/delete')
    expect(db.getService).toHaveBeenCalledTimes(1);
    expect(db.deleteService).toHaveBeenCalledTimes(1);
    expect(db.getService).toHaveBeenCalledWith('1');
    expect(db.deleteService).toHaveBeenCalledWith('1');
    expect(res.status).toBe(503);
    expect(res.body.error).toEqual(`Database error during the delete of service.`);
  });
});