'use strict';
const express = require('express');
const cors = require('cors');
const { check, validationResult } = require('express-validator'); // validation middleware
const session = require('express-session'); // enable sessions



const db = require('./db'); // module for accessing the DB
const port = 3001;
const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173',
  // credentials: true,
};
app.use(cors(corsOptions));

app.get('/api/employee', async (req, res) => {
  try {
    const employee = await db.listOfEmployee()
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).end();
  }
});


app.get('/api/counter', async (req, res) => {
  try {
    const counters = await db.listOfCounter()
    res.status(200).json(counters);
  } catch (err) {
    res.status(500).end();
  }
});

app.get('/api/services', async (req, res) => {
  try {
    const services = await db.listOfServices()

    for (let i = 0; i < services.length; i++) {
      const counter_service = await db.listOfCounterService(services[i].id)
      services[i].counters = [...counter_service];
    }
    res.status(200).json(services);
  } catch (err) {
    res.status(500).end();
  }
});

app.post('/api/service', async (req, res) => {
  const serviceType = req.body.type;
  const timeToServe = req.body.time;
  const counterList = req.body.counterList;

  let service = { "type": serviceType, "time": timeToServe }

  try {
    const serviceId = await db.insertService(service);   //il posto compare nello stato di richiesto (non ancora assegnato)
    const helpDesk = await db.insertHelpDesk(serviceId, counterList)

    return res.status(200).json("Inserimento avvenuto con successo")
  } catch (err) {
    return res.status(503).json({ error: 'Errore nell inserimento' });
  }
});





app.post('/api/ticket', async (req, res) => {
  const service = req.body.service; //deciso dall'admin
  try {
    //controllare che ci sia il service 
    let service_exist_helpdesk = await db.searchHelpdeskService(service)
    if (service_exist_helpdesk == -1)
      return res.status(503).json({ error: 'Errore nell inserimento ticket, il service non corrisponde a nessun helpdesk' });
    else {
      try{
        let lastTicket = await db.searchLastTicket(service)
        let ticket = { "customer_number": lastTicket + 1, "service": service }

        try {
          const ticketId = await db.inserTicket(ticket);   //il posto compare nello stato di richiesto (non ancora assegnato)
          return res.status(200).json(ticketId)
        } catch (err) {
         return res.status(503).json({ error: 'Errore nell inserimento' });
        }
      } catch(err){
          return res.status(503).json("Errore nella ricerca del last ticket")
      }
    }
  } catch (err) {
    return res.status(500).end();
  }
  //il customer number deve essere calcolato in base a cosa si trova all'interno della tabella ticket con lo stesso servizio

});

app.delete("/api/services/:idS/delete", [
  check('idS').isInt({ min: 1 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const service = db.getService(req.params.idS);
  if (service) {
    try {
      await db.deleteService(req.params.idS);
      res.status(200).json({ message: "Delete successful" });

    } catch (err) {
      console.log(err);
      res.status(503).json({ error: `Database error during the delete of service ${service.type}.` });
    }
  }

})

app.listen(port, () => {
  console.log(`react-qa-server listening at http://localhost:${port}`);
});