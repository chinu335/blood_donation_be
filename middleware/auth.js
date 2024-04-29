const jwt = require( "jsonwebtoken" );

const authenticate = ( req, res, next ) => {
    const token = req.header( 'Authorization' );

    if( !token) {
        const error = new Error( "Go away Intruder");
        error.status = 403;
        return next( error )
    }

    jwt.verify( token , 'qwerty' , ( err, claims) => {
        if( err ) {
            const error = new Error( "Go away Intruder" );
            error.status = 403;
            return next( error ) 
        }

        // Everthing is fine , user can go to this page
        res.locals.claims = claims;
       
        next();
    })
};

module.exports = { 
    authenticate 
};