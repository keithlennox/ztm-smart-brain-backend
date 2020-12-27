const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'xxxxxxxx',
    password: 'xxxxxxxxx',
    database: 'smartbrain'
  }
});

const app = express();

app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res) => { res.send(database.users);});
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleAPICall(req, res)})

app.listen(3001);