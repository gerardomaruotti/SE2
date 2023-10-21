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


app.post('/api/employee', async (req, res) => {
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


app.listen(port, () => {
    console.log(`react-qa-server listening at http://localhost:${port}`);
  });