const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path")

//usando template enjine
server.set('view engine', 'ejs')

//Mudar a localização da pasta views
server.set('views', path.join(__dirname, 'views'))

//habilitar arquivos estáticos
server.use(express.static("public")) 

//usar o req.body
server.use(express.urlencoded({ extended:true }))

//routes
server.use(routes)

server.listen(3001, () => console.log('rodando'))