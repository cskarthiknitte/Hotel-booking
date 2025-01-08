const path = require("path");
const fs = require("fs");
const Hotel = require("../models/hotel");

//function to get all hotels
exports.getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.json(hotels);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server Error');
    }
};

//function to add a new hotel
exports.addHotel = async (req, res) => {
    const { hotelName } = req.body;
    const hotelImage = req.file ? req.file.filename : '';
    try {
        const newHotel = new Hotel({
            hotelName,
            hotelImage,
        });

        const hotel = await newHotel.save();
        res.json(hotel);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server Error');
    }
};

//function delete hotel
exports.deleteHotel = async (req, res) => {
    try {
        console.log(`Attempting to delete hotel with id: ${req.params.id}`)
        const hotel = await Hotel.findById(req.params.id);

        if (!hotel) {
            console.log('Hotel not found');
            return res.status(404).json({ msg: 'Hotel not found' });
        }

        //delete image file if exists
        if (hotel.hotelImage) {
            try {
                const imagePath = path.join(__dirname, '..', 'uploads', hotel.hotelImage)
                console.log(`Deleting image: ${imagePath}`);
                FileSystem.unlinkSync(imagePath);
                console.log(`Image ${hotel.hotelImage} deleted successfully`);
            } catch (error) {
                if (error.code === 'ENOENT') {
                    console.log(`Image ${hotel.hotelImage} not found,skipping deletion`);
                } else {
                    console.error(`Error deleting image ${hotel.hotelImage}:`, error.message);
                    console.log(`Image ${hotel.hotelImage} not found, skipping deletion`);

            }
        }
    }

            await Hotel.deleteOne({ _id: req.params.id });
            // Use deleteOne method

            console.log(`Hotel with id: ${req.params.id} deleted successfully`);

            res.json({ msg: 'Hotel removed' });
       
        
    } catch (err) {
    console.error('Error removing hotel:', err.message);

    res.status(500).send("Server Error")
}
};