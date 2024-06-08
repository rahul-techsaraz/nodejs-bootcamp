const mongoose = require('mongoose');
const { default: slugify } = require('slugify');

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
    secretTour: {
        type: Boolean,
        default:false
        
    },
    startDates: [Date],
    slug:String,
}, {
    toJSON: { virtuals: true },
    toObject:{virtuals:true}
});
// Model DESIGN
//Return virtual Schema
tourSchema.virtual('durationsWeek').get(function () {
    return this.duration / 7;
})

//Document MiddleWare: runs before .save() or .create() but not for insertMany()
tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name,{lower:true})
    next();
})
tourSchema.post('save', function (doc,next) {
    console.log(doc)
    next();
})
//MIDDLEWARE: find,findOne
tourSchema.pre(/^find/, function (next) {
     this.find({ secretTour: { $ne: true } })
    next()
})
// tourSchema.post('save', function (doc,next) {
//     console.log(doc)
//     next();
// })

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
