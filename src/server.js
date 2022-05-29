require('dotenv').config();
const app = require('./api');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use('/login');
app.use('/user');
app.use('/categories');
app.use('/post');

app.listen(port, () => console.log('ouvindo porta', port));
