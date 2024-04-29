const express = require( "express" );

const{ addDonor, getDonors, removeYourself, getAllDonors } = require( '../controllers/donor' );
const { authenticate } = require( '../middleware/auth' );

const router = express.Router();

router.post('/', authenticate, addDonor );

router.get( '/', authenticate,getDonors );

router.get( '/all', authenticate,getAllDonors );

router.delete( '/:id', authenticate, removeYourself )

module.exports = router;