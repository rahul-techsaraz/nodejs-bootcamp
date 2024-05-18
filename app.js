const express = require('express');
const morgan = require('morgan');
const toursRouter = require('./routes/toursRoute');
const usersRouter = require('./routes/usersRoute');


const app = express();
//Middleware
app.use(express.json());
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'developement') {
app.use(morgan('dev')); // Third Party MiddleWare
    
}

app.use('/api/v1/tours', toursRouter);

app.use('/api/v1/users', usersRouter);


module.exports = app;

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