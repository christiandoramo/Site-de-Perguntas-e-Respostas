const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// bodyparser converte as informações do post para uma forma legivel pelo js
const connec = require('./database/database')
// tabela pergunta será criada logo nessa execução do Model pergunta no index.js
const perguntaModel = require('./database/Model-Pergunta')
const Pergunta = require('./database/Model-Pergunta')
const Resposta = require('./database/Model-Resposta')

connec
  .authenticate()
  .then(() => {
    console.log('conexão com database rodando')
  })
  .catch((erro) => {
    console.log(erro)
  })

app.set('view engine', 'ejs')
app.use(express.static('public')) // também lerá os arquivos do bootstrap em public
app.use(bodyParser.urlencoded({ extended: false })) // decodificação com o bodyparser
app.use(bodyParser.json()) // lê agora os json

app.get('/', (requisicao, resposta) => {
  // findAll é como SELECT * ALL FROM perguntas...
  perguntaModel
    .findAll({
      //raw: true quer dizer que o findall vai fazer um vistoria CRUA, ou seja só os dados
      raw: true,
      order: [
        ['id', 'DESC'], // DESC = descrecente ASC = crescente -> ordenação pelo id usando o sequelize
      ],
    })
    .then((perguntas) => {
      resposta.render('index', {
        perguntas: perguntas, //novo json passando perguntas para o html/ejs
      })
    })
})

app.get('/perguntar', (requisicao, resposta) => {
  resposta.render('perguntar')
})

app.post('/postpergunta', (requisicao, resposta) => {
  // body vem do bodyparser
  let titulo = requisicao.body.titulo
  let descricao = requisicao.body.descricao
  // create é como INSERT INTO perguntas...
  perguntaModel
    .create({
      titulo: titulo,
      descricao: descricao,
    })
    .then(() => {
      resposta.redirect('/')
    })
})

app.get('/pergunta/:id', (req, res) => {
  let id = req.params.id
  Pergunta.findOne({
    // pega o dado dps compara e retorna com um do database
    where: { id: id },
  }).then((perguntaAchada) => {
    if (perguntaAchada != undefined) {
      Resposta.findAll({
        where: { perguntaId: perguntaAchada.id },
        order: [
          ['id', 'DESC'], // ordendando por mais recente(usando id decrescente)
        ],
      }).then((respostas) => {
        res.render('pergunta', {
          pergunta: perguntaAchada,
          titulo: perguntaAchada.titulo,
          respostas: respostas,
        })
      })
    } else {
      // sem pergunta achada
      res.redirect('/')
    }
  })
})

app.post('/responder', (req, res) => {
  let corpo = req.body.corpo
  let perguntaId = req.body.pergunta // pergunta tem o valor do Id no post do HTML
  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId,
  }).then(() => {
    res.redirect(`/pergunta/${perguntaId}`)
  })
})

app.listen(10, () => console.log('rodando server'))
