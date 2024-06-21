const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

//name,email,photo,phone,password,confirmPassword

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name is required field']
    },
    email: {
        //Something@something.com
        //some 
        type: String,
        required: [true, 'Email is required field'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter valid email']
    },
    photo: String,
    role: {
        type: String,
        default: 'user',
        enum:['user','admin','lead']
    },
    password: {
        type: String,
        required: [true, 'Password is required field'],
        minlength: 5,
        select:false
    },
    confirmPassword: {
        type: String,
        required: [true, 'confirmPassword is required field'],
        validate: {
            validator: function (confirmPassword) {
                return this.password === confirmPassword
            },
            message: "Password missmatch"
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires:Date

});

//Pre Save Middleware hook
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.confirmPassword = undefined;
    next();
})

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
     
 })
//Instance method
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    
    return await bcrypt.compare(candidatePassword, userPassword);
    
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamps) {
    if (this.passwordChangedAt) {
    const convertIntoTimestamps = parseInt(this.passwordChangedAt.getTime()/ 1000, 10);
        return JWTTimestamps < convertIntoTimestamps; //
    }
    return false; 
}

userSchema.methods.craetePasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    console.log({ resetToken }, this.passwordResetToken);
    return resetToken;
}

//Model
const User = mongoose.model('User', userSchema);

module.exports = User;