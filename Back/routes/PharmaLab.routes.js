//! When you do "export default", you call that varibale without {}
//! When you do "export const", you call that varibale with {}
//Importing express library
import express from 'express';

import {createUser} from '../controller/userController.js';
import {login} from '../controller/userController.js';
import {pharmacies} from '../controller/userController.js';
import {getUser} from '../controller/userController.js';
import {logout} from '../controller/userController.js';
import {laboratories} from '../controller/userController.js';
import {deleteUser} from '../controller/userController.js';
import {updateUser} from '../controller/userController.js';

import {createMedicine} from '../controller/medicineController.js';
import {getMedicine} from '../controller/medicineController.js';

//Create an instance of express
const router = express.Router();

// define the home page route
//* ASYNC = this function will take a while to execute
//! THE USER APIs
router.post('/login', login)

router.post('/register', createUser)

router.get("/user", getUser)

router.post("/logout", logout)

router.get("/pharmacies", pharmacies);

router.get("/laboratories", laboratories);

router.delete("/deleteUser", deleteUser);

router.patch("/updateUser", updateUser);


//! THE MEDICINE APIs
router.post('/addMedicine', createMedicine)

router.get('/getMedicine', getMedicine)

//Exporting the router
export default router;