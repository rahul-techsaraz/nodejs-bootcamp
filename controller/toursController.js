const Tour = require('../model/toursModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
//Middleware to set the query parameter

exports.aliseTopTours = (req, res, next) => {
    req.query.sort = 'price,ratingsAverage';
    req.query.fields = 'name,price,ratingsAverage,difficulty';
    req.query.limit = 5;
    next();
}


//sum(1)(2)(3)()
exports.getAllTours = catchAsync(async (req, res,next) => {
        // EXECUTE
        //const tour = await query;
        const features = new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().pagination();
        const tour = await features.query;
        res.status(200).json({
        status: "success",
        result: tour.length,
        data: {
            tour
        }
    }) 
})
//CREATE THE TOUR
exports.createTour = catchAsync(async (req, res) => {
        const newTour = await Tour.create(req.body);
         res.status(200).json({
        status: "success",
        data: {
            tour:newTour
        }
    }) 
})
exports.getTourById = catchAsync(async (req, res,next) => {

        const tour = await Tour.findById(req.params.id);
    //Tour.findOne({_id:req.params.id})
    if (!tour) {
            return next(new AppError('No record found for thid ID',404))
        }
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })
   
   
})
exports.updateTourById = catchAsync(async (req, res) => {
   
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators:true
        })
    if (!tour) {
            return next(new AppError('No record found for thid ID',404))
        }
    res.status(200).json({
        status: "success",
        data: {
            tour
        }
    })
   
    
})

exports.deleteTourById =catchAsync(async (req, res) => {
    const tour = await Tour.findByIdAndDelete(req.params.id)
    if (!tour) {
            return next(new AppError('No record found for thid ID',404))
        }
    res.status(204).json({
        status: "success",
        message: "Record deleted"
    })
    
})

exports.getToursStats = catchAsync(async (req, res) => {
       const stats = await Tour.aggregate([
    //Stage 1
        {
            $match:{ratingsAverage:{$gte:4.5}}
        },
        //Stage 2
        // {
        //     $group: {
        //         _id: null,
        //         numRatings: { $sum: '$ratingsQuantity' },
        //         avgRatings: { $avg: '$ratingsAverage' },
        //         avgPrice: { $avg: '$price' },
        //         minPrice: { $min: '$price' },
        //         maxPrice:{$max:'$price'}     
        //  }
        // }
        {
            $group: {
                _id: '$difficulty',
                numRatings: { $sum: '$ratingsQuantity' },
                avgRatings: { $avg: '$ratingsAverage' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice:{$max:'$price'}     
            } ,
           
           },
         //Stage 3
           {
               $sort:{avgPrice:1}
           },
           {
               $match:{_id:{$ne:'easy'}}
           }

       ]) 
         res.status(200).json({
        status: "success",
        data: {
            stats
        }
    })
    
    
})

exports.getMonthlyStats = catchAsync(async (req, res) => {
        const year = req.params.year * 1;

        const plan = await Tour.aggregate([
        //STAGE1
            {
                $unwind: '$startDates'
            },
            //STAGE 2
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte:new Date(`${year}-12-31`)
                    }
                }
            },
            //STAGE 3
            {
                $group: {
                    _id: { $month: '$startDates' },
                    numsTour: { $sum: 1 },
                    tours:{$push:'$name'}
                }
            },
            //STAGE 4
            {
                $addFields: {
                    month:'$_id'
                }
            },
            //STAGE 5
            {
                $project: {
                    _id:0
                }
            },
            //STAGE 6
            {
                $sort:{numsTour:-1}
            }
        ]);
        res.status(200).json({
        status: "success",
        data: {
            plan
        }
    })
    
})

