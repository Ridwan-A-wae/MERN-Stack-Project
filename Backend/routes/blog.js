const express = require("express")
const router = express.Router()
const {create,getAllblogs,singleBlog,remove,update} = require('../controller/blogControllers')

router.post('/create', create)

// การเรียกใช้งาน
router.get('/blogs',getAllblogs)
router.get('/blog/:slug',singleBlog)
router.delete('/blog/:slug',remove)
router.put('/blog/:slug',update)
module.exports = router 