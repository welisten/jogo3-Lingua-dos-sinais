const express = require('express')
const cors =  require("cors")
const {createProxyMiddleware} = require('http-proxy-middleware')


const app = express()


// apply cors to all routes
app.use(cors())

// setting proxy
app.use(express.static('src'))

app.use( createProxyMiddleware({
    target: 'https://cdn.jsdelivr.net/gh/spbgovbr-vlibras/vlibras-portal@dev', // URL do servidor externo
    changeOrigin: true,
    pathFilter: '**/*.unityweb',
    pathRewrite: {
      '^http://localhost:8080/app/target': 'https://cdn.jsdelivr.net/gh/spbgovbr-vlibras/vlibras-portal@dev/app/target', // Remove o prefixo /api da URL e ajusta o caminho
    },
    on:{
        proxyReq: (proxyReq, req, res) => {
            proxyReq.setHeader('sec-fetch-mode', 'no-cors')            
        },
    }
}));

// proxy route
app.use('/app', createProxyMiddleware({
    target: 'https://vlibras.gov.br/app',
    changeOrigin: true,
    on: {
        proxyReq: (proxyReq, req, res) => {
            proxyReq.setHeader('Access-Control-Allow-Origin', '*');
            proxyReq.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            proxyReq.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            proxyReq.setHeader('sec-fetch-mode', 'no-cors')
            proxyReq.removeHeader('cache-control');

            console.log(`[Proxy Request] ${req.method} ${req.originalUrl}`)
        },
        proxyRes: (proxyRes, req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.setHeader('sec-fetch-mode', 'no-cors')
            res.removeHeader('cache-control');
            
            console.log(`[Proxy Response] ${res.statusCode}`);
        }
    }
}))


app.use( createProxyMiddleware({
    target: 'https://vlibras.gov.br',
    changeOrigin: true,
    on: {
        proxyReq: (proxyReq, req) => {
            // tentar ver o resutado por aqui e depois descartar a callback
        }
    }
}))


app.listen(6060, () => console.log('server running on port 8080'))