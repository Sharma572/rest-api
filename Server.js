// SETP -1 Import Express module with help of esm module. 
import express from 'express';
import {APP_PORT} from './config'
import errorHandler from './middleware/errorHandler';
// Connect app with expres.
const app = express();
import routes from './routes'

app.use(express.json())
app.use('/api', routes)


app.use(errorHandler);

app.listen(APP_PORT,()=>{
    console.log(`Listning on port ${APP_PORT}`);
});