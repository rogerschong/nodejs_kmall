let userService = require("../service/user");
let router = require("express").Router();
let config = require("../config");
let encryptUtils = require("../utils/encryptUtils");
/**
 * 用户注册
 * url Post http://localhost:8000/regist
 * @param user {username:zhangsan,password:123}
 * @returns {Promise<void>}
 */
router.post("/", async (req, res) => {
    let result = await userService.regist(req.body);
    res.success(result);
})
/**
 * 根据用户名删除用户
 * url Delete http://localhost/username
 * @param username
 * @returns {Promise<void>}
 */
router.delete("/:username", async (req, res) => {
    await userService.deleteUserByUsername(req.params.username);
    res.success();
})

/**
 * 根据用户名查找用户
 * url : GET , http://localhost:8000/username
 * @param username :用户名
 * @returns {Promise<*>}
 */
router.get("/:username", async (req, res) => {
    let username = req.params.username;
    let result = await userService.findByUser(username);
    if (result) {
        result.password = "";
        res.success(result);
    } else {
        throw Error(`用户名${username}的用户不存在`)
    }
})

router.post("/login", async (req, res) => {
    //登陆
    let user = await userService.login(req.body);

    //定义token
    let token = {
        username: user.username,
        expire: Date.now() + config.TOKEN_EXPIRE
    }
    //aes对称加密
    let encryptData = encryptUtils.aesEncrypt(JSON.stringify(token), config.TOKEN_KEY);

    res.success(encryptData);
})

module.exports = router;