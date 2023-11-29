//!IMPORTS
//Import lel library express
import express from 'express';
//Importing mongoose
import mongoose from 'mongoose';
//Importing the "PharmaLab router"
import router from './routes/PharmaLab.routes.js';
//Import lel library dotenv
import dotenv from 'dotenv';
//Importing CORS
import cors from 'cors';
//importing the cookie parser
import cookieParser from 'cookie-parser';
//Configuration mta3 .env
dotenv.config();

//Create an instance of express
const app = express();

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true // Allow cookies to be sent with requests
  };  

//Create middleware
//!MIDDLEWARE: HEYA FONCTIONNALITE T7OTHA BEIN EL REQUEST W EL RESPONSE 
//!(TCONVERTI TO JSON FROM FRONT TO BACK, exp LOGIN + PASSWORD => JSON)
app.use(express.json());
app.use((request, response, next) => {
    console.log(request.path);
    //next() is a function that allows the request to continue to the next middleware
    next();
})

app.use(cookieParser());

app.use(cors(corsOptions));

//Use the PharmaLab router
app.use("/PharmaLab", router);

//Connecting to the database
//!CONNECT TO DB
mongoose.connect(process.env.DATABASE_URL, { dbName: process.env.DBNAME })
//?IF RESOLVED(CONNECTED SUCCESSFULLY), CONNECT AND DO WHAT'S INSIDE THE {}
.then(() => {
    console.log('Connected to database: ' + process.env.DBNAME);
    // Server connection
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
//?IF REJECTED(CONNECTION FAILED), CATCH THE ERROR AND DO WHAT'S INSIDE THE {}
.catch((err) => {
    console.log(err);
});

//Cypress