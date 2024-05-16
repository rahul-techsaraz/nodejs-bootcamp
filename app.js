const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();
//Middleware
app.use(express.json());
app.use(morgan('dev')); // Third Party MiddleWare
app.use((req, res, next) => { // Custom Middleware
    console.log('Handling our Middleware');
    next();
});
// app.use((req, res, next) => {
//     console.log('Handling our another Middleware');
//     next();
// });
//Middleware is normal javascript function thats helps to modify incoming request
/**
 * Incopming Req -> Middleware Fn() -> next()
 * 
 */


// app.get('/', (req, res) => {
//     res.status(200).json({
//         status: "success",
//         data: {
//             message:"Data is fetched"
//         }
//     })
// })
// app.post('/', (req, res) => {
//     res.status(200).send('Done')
// })
const getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",
        result: tours.length,
        data: {
            tours
        }
    })
}
const createTour = (req, res) => {
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
const getTourById = (req, res) => {
    const id = req.params.id * 1;

    if (id > tours.length) {
        return res.status(404).json({
            status: "failed",
            data: {
                message:"Invalid Id"
            }
       })
    }
    const tour = tours.find(tour => tour.id === id)
    res.status(200).json({
        status: "success",
        data: {
            tour
        }
    })
}
const updateTourById = (req, res) => {
    const id = req.params.id * 1;
    if (id > tours.length) {
        return res.status(404).json({
            status: "failed",
            data: {
                message:"Invalid Id"
            }
       })
    }
//TODO: Modify the object by id and return the response

    res.status(200).json({
        status: "success",
        data: {
            message:"Updated data "
        }
    })
}
const deleteTourById = (req, res) => {
    const id = req.params.id * 1;
    if (id > tours.length) {
        return res.status(404).json({
            status: "failed",
            data: {
                message:"Invalid Id"
            }
       })
    }
//TODO: Delete the object by id and return the response

    res.status(200).json({
        status: "success",
        data: {
            message:"Data Deleted"
        }
    })
}

//User Controller

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: "error",
        message:"This route not yet created"
    })
}
const createUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message:"This route not yet created"
    })
}
const getUserById = (req, res) => {
    res.status(500).json({
        status: "error",
        message:"This route not yet created"
    })
}
const updateUserById = (req, res) => {
    res.status(500).json({
        status: "error",
        message:"This route not yet created"
    })
}
const deleteUserById = (req, res) => {
    res.status(500).json({
        status: "error",
        message:"This route not yet created"
    })
}
const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/data.json`));

const toursRouter = express.Router();

app.use('/api/v1/tours', toursRouter);

toursRouter.route('/')
    .get(getAllTours)
    .post(createTour);

toursRouter.route('/:id')
    .get(getTourById)
    .patch(updateTourById)
    .delete(deleteTourById)



app.route('/api/v1/users')
    .get(getAllUsers)
  .post(createUser)
app.route('/api/v1/user/:id')
    .get(getUserById)
    .patch(updateUserById)
    .delete(deleteUserById)

app.listen(3000, () => {
    console.log('App is running');
})
//REST API

//ARCHITECTURE
/**
 * 1. Seprate API into logical resources:/tours,/signup
 * 2. resource based url : www.travelbook.com/api/v1/tours,/getAllTours
 * 3. use HTTP method(GET,POST,PUT,PATCH,DELETE)
 * 4. send data as json
 * 5. stateless
 * 
 * www.travelbook.com/api/v1/tours,/tours/2
 * www.travelbook.com/api/v1/tours,/tours/5
 */