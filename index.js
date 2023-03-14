//config inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

//forma de ler json / middlewares
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())


//rotas da API
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

//rota inicial / endpoint
app.get('/', (req, res) => {
  //mostrar requisição
  res.json({ message: 'Oi Express!' })
})

//entregar uma porta
const DB_USER = proccess.env.DB_USER
const DB_PASSWORD = encodeURIComponent(proccess.env.DB_PASSWORD)

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.65b2gct.mongodb.net/bancodaapi?retryWrites=true&w=majority`,
    )
    .then(() => {
        console.log("Conectamos ao MongoDB!")
        app.listen(3000)
    })
    .catch((err) => console.log(err))

