const mongoose = require('mongoose');
const MONGO_URL= process.env.MONGODB_URL||"mongodb://localhost:27017/my_database";

const databaseConnect =()=>{
    mongoose.connect(MONGO_URL)
    .then((conn) => {
        console.log(`Connected to db:${conn.connection.host }`);
        })
    .catch((error) => {
        // Handle any errors that occur during the connection process
        console.log(error.message)
    });
}
module.exports= databaseConnect;