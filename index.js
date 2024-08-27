const express = require('express')
const cors =  require("cors")
const {createProxyMiddleware} = require('http-proxy-middleware')


const app = express()


app.use(cors())

app.use(express.static('./src'))

app.listen(6060, () => console.log('server running on port 6060'))

