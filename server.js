const dotenv = require('dotenv');
dotenv.config({path:'./config.env'})
const app = require('./app');

//console.log(app.get('env'))//Express
const port = 3000;
app.listen(port, () => {
    console.log('App is running');
})