const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const connection = require('./database/database')
const Perguntas = require('./database/Perguntas')
const Resposta = require('./database/Resposta')

//Database
connection
  .authenticate()
  .then(() => {
    console.log('Conexao feita com o banco de dados!')
  })
  .catch((error) => {
    console.log(error)
  })

// Isto indica para o Express usar o 'ejs' como engine html
app.set('view engine', 'ejs')
app.use(express.static('public'))

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Rotas
app.get('/', (req, res) => {
  Perguntas.findAll({
    raw: true, order: [
      ['id', 'DESC']
    ]
  }).then(perguntas => {
    res.render('index', {
      perguntas
    })
  })
})

app.get('/perguntar', (req, res) => {
  res.render('perguntar')
})

app.post('/salvarperguntar', (req, res) => {
  const titulo = req.body.titulo
  const descricao = req.body.descricao
  Perguntas.create({
    titulo,
    descricao
  }).then(() => {
    res.redirect('/')
  })
})

app.get('/pergunta/:id', (req, res) => {
  const id = req.params.id
  Perguntas.findOne({
    where: { id: id }
  }).then(pergunta => {
    if (pergunta != undefined) {
      Resposta.findAll({
        where: { perguntaId: pergunta.id },
        order: [
          ['id', 'DESC']
        ]
      }).then(respostas => {
        res.render('pergunta', {
          pergunta,
          respostas
        })
      })


    } else {
      res.redirect('/')
    }
  })
})

app.post('/responder', (req, res) => {
  const corpo = req.body.corpo
  const perguntaId = req.body.pergunta
  Resposta.create({
    corpo,
    perguntaId
  }).then(() => {
    res.redirect('/pergunta/' + perguntaId)
  })
})

app.listen(8080, () => {
  console.log('servidor rodando')
})