let catagoryService = require("../service/catagory");
let router = require("express").Router();
let config = require("../config");

/**
 * 添加分类
 * url :POST http://localhost:8000/catagory
 * 请求体传递，要添加的数据{name:xxx}
 * @returns {Promise<void>}
 */
router.post("/", async (req, res) => {
    let result = await catagoryService.addItem(req.body);
    res.success(result)
})
/**
 * 根据id删除分类
 * url :DELETE http://localhost:8000/catagory/id
 * 请求体传递，要添加的数据{name:xxx}
 * @returns {Promise<void>}
 */
router.delete("/:id", async (req, res) => {
    await catagoryService.deleteById(req.params.id);
    res.success();
})

/**
 * 根据id修改
 * url :PUT http://localhost:8000/catagory/id
 * 请求体传递，要添加的数据{catagory:xxx}
 * @returns {Promise<void>}
 */
router.put("/:id", async (req, res) => {
    await catagoryService.updateById(req.params.id, req.body)
    res.success();
})

//分页查询页码从1开始
/** 偏移量 ：(page-1)*size
 *  每次数据条目
 * 根据id修改
 * url :DELETE http://localhost:8000/catagory:page=2
 * 默认第一页
 * 请求体传递，要添加的数据{name:xxx}
 * @returns {Promise<void>}
 */
router.get("/", async (req, res) => {
    return await catagoryService.findByPage(req.query.page);
})

module.exports = router;