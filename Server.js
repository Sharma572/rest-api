// SETP -1 Import Express module with help of esm module. 
import express from 'express';
import {APP_PORT} from './config'

// Connect app with expres.
const app = express();


app.listen(APP_PORT,()=>{
    console.log(`Listning on port ${APP_PORT}`);
});