const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/data.json`));

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",
        result: tours.length,
        data: {
            tours
        }
    })
}
exports.createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTours = Object.assign({id:newId},req.body)
    tours.push(newTours);
    fs.writeFile(`${__dirname}/data/data.json`,JSON.stringify(tours), err => {
        res.status(200).json({
            status: "success",
            data: {
                tour:newTours
            }
        })
    })
}
exports.getTourById = (req, res) => {
   
    const tour = tours.find(tour => tour.id === req.params.id * 1)
    res.status(200).json({
        status: "success",
        data: {
            tour
        }
    })
}
exports.updateTourById = (req, res) => {
   
//TODO: Modify the object by id and return the response

    res.status(200).json({
        status: "success",
        data: {
            message:"Updated data "
        }
    })
}
exports.deleteTourById = (req, res) => {
    
//TODO: Delete the object by id and return the response

    res.status(200).json({
        status: "success",
        data: {
            message:"Data Deleted"
        }
    })
}
exports.checkId = (req, res, next, val) => {
    if (val * 1 > tours.length) {
        return res.status(404).json({
            status: "failed",
            data: {
                message:"Invalid Id"
            }
       })
    }
    next();
}

exports.checkBody = (req, res, next) => {
    if (!req.body.title || !req.body.price) {
         return res.status(400).json({
            status: "failed",
            data: {
                message:"Invalid body"
            }
       })
    }
    next();
}