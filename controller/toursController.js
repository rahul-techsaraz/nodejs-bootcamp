const Tour = require('../model/toursModel');
const APIFeatures = require('../utils/apiFeatures')
//Middleware to set the query parameter

exports.aliseTopTours = (req, res, next) => {
    req.query.sort = 'price,ratingsAverage';
    req.query.fields = 'name,price,ratingsAverage,difficulty';
    req.query.limit = 5;
    next();
}


exports.getAllTours = async (req, res) => {
    try {
        // // 1) Filter the result if params are present in db
        // const queryObj = { ...req.query };
        // excludeFields = ['sort', 'page', 'limit', 'fields'];
        // excludeFields.forEach(element => delete queryObj[element]);
        
        // // 2) Advanced Filitering
        // let queryStr = JSON.stringify(queryObj);
        // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        // let query = Tour.find(JSON.parse(queryStr));

        
        // 3) SORTING
        
        // if (req.query.sort) {
        //     const sortyBy = req.query.sort.split(",").join(" ")
        //     //price name duration
        //     query = query.sort(sortyBy)
        // } else {
        //     query = query.sort('createdAt');
        // }

        //FIELDS LIMITING
        // if (req.query.fields) {
        //     const fields = req.query.fields.split(",").join(" ");
        //     //price name duration

        //     query = query.select(fields)
        // } else {
        //     query = query.select('-__v')
        // }

        // Pagination
        //page=2&limit=5, 1-5 page1, 6-10 page2,....
        // const page = req.query.page * 1 || 1;
        // const limit = req.query.limit * 1 || 100;
        // const skip = (page -1) * limit
        // query = query.skip(skip).limit(limit);

        // if (req.query.page) {
        //     const numsDocument = await Tour.countDocuments();
        //     if(skip >= numsDocument) throw new Error('Page does not exist')
        // }


        // const tour = await Tour.find({ duration: '5', difficulty: 'easy' });
        // const tour = await Tour.find().where('duration').gt(5).where('difficulty').equals('easy')
        
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
    }
    catch (err) {
        res.status(404).json({
            status: "failed",
            message:err?.message
        })
    }
    
}
//CREATE THE TOUR
exports.createTour = async (req, res) => {
    try {
          // const newTour = new Tour({});
    // newTour.save();

        const newTour = await Tour.create(req.body);
         res.status(200).json({
        status: "success",
        data: {
            tour:newTour
        }
    })
    }
    catch (err) {
        res.status(400).json({
            status: 'failed',
            message:err.message
        })
    }

  


   
}
exports.getTourById = async (req, res) => {

    try {
        const tour = await Tour.findById(req.params.id);
        //Tour.findOne({_id:req.params.id})
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })
    }
    catch (err) {
        res.status(404).json({
        status: "failed",
       message:err?.message
    }) 
   }
   
}
exports.updateTourById = async (req, res) => {
   
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators:true
        })
    res.status(200).json({
        status: "success",
        data: {
            tour
        }
    })
    }
    catch (err) {
         res.status(404).json({
        status: "failed",
       message:err?.message
    }) 
    }
    
}

exports.deleteTourById =async (req, res) => {
try {
        const tour = await Tour.findByIdAndDelete(req.params.id)
    res.status(204).json({
        status: "success",
        message: "Record deleted"
    })
    }
    catch (err) {
         res.status(404).json({
        status: "failed",
       message:err?.message
    }) 
    }
}

exports.getToursStats = async (req, res) => {
    try {
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
    } catch (err) {
        res.status(404).json({
        status: "failed",
       message:err?.message
    }) 
    }
    
}

exports.getMonthlyStats = async (req, res) => {
    try {
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
    } 
    catch (err) {
         res.status(404).json({
        status: "failed",
       message:err?.message
    }) 
    }
}

