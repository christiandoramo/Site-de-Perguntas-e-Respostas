const express = require('express')
const app = express()

app.set('view engine', 'ejs') // carrega o renderizador de paginas do js
app.use(express.static('public')); // permite automaticamente usar arquivos externos estaticos como o css, imagens, js de frontend desssa pasta chamada 'public' automaticamente

//    não precisa nem digitar view/index.ejs em resposta.render(), pois o html/ejs com nome index dentro da pasta com o nome views é visto como padrão pelo metodo render do express.js, a pasta views é buscada como default.
//ATENÇÃO: Além disso o express apenas vai ler apenas arquivos html/ejs que estiverem na pasta views

app.get('/', (requisicao, resposta) => {
  var vetor = [
    { nome: 'shadow of the colossus', ano: 2005 },
    { nome: 'digimon world 3', ano: 2003 },
  ]
  let nome = 'Christian'
  let lang = 'javaScript'
  let booleano = true
  resposta.render('index', {
    vetor: vetor,
    nome: nome,
    lang: lang,
    empresa: 'minha empresa',
    inscritos: 1000000,
    booleano: booleano,
  })
})

app.listen(10, () => console.log('rodando server'))
