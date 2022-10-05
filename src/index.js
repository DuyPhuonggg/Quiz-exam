const express = require('express');
const db =  require('./configs/database');
const { userRouter, authRouter, } = require('./routes/index');
const app = express();
const port = 3000;

//Test database is connected 
db.authenticate()
    .then(() => console.log('database connected...'))
    .catch(err => console.log('Error ' + err))

//routes
app.use('/', authRouter);
app.use('/api/users', userRouter);


app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
})
