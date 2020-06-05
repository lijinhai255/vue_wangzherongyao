const express = require("express")

const app = express()
app.set('secret','fghjlgllghgf') // 生成密钥

app.use(require('cors')())// 引入跨域模块
app.use(express.json()) // 引入express框架
// app.use('/',express.static(__dirname + '/web'))
app.use('/admin',express.static(__dirname + '/admin'))
app.use('/uploads',express.static(__dirname + '/uploads'))// 使用express托管上传的静态资源，让前端可见
require('./routes/admin')(app)
// require('./routes/web')(app)
require('./plugins/db')(app)


app.listen(3000, () => { 
    console.log('正在监听：3000端口')
});