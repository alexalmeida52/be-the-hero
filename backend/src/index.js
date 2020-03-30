const express = require('express'); // Importando pacote do express
const app = express(); // Chamando o express
const morgan = require('morgan');
const cors = require('cors');

const routes = require('./routes'); // Importando rotas do arquivo


// Converter JSON que venha pelas rotas para objeto javascript
app.use(express.json());

// Habilitando o cors
app.use(cors())

// Exibindo logs da aplicação
app.use(morgan('dev'));
// Disponibilizar as rotas para a aplicação
app.use(routes);

// Servindo a aplicação
app.listen(process.env.PORT || 3333, () => {
    console.log('Servindo na porta: 3333');
});