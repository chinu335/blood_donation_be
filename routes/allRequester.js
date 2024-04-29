const express = require( "express" );

const { getAllrequester } = require( '../controllers/allRequester' );
const { authenticate } = require( '../middleware/auth' );

const router = express.Router();

router.get( '/', authenticate, getAllrequester );

module.exports = router;
