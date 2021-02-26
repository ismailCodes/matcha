const express = require('express');
const cors = require('cors');

const app = express();

//Middlewares

app.use(express.json()); //req.body
app.use(cors());

//ROUTES

app.use('/auth', require('./routes/routes'));

app.listen(5000, () => {
  console.log('Server is running on port 5000 :)');
});
