
const express = require('express');
const { getAllTours,createTour,getTourById,updateTourById,deleteTourById, checkId,checkBody } = require('../controller/toursController');
const router = express.Router();

//router.param('id', checkId)


router.route('/')
    .get(getAllTours)
    .post(createTour);

router.route('/:id')
    .get(getTourById)
    .patch(updateTourById)
    .delete(deleteTourById);



module.exports = router;