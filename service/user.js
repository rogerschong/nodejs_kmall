let User = require("../model/user");
let encryptUtils = require("../utils/encryptUtils");

/**
 * 用户注册
 * url Post http://localhost:8000/regist
 * @param user {username:zhangsan,password:123}
 * @returns {Promise<void>}
 */
async function regist(user) {
    //根据用户名查询用户
    let result = await findByUser(user.username);
    if (result) {
        throw Error(`用户名${user.username}已经被占用`);
    }
    //密码加密
    user.password = encryptUtils.md5Hmac(user.password, user.username);
    //对角色重新负责
    user.role = 0;
    //注册
    result = await User.create(user);
    result.password = "";
    return result;
}

/**
 * 根据用户名删除用户
 * url Delete http://localhost/username
 * @param username
 * @returns {Promise<void>}
 */
async function deleteUserByUsername(username) {
    await isExistUsername(username);
    result = await User.deleteOne({username: username});
    if (result.n !== 1) {
        throw Error("删除失败")
    }
}

/**
 * 根据用户名查找用户
 * url : GET , http://localhost:8000/username
 * @param username :用户名
 * @returns {Promise<*>}
 */
async function findByUser(username) {
    let result = await User.findOne({username: username});
    return result
}

/**
 * 根据用户名判断用户是否存在
 * @param username
 * @returns {Promise<void>}
 */
async function isExistUsername(username) {
    let result = await findByUser(username);
    if (!result) {
        throw Error(`用户名${username}不存在`)
    }
}

/**
 * 用户登陆
 * url Post http://localhost:8000/login
 * @param user {username:zhangsan,password:123}
 * @returns {Promise<void>}
 */
async function login(user) {
    //判断用户是否存在
    await isExistUsername(user.username);
    let password = user.password;
    if (password == null || password.trim().length === 0) {
        throw Error("用户名为空")
    }
    //加密密码
    user.password = encryptUtils.md5Hmac(password, user.username);

    user = await User.findOne(user);
    user.password = "";
    return user;
}

module.exports = {
    regist,
    deleteUserByUsername,
    findByUser,
    login
}