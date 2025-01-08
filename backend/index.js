require('dotenv').config();
const express = require('express');
const cors = require('cors');
//const bodyParser = require('body-parser');
const path = require('path')
const RunServer = require('./database/connection');
const bookingRouter = require('./router/bookingRouter');
const HotelRouter = require('./router/hotelRoutes');
const adminRouter = require('./router/admin');

const app = express();
const port = process.env.PORT;


app.use(express.json());
app.use(cors());
app.use('/api/bookings', bookingRouter);
app.use('/api/hotels', HotelRouter)
app.use('/api/admin', adminRouter)

// app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); //serve static file

RunServer();
app.listen(port, () => {
    console.log(`server is runing on ${port} port`)
})