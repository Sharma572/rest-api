// STEP -1 Import Express module with help of esm module. 
import express from 'express';
import mongoose from 'mongoose';
import {APP_PORT,DB_URL} from './config'
import errorHandler from './middleware/errorHandler';

// Connect app with express.
const app = express();
import routes from './routes'

// DataBase Connection
 mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',()=>{
    console.log('DB Connected');
})
app.use(express.json())
app.use('/api', routes)


app.use(errorHandler);

app.listen(APP_PORT,()=>{
    console.log(`Listening on port ${APP_PORT}`);
});