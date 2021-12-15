/* IMPORT EXPRESS */
import express from 'express'
/* IMPORT ROUTE FILE */
import api from "./routes/api";
/* IMPORT MODEL FILE */
import Employee from "./models/Employee";

const {Sequelize} = require('sequelize')
const sequelize = new Sequelize('sqlite::memory:')

var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.json())
app.use(express.static('public'))
/* IMPORT */
app.use(api)

/* INIT APPS */
app.listen(8080, () => {
    console.log('App is running')
    /* SYNC DATABASE SQLITE */
    Employee.sync({force:true})
})