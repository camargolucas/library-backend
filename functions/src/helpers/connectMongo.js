
require('dotenv').config();
const mongoose = require('mongoose');

const connect = () => {

    let connectionString = process.env.DB_CONNECTION_STRING
        .replace('{{password}}', process.env.MONGO_PASS);

    mongoose.connection.on('connected', function(){
        console.log('Mongo connected');
    })
    mongoose.connection.on('error', function(){
        console.log('Mongo connection error');
    })
    mongoose.connection.on('disconnected', function(){
        console.log('Mongo disconnected');
    })

    mongoose.set('strictQuery', false)

    mongoose.connect(connectionString);
}


const init = async () => {
    await connect();

}


module.exports = {
    init
}
