const PORT = process.env.PORT || 5000;
const Application = require('./Application');
const userRouter = require('./user-router');
const jsonParser = require('./parseJson');
const parseUrl = require('./parseUrl');

const app = new Application()

app.use(jsonParser);
app.use(parseUrl('http://localhost:5000'));

app.addRouter(userRouter);

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
