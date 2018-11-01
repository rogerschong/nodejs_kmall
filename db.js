let mongooes = require('mongoose')
let config = require("./config");

mongooes.connect("mongodb://localhost/product-manager", {useNewUrlParser: true})
let connection = mongooes.connection

connection.on("error", err => {
    console.log(`数据库连接失败:${err.toString()}`)
})

connection.once("open", () => {
    console.log("连接成功")
})