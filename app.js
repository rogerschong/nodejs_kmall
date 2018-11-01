//处理异步错误
require("express-async-errors")
require("./db")

let express = require("express");
//处理日志
let morgan = require("morgan");
//创建服务器
let app = express()

//使用自定义的增强response中间件
app.use(require('./middleware/response_md'))
//使用日志功能
app.use(express.json())

//挂载自定义的router

//处理全局异常中间件
app.use((err, req, res, next) => {
    //写出失败的响应
    res.fail(err)
})

app.listen(8000)