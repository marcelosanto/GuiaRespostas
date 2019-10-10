const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const connection = require('./database/database')
const Perguntas = require('./database/Perguntas')

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
  Perguntas.findAll({ raw: true, order:[
    ['id', 'DESC']
  ] }).then(perguntas => {
    res.render('index',{
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

app.listen(8080, () => {
  console.log('servidor rodando')
})