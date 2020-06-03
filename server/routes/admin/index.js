module.exports = app => {
    const express = require("express")
    const router = express.Router()
    const Category = require("../../models/Category")
    router.post('/categories', async (req, res) => {
        const model = await Category.create(req.body)
        res.send(model)
    })
    router.get('/categories', async (req, res) => {
        // const Category = require("../../models/Category")
        const items = await Category.find().populate('parent').limit(10)
        res.send(items)
    })
    router.get('/categories/:id', async (req, res) => {
        // const Category = require("../../models/Category")
        const items = await Category.findById(req.params.id).limit(10)
        res.send(items)
    })
    router.put('/categories/:id', async (req, res) => {
        // const Category = require("../../models/Category")
        const items = await Category.findByIdAndUpdate(req.params.id, req.body)
        res.send(items)
    })
    // 通用删除接口
    router.delete('/categories/:id', async (req, res) => {
        const items = await Category.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })

    app.use("/admin/api", router)


}