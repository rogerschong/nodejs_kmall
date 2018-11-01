module.exports = (req, res, next) => {
    //给response对象扩展success方法
    res.success = (result) => {
        res.send({
            code: 1,
            msg: "操作成功",
            data: result
        })
    }
    //给response对象扩展fail方法
    res.fail = (err) => {
        res.send({
            code: -1,
            msg: "操作失败",
            data: err.toString()
        })
    }
    next();
}