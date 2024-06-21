
const express = require('express');
const { getAllTours,createTour,getTourById,updateTourById,deleteTourById,aliseTopTours, getToursStats, getMonthlyStats } = require('../controller/toursController');
const { protectRoutes, restrictTo } = require('../controller/authCOntroller');
const router = express.Router();

//router.param('id', checkId)
//Get Top Tours
router.route('/top-tours').get(aliseTopTours, getAllTours);
//AGGREGATE ROUTES
router.route('/tour-stats').get(getToursStats);
router.route('/tour-monthly-stats/:year').get(getMonthlyStats);


router.route('/')
    .get(protectRoutes,getAllTours)
    .post(createTour);

router.route('/:id')
    .get(getTourById)
    .patch(updateTourById)
    .delete(protectRoutes,restrictTo('admin','lead'),deleteTourById);



module.exports = router;