//默认生产环境
process.env.NODE_ENV = "production"
//获取环境变量
let nodeenv = process.env.NODE_ENV;

let config = null
if (nodeenv === "production") {
    config = require("./prod")
} else {
    config = require("./dev")
}

module.exports = config;