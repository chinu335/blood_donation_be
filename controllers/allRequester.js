const mongoose = require( "mongoose" );

const Requesters = mongoose.model( 'Requester' ); 

const getAllrequester  = ( req, res, next ) => {

    Requesters
            .find({})
            .then( allrequesters => res.status( 201).send( allrequesters ) )
            .catch( error => {
                if( error.Name = "ValidationError" ) {
                    error.status = 400;
                } else {
                    error.status = 500;
                }
                return next( error )
            });
};

module.exports = {
    getAllrequester
};