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
    rating: {
        type: Number,
        default:4.5
    },
    price: {
        type: Number,
        required:[true, 'A tour must have price']
    }
});
// Model DESIGN

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
