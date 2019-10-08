const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  const nome = 'Marcello'
  const lang = 'Javascript'
  res.render('index', {
    nome,
    lang
  })
})

app.listen(8080, () => {
  console.log('servidor rodando')
})