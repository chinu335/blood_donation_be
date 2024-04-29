const express = require( "express" );

const { addRequester, removeRequest, findRequest, getRequestById } = require( '../controllers/requester' );
const { authenticate } = require( '../middleware/auth' );


const router = express.Router();

router.post( '/', authenticate , addRequester );

router.delete( '/:id', authenticate, removeRequest );

router.get( '/', authenticate, findRequest );

router.get( '/:id', authenticate, getRequestById )

module.exports = router;