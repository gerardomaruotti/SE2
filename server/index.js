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
  credentials: true,
};
app.use(cors(corsOptions));

app.get('/api/employee', async (req, res) => {
  try {
    const employee = await db.listOfEmployee()
    console.log(employee)
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).end();
  }
});


app.get('/api/services', async (req, res) => {
  try {
    const service = await db.listOfService()
    console.log(service)
    res.status(200).json(service);
  } catch (err) {
    res.status(500).end();
  }
});



app.post('/api/service', async (req, res) => {
  const serviceType = req.body.type;
  const timeToServe = req.body.time;

  let service = { "type": serviceType, "time": timeToServe }

  try {
    const serviceId = await db.insertService(service);   //il posto compare nello stato di richiesto (non ancora assegnato)
    console.log(serviceId)
    return res.status(200).json("Inserimento avvenuto con successo")
  } catch (err) {
    return res.status(503).json({ error: 'Errore nell inserimento' });
  }
});


app.post('/api/helpdesk', async (req, res) => {
  const service = req.body.service;
  const officer = req.body.officer;
  let helpdesk = { "service": service, "officer": officer }

  try {
    const helpdeskId = await db.insertHelpDesk(helpdesk);   //il posto compare nello stato di richiesto (non ancora assegnato)
    res.status(200).json("Configurazione helpdesk avvenuta con successo")
  } catch (err) {
    return res.status(503).json({ error: 'Errore nell inserimento' });
  }
})


app.post('/api/ticket', async (req, res) => {
  const service = req.body.service;
  const help_desk_number = req.body.helpdesk; //deciso dall'admin

  //vado a cercare ticket con stesso servizio 
  try {
    //controllare che ci sia il service con lo specifico helpdesk prima di eseguire inserimento, altrimenti --> errore inserimento

    let service_exist_helpdesk = await db.searchHelpdeskService(service, help_desk_number)
    if (service_exist_helpdesk == -1)
      res.status(503).json({ error: 'Errore nell inserimento ticket, il service non corrisponde al helpdesk' });
    else {
      let lastTicket = await db.searchLastTicket(service, help_desk_number)
      let ticket = { "customer_number": lastTicket + 1, "help_desk_num": help_desk_number }

      try {
        const ticketId = await db.inserTicket(ticket);   //il posto compare nello stato di richiesto (non ancora assegnato)
        res.status(200).json("Inserimento ticket avvenuto con successo")
      } catch (err) {
        return res.status(503).json({ error: 'Errore nell inserimento' });
      }
    }

  } catch (err) {
    res.status(500).end();
  }
  //il customer number deve essere calcolato in base a cosa si trova all'interno della tabella ticket con lo stesso servizio



});

app.listen(port, () => {
  console.log(`react-qa-server listening at http://localhost:${port}`);
});