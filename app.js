//处理异步错误
require("express-async-errors")
require("./db")

let config = require("./config");

let express = require("express");
//处理日志
let morgan = require("morgan");
//创建服务器
let app = express()

//使用自定义的增强response中间件
app.use(require('./middleware/response_md'))
//;
app.use(express.json())

//挂载自定义的router
app.use("/user", require("./router/user"));
app.use("/catagory", require("./router/catagory"));
//处理全局异常中间件
app.use((err, req, res, next) => {
    //写出失败的响应
    res.fail(err)
})
console.log(config);

app.listen(config.PORT);