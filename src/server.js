import express from 'express';
import configViewEngine from './configs/viewEngine';

const app = express();
const port = 3000;

configViewEngine(app);

app.get('/', (req,res)  =>{
    res.render('index.ejs');
})

app.get('/about', (req,res) => {
    res.render(`I'M Phuong`);
})

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
})
