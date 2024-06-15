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
    password: {
        type: String,
        required: [true, 'Password is required field'],
        minlength: 5
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
    }

});

//Pre Save Middleware hook
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.confirmPassword = undefined;
    next();
})


//Model
const User = mongoose.model('User', userSchema);

module.exports = User;