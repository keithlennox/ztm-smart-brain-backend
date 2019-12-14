const express = require('express');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entires: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entires: 0,
      joined: new Date()
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
    res.json('success');
  } else {
    res.status(400).json('error logging in');
  }
});

//Register
app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
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
    res.status(404).json('not found');
  }
});

// /image --> PUT = user

app.listen(3000);