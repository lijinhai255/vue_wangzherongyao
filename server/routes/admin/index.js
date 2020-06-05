module.exports = app => {
    const express = require("express")
    const jwt = require('jsonwebtoken')
    console.log(jwt,"jwt")
    const AdminUser = require('../../models/AdminUser')

    const router = express.Router({
        mergeParams: true // 合并url参数
    })
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

//-----------------------/
     // 登录接口
 // 登录接口
 app.post('/admin/api/login', async (req, res) => {
    const {
      username,
      password
    } = req.body;
    // 1.根据用户名找用户

    const user = await AdminUser.findOne({
      username
    }).select('+password')
    // assert(user, 422, {
    //   message: '用户不存在！'
    // })
    if (!user) {
      return res.status(422).send({
        message: '用户不存在！'
      })
    }
    // 2.校验密码
    const isValid = require('bcryptjs').compareSync(password, user.password)
    // assert(isValid, 422, { message:'密码错误！'})
    if (!isValid || isValid == '') {
      return res.status(422).send({
        message: '密码错误！'
      })
    }


    // 3.返回token

    const token = jwt.sign({
      id: user._id
    }, app.get('secret'), {
      expiresIn: '24h'
    }) // 通过调用 sign 方法, 把 **用户信息**、**密钥** 生成token，并设置过期时间 
    res.send({
      user,
      token
    })
  })
  //错处统一处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })

}