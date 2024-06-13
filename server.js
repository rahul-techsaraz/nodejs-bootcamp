const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({path:'./config.env'})
const app = require('./app');
const UPDATED_CONNECTION_STRING = process.env.DB_CONNECTION_STRING.replace('<PASSWORD>', process.env.DB_PASSWORD);

//DB CONNECT

mongoose.connect(UPDATED_CONNECTION_STRING).then(con => {
    console.log('DB Connected Succesfully')
})
    .catch(err => console.log(err))


// const tour = new Tour({
//     name: "Tour 2",

// })

// tour.save().then(doc => {
//     console.log(doc)
// }).catch(err => console.log(err))



//console.log(app.get('env'))//Express
const port = 3000;
app.listen(port, () => {
    console.log('App is running');
});