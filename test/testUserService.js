let userService = require("../service/user");
require("../db");

async function testUser() {
    //注册
    // let user = {
    //     username:"李四",
    //     password:"123",
    // };
    // user = await userService.regist(user)
    // console.log(user);
    //登陆
    // let user1 = await userService.login(user);
    // console.log(user1);
    //删除用户
    // await userService.deleteUserByUsername("李四");
}

testUser()

