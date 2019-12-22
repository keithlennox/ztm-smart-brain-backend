const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors())

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      password: 'b',
      email: 'a',
      entries: 'c',
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      password: 'bananas',
      email: 'sally@gmail.com',
      entires: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: '987',
      hash: '',
      email: 'john@gmail.com'
    }
  ]
}

//Root
app.get('/', (req, res) => {
  res.send(database.users);
});

//Signin
app.post('/signin', (req, res) => {
  if(req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    res.json(database.users[0]);
    // res.json('success');
  } else {
    res.status(400).json('error logging in');
  }
});

//Register
app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, null, null, function(err, hash) {
    console.log(hash);
  });
  database.users.push({
      id: '125',
      name: name,
      email: email,
      password: password,
      entires: 0,
      joined: new Date()
    })
  res.json(database.users[database.users.length-1]);
});

//Get user profile
app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  })
  if (!found) {
    res.status(400).json('not found');
  }
});

//Image
app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entires++
      res.json(user.entires);
    }
  })
  if (!found) {
    res.status(400).json('not found');
  }
});


/* // Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
  // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
  // res = false
}); */


app.listen(3001);