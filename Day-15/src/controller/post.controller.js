const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")
const likeModel = require("../models/like.model")


const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


async function createPostController(req, res) {
    console.log(req.body, req.file)

    const token = req.cookies.token

   



    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "cohort-2-insta-clone-posts"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })

    res.status(201).json({
        message: "Post created successfully.",
        post
    })
}

async function getPostController(req, res) {
    const token = req.cookies.token

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401)
            .json({
                message: "Token Invalid"
            })
    }
    const userId = req.user

    const posts = await postModel.find({
        user: userId
    })

    res.status(200)
        .json({
            message: "Posts Fetched Successfully",
            posts
        })
}

async function getDetailsController(req, res) {
    const token = req.cookies.token

  

    const userId = req.user
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    

    return res.status(404)
    .json({
        message: "Post feched successfully",
        post
    })
}

async function likePostController(req, res) {

    const username = req.user.username
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const like = await likeModel.create({
        post: postId,
        user: username
    })

    res.status(200).json({
        message: "Post liked successfully.",
        like
    })

}

module.exports = {
    createPostController,
    getPostController,
    getDetailsController,
    likePostController
}