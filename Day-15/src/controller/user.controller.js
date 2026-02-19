const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")



async function followUserController(req, res) {

    const followerUsername = req.user.username
    const followeeUsername = req.params.username


    if (followeeUsername == followerUsername) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        })
    }

    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername
    })

    if (!isFolloweeExists) {
        return res.status(404).json({
            message: "User you are trying to follow does not exist"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    })

    if (isAlreadyFollowing) {
         res.status(200).json({
            message: `You are already following ${followeeUsername}`,
            follow: isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(201).json({
        message: `You are now following ${followeeUsername}`,
        follow: followRecord
    })
}

// Accept Follow Request Function

async function acceptFollowRequest(req, res) {
    const requestId = req.params.requestId;
    const currentUser = req.user.username;

    const request = await followModel.findOneAndUpdate(
        {
            _id: requestId,
            followee: currentUser,
            status: "pending"
        },
        {
            status: "accepted"
        },
        { new: true }
    );

    if (!request){
        return res.status(404).json({
            message: "Follow request not found or already processed"
        });
    }

    res.status(200).json({
        message: "Follow Request accepted",
        request
    });
}


// Reject Follow Request
async function rejectFollowRequest(req, res) {
    const requestId = req.params.requestId;
    const currentUser = req.user.username;

    const request = await followModel.findOneAndUpdate(
        {
            _id: requestId,
            followee: currentUser,
            status: "pending"
        },
        {
            status: "rejected"
        },
        { new: true }
    );

    if (!request){
        return res.status(404).json({
            message: "Follow request not found or already processed"
        });
    }

    res.status(200).json({
        message: "Follow request Rejected",
        request
    });
}





async function unfollowUserController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if (!isUserFollowing) {
        res.status(200).json({
            message: `You are not following ${followerUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message: `You have unfollwed ${followeeUsername}`
    })
}



module.exports = {
    followUserController,
    unfollowUserController,
    acceptFollowRequest,
    rejectFollowRequest
}