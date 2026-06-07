const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
//app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true
}));
app.use('/auth', createProxyMiddleware({ 
  target: 'http://localhost:3011', 
  changeOrigin: true,
  pathRewrite: { '^/auth': '' },
  onProxyRes: (proxyRes) => {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
  }
}));

app.use('/rooms', createProxyMiddleware({ 
  target: 'http://localhost:3012', 
  changeOrigin: true,
  pathRewrite: { '^/rooms': '' } // Chuyển /rooms thành /
}));

app.use('/vocab', createProxyMiddleware({ 
  target: 'http://localhost:3013', 
  changeOrigin: true,
  pathRewrite: { '^/vocab': '' }  // BẮT BUỘC
}));
app.use('/learning', createProxyMiddleware({ target: 'http://localhost:3014', changeOrigin: true, pathRewrite: { '^/learning': '' } }));
app.use('/stats', createProxyMiddleware({ target: 'http://localhost:3015', changeOrigin: true, pathRewrite: { '^/stats': '' } }));
app.use('/notify', createProxyMiddleware({ target: 'http://localhost:3016', changeOrigin: true, pathRewrite: { '^/notify': '' } }));

app.listen(3010, () => console.log('API Gateway on 3010'));