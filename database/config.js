const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB online');
    } catch (error) {

        console.log(erorr);
        throw new Error('Error al iniciar la DB');
    }
};


module.exports = {
    dbConnection
};