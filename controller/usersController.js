const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const User = require('../model/userModel');

exports.getAllUsers = catchAsync(async (req, res, next) => {
        // EXECUTE
        //const tour = await query;
        const features = new APIFeatures(User.find(), req.query).filter().sort().limitFields().pagination();
        const user = await features.query;
        res.status(200).json({
        status: "success",
        result: user.length,
        data: {
            user
        }
    }) 
})
exports.createUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message:"This route not yet created"
    })
}
exports.getUserById = (req, res) => {
    res.status(500).json({
        status: "error",
        message:"This route not yet created"
    })
}
exports.updateUserById = (req, res) => {
    res.status(500).json({
        status: "error",
        message:"This route not yet created"
    })
}
exports.deleteUserById = (req, res) => {
    res.status(500).json({
        status: "error",
        message:"This route not yet created"
    })
}