const mongoose = require('mongoose');

const dbConnect = async(URI) => {
    // try {
    await mongoose.connect(/*process.env.MONGODB_URI*/URI, {
        useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true
    });
        console.log('conectado a MongoDB');
    // } catch (err) {
    //     console.log('error en mongoDB', err);
    // }
}

// db();

module.exports = dbConnect;
