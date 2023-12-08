const PORT = process.env.PORT || 5000;

const express = require('express');
const sequelizeDb = require('./sequelizeDb');
const cors = require('cors');
const reviews = require('./reviews')

const app = express();
app.use(cors());

app.use(express.json());

app.get('/submitForm', sequelizeDb.getUsers);
app.get('/reviews', reviews.getRev);
app.post('/submitForm', sequelizeDb.createUser);
app.post('/submit-review', reviews.postRev);
app.get('/user', sequelizeDb.getUserById);
app.delete('/user/:id', sequelizeDb.deleteUser);

app.get('/getRev', reviews.getRev);
app.post('/postRev', reviews.postRev);


app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));