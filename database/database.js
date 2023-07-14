const sequelize = require('sequelize')
const connection = new sequelize('perguntas', 'root', 'senha', {
  host: 'localhost',
  dialect: 'mysql',
})
module.exports = connection
