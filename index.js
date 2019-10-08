const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/:nome/:lang', (req, res) => {
  const nome = req.params.nome
  const lang = req.params.lang
  const exibirMsg = false

  const produtos = [
    {nome: 'relogio', preco: 80},
    {nome: 'doritos', preco: 10},
    {nome: 'goiaba', preco: 1.50},
    {nome: 'pulseira', preco: 25},
    {nome: 'TV', preco: 1.800},
    {nome: 'Celular', preco: 1.350},
  ]

  res.render('index', {
    nome,
    lang,
    empresa: 'Mrs Labs',
    msg: exibirMsg,
    produtos
  })
})

app.listen(8080, () => {
  console.log('servidor rodando')
})