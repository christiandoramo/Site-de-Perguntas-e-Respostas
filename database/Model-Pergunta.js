const Sequelize = require('sequelize')
const database = require('./database')

// criando os json a ser enviados ao mysql
const Pergunta = database.define('perguntas', {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
})
// enviando
Pergunta.sync({ force: false }).then(() => {
  console.log('Tabela-Perguntas atualizada criada com sucesso')
})

// exportando o objeto Pergunta do modulo para ser usado em index.js
module.exports = Pergunta
