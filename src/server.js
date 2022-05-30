require('dotenv').config();
const app = require('./api');
const errorMiddleware = require('./middleware/errorMiddleware');
const loginRoute = require('./routes/login');
const useRoute = require('./routes/user');
const categoriesRoute = require('./routes/categories');
const postRoute = require('./routes/post');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use('/login', loginRoute);
app.use('/user', useRoute);
app.use('/categories', categoriesRoute);
app.use('/post', postRoute);

app.use(errorMiddleware);

app.listen(port, () => console.log('ouvindo porta', port));
