let Catagory = require("../model/catagory");
let config = require("../config");

/**
 * 添加分类
 * url :POST http://localhost:8000/catagory
 * 请求体传递，要添加的数据{name:xxx}
 * @returns {Promise<void>}
 */
async function addItem(catagory) {
    let result = await Catagory.findOne({name: catagory.name});
    if (result) {
        throw Error(`名字为${catagory.name}的类别已存在`)
    }
    result = await Catagory.create(catagory);
    return result;
}


/**
 * 根据id删除分类
 * url :DELETE http://localhost:8000/catagory/id
 * 请求体传递，要添加的数据{name:xxx}
 * @returns {Promise<void>}
 */
async function deleteById(id) {
    let result = await Catagory.findOne({_id: id})
    if (!result) {
        throw Error(`ID为${id}的数据不存在`)
    }
    result = await Catagory.deleteOne({_id: id});
    if (result.n !== 1) {
        throw Error(`删除ID为${id}数据失败`)
    }
}

/**
 * 根据id修改
 * url :PUT http://localhost:8000/catagory
 * 请求体传递，要添加的数据{name:xxx}
 * @returns {Promise<void>}
 */
async function updateById(id, catagory) {
    let result = await Catagory.findOne({_id: id})
    if (!result) {
        throw Error(`ID为${id}的数据不存在`);
    }
    console.log(result);
    result = await Catagory.updateOne({_id: id}, catagory)
    if (result.n !== 1) {
        throw Error(`更新ID为${id}数据失败`);
    }
}

//分页查询页码从1开始
/** 偏移量 ：(page-1)*size
 *  每次数据条目
 * 根据id修改
 * url :DELETE http://localhost:8000/catagory:page=2
 * 默认第一页
 * 请求体传递，要添加的数据{name:xxx}
 * @returns {Promise<void>}
 */
async function findByPage(page = 1) {
    //偏移量
    let offset = (page - 1) * config.PAGE_SIZE;
    return await Catagory.find().skip(offset).limit(config.PAGE_SIZE);
}

module.exports = {
    addItem,
    deleteById,
    updateById,
    findByPage
}