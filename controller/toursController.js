const Tour = require('../model/toursModel');

exports.getAllTours = async (req, res) => {
    try {
        const tour = await Tour.find();
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
exports.deleteTourById = (req, res) => {
    
//TODO: Delete the object by id and return the response

    // res.status(200).json({
    //     status: "success",
    //     data: {
    //         message:"Data Deleted"
    //     }
    // })
}


