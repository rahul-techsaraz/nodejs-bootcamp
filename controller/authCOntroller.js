const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const {promisify} = require('util')

const signToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET_KEY, {
        expiresIn:process.env.JWT_TOKEN_EXPIRE_IN
    })
}

exports.signup = catchAsync(async (req, res, next) => {
    //H/w extract the potential from req.body

    const newuser = await User.create(req.body);
    const token = signToken(newuser._id, newuser.email);
    res.status(201).json({
        status: 'success',
        token,
        data: {
            user:newuser
        }
    })
})

exports.login = catchAsync(async (req, res, next) => {

    const { email, password } = req.body;

    //1) Check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please provide valid email and password', 400));
    }
    //2) Check if email and password is correct or not
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Invalid email or password', 401));
    }


    //3) If everything ok, send the token with response
    const token = signToken(user._id, user.email);

 res.status(201).json({
        status: 'success',
        token,
    })



})

//Protect Routes Middleware

exports.protectRoutes = catchAsync(async (req, res, next) => {
    let token;
    //1) Check the token is present inside the header or not, If it's there then Extract it
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
     }
    if (!token) {
        return next(new AppError('You are not logged in. Please logged in and try', 401));
     }
    //2) validate token on basis data payload and expire time

    // const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)
    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
   console.log(decode)

    // 3) check if user stil exists

    const currentUser = await User.findOne({email:decode.email});
    console.log(currentUser)
    if (!currentUser) {
        return next(new AppError('The user belonging to token is no longer is exist',401))
    }

    //4) Check if user changed the password after token was issued
    if (currentUser.changedPasswordAfter(decode.iat)) {
        return next(new AppError('User has changed the password recently, Please login again',401))
        
    }

    // Grant Access to Routes

    next();

})