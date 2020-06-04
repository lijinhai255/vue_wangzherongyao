module.exports = app => {
    const express = require("express")
    const router = express.Router({
        mergeParams: true // 合并url参数
    })
    const Category = require("../../models/Category")
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    router.get('/', async (req, res) => {

        // const Category = require("../../models/Category")
        const queryOptions = {}
        if (req.Model.modelNames === "Categery") {
            queryOptions.populate = "parent"

        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })
    router.get('/:id', async (req, res) => {
        // const Category = require("../../models/Category")
        const items = await req.Model.findById(req.params.id).limit(10)
        res.send(items)
    })
    router.put('/:id', async (req, res) => {
        // const Category = require("../../models/Category")
        const items = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(items)
    })
    // 通用删除接口
    router.delete('/:id', async (req, res) => {
        const items = await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })

    app.use("/admin/api/rest/:resource", async (req, res, next) => {
        const modelNames = require("inflection").classify(req.params.resource)
        req.Model = require(`../../models/${modelNames}`)
        next()
    }, router)

    // 图片上传接口
    const multer = require('multer') // 导入上传文件中间件的依赖包，需要先安装
    const upload = multer({
        dest: __dirname + '/../../uploads'
    })
    // 上传中间件
    app.post('/admin/api/upload',  upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

}