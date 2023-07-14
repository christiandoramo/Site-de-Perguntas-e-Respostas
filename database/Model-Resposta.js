const Sequelize = require('sequelize')
const database = require('./database')

// criando os json a ser enviados ao mysql
const Resposta = database.define('respostas', {
  perguntaId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  corpo: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
})
// force false -> false o para não forçar a criação caso a tabela já exista
Resposta.sync({ force: false }).then(() => {
  console.log('Tabela-Respostas atualizada com sucesso')
})

// exportando o objeto Pergunta do modulo para ser usado em index.js
module.exports = Resposta
