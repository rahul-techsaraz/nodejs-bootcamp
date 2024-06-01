const mongoose = require('mongoose');

//MODEL(MODEL NAME,Schema)

// const tourSchema = mongoose.Schema({
//     name: String,
//     rating: Number,
//     price: Number
// });

//SCHEMA DESIGN 
const tourSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have name'],
        unique:true
    },
    duration: {
        type: Number,
        required:[true,'A tour must have a duration']
        
    },
    maxGroupSize: {
        type: Number,
        required:[true,'A tour must have a maxGroupSize']   
},
    difficulty: {
        type: String,
       required:[true,'A tour must have a maxGroupSize']
    },
    ratingsAverage: {
        type: Number,
        default:4.5
    },
    ratingsQuantity: {
        type: Number,
        default:0
    },
    price: {
        type: Number,
        required:[true, 'A tour must have price']
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim:true
    },
    description: {
        type: String,
        required:[true,'A tour must have description'],
        trim:true
    },
    imageCover: {
        type: String,
        required:[true,'A tour must have imageCover ']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startDates:[Date]
});
// Model DESIGN

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
