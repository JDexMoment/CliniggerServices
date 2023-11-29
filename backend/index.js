const PORT = process.env.PORT || 5000;
const Application = require('./Application');
const userRouter = require('./user-router');
const jsonParser = require('./parseJson');
const parseUrl = require('./parseUrl');
const express = require('express');
const sequelizeDb = require('./sequelizeDb');

//const app = new Application();
const app = express();

// app.use(jsonParser);
// app.use(parseUrl('http://localhost:5000'));

// app.addRouter(userRouter);

app.use(express.json());

app.get('/users', sequelizeDb.getUsers);
app.post('/users', sequelizeDb.createUser);
app.get('/user', sequelizeDb.getUserById);
app.delete('/user/:id', sequelizeDb.deleteUser);
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

