const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI , { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoBd connection successfull");
    }
    catch(error){
        console.log(`error ${error}`);
        process.exit(1);
    }
}
module.exports = connectDB;