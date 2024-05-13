const fs = require('fs');
const express = require('express');

const app = express();
//Middleware
app.use(express.json());
//Middleware is normal javascript function thats heps to modify incoming request


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
const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/data.json`));
// app.get('/api/v1/tours', getAllTours)
// app.post('/api/v1/tours', createTour);
//app.get('/api/v1/tours/:id/:messageId/:newId?', (req, res) => {
// app.get('/api/v1/tours/:id', getTourById)
// app.patch('/api/v1/tours/:id', updateTourById)
// app.delete('/api/v1/tours/:id', deleteTourById)

app.route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour);

app.route('/api/v1/tours/:id')
    .get(getTourById)
    .patch(updateTourById)
    .delete(deleteTourById)


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