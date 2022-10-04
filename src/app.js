import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './routes/web';

const app = express();
const port = 3000;
// database
const db =  require('./configs/database');


//Test DB
db.authenticate()
    .then(() => console.log('database connected...'))
    .catch(err => console.log('Error ' + err))

// setup view engine
configViewEngine(app);

//init web route
initWebRoute(app);


app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
})
