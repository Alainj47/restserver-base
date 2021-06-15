const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        
        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log('BD Online');
    } catch (error) {
        console.log(error);
        throw new Error(' Error iniciar la BD');
    }
}

module.exports = {
    dbConnection
}