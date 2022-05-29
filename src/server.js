require('dotenv').config();
const app = require('./api');
const loginRoute = require('./routes/login');
const useRoute = require('./routes/login');
const categoriesRoute = require('./routes/login');
const postRoute = require('./routes/login');

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

app.listen(port, () => console.log('ouvindo porta', port));
