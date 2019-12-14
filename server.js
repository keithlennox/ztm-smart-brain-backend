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

// / --> res = this is working
app.get('/', (req, res) => {
  res.send(database.users);
});

// /signin --> POST = success/fail
app.post('/signin', (req, res) => {
  if(req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    res.json('success');
  } else {
    res.status(400).json('error logging in');
  }
})

// /register --> POST = user
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
})

// /profile/:userid --> GET = user
// /image --> PUT = user

app.listen(3000);