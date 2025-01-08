const express = require('express');
const { createBooking } = require('../controllers/bookingCntrl');

const bookingRouter = express.Router();

bookingRouter.post('/', createBooking);

module.exports =bookingRouter;