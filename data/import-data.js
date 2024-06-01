const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'})

const Tour = require('../model/toursModel');

const UPDATED_CONNECTION_STRING = process.env.DB_CONNECTION_STRING.replace('<PASSWORD>', process.env.DB_PASSWORD);

//DB CONNECT

mongoose.connect(UPDATED_CONNECTION_STRING).then(con => {
    console.log('DB Connected Succesfully')
})
    .catch(err => console.log(err));

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, 'utf-8'));

const importData = async () => {
     
    try {
      await Tour.create(tours);
        console.log('Data Imported Successfully')  
        process.exit();
    }
    catch (err) {
        console.log(err)
    }
}

const deleteData = async () => {
     
    try {
      await Tour.deleteMany();
        console.log('Data Deleted Successfully') 
        process.exit();    
    }
    catch (err) {
        console.log(err)
    }
}
if (process.argv[2] === '--imported') {
    importData();
} else if (process.argv[2] === '--deleted') {
    deleteData();
}
console.log(process.argv);