const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imgUrl: {
      type: String,
      required: [true, "imgUrl is required crating a post"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "user id is require for creating a post"]
    }
})
const postModel = mongoose.model("post", postSchema)

module.exports = postModel
