const PORT = process.env.PORT || 5000;

const express = require('express');
const sequelizeDb = require('./sequelizeDb');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

app.get('/submitForm', sequelizeDb.getUsers);
app.post('/submitForm', sequelizeDb.createUser);
app.get('/user', sequelizeDb.getUserById);
app.delete('/user/:id', sequelizeDb.deleteUser);


app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));