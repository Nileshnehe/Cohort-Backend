const express = require('express')
const postRouter = express.Router()
const postController = require('../controller/post.controller')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require('../middlewares/auth.middleware')

postRouter.post("/",upload.single("image"), identifyUser, postController.createPostController)

// GET /api/posts [protected]

postRouter.get("/", identifyUser, postController.getPostController)

// GET /api/posts/details/:postId
postRouter.get("/details/:postId", identifyUser, postController.getDetailsController)

//@route POST /api/posts/like/:postid
postRouter.post("/like/:postId", identifyUser, postController.likePostController) 

// @route GET /api/posts/feed
// @description get all the post created in DB
// @access private
postRouter.get("/feed", identifyUser, postController.getFeedController)

module.exports = postRouter