const express = require('express');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// / --> res = this is working
// /signin --> POST = success/fail
// /register --> POST = user
// /profile/:userid --> GET = user
// /image --> PUT = user

app.listen(3000);