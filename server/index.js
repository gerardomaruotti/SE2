'use strict';
const express = require('express');
const cors = require('cors') ; 
const {check, validationResult} = require('express-validator'); // validation middleware
const session = require('express-session'); // enable sessions



const db = require('./db'); // module for accessing the DB
const port = 3001;
const app = express();
app.use(express.json());


app.get('/api/employee', async (req, res) => {
  try {
    const employee = await db.listOfEmployee()
    console.log(employee)
    res.status(200).json(employee);
  } catch(err) {
    res.status(500).end();
  }
});


app.get('/api/services', async (req, res) => {
  try {
    const service = await db.listOfService()
    console.log(service)
    res.status(200).json(service);
  } catch(err) {
    res.status(500).end();
  }
});



app.post('/api/service', async (req, res) => {
  const serviceType = req.body.type;
  const serviceDescription = req.body.description;

  let service = {"type":serviceType, "description":serviceDescription}

  try {
    const serviceId = await db.insertService(service);   //il posto compare nello stato di richiesto (non ancora assegnato)
    console.log(serviceId)
  } catch (err) {
    if (err.errno == 19)
      return res.status(503).json({ error: 'Alcuni tra i posti selezionati sono duplicati!'});
    else
      return res.status(503).json({ error: "Errore nell'inserimento sul database " });
  }
});

app.post('/api/ticket', async (req, res) => {
  const service = req.body.service;
  const officer = req.body.officer;
  const help_desk_number = req.body.help_desk_number; //deciso dall'admin

  //vado a cercare ticket con stesso servizio 
  try {
    let lastTicket = await db.searchLastTicket(service)
    let ticket  = {"service":service, "officer":officer, "customer_number":lastTicket+1, "help_desk_num":help_desk_number}

    try {
      const ticketId = await db.inserTicket(ticket);   //il posto compare nello stato di richiesto (non ancora assegnato)
    } catch (err) {
      if (err.errno == 19)
        return res.status(503).json({ error: 'Alcuni tra i posti selezionati sono duplicati!'});
      else
        return res.status(503).json({ error: "Errore nell'inserimento sul database " });
    }
  } catch(err) {
    res.status(500).end();
  }
  //il customer number deve essere calcolato in base a cosa si trova all'interno della tabella ticket con lo stesso servizio


  
});

app.listen(port, () => {
    console.log(`react-qa-server listening at http://localhost:${port}`);
  });