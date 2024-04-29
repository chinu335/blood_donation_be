const mongoose = require( "mongoose" );
const jwt = require( "jsonwebtoken" );

const Users = mongoose.model( "User" );

const register = (req, res, next ) => {
    const userDetails = req.body;

    if( !userDetails ) {
        const error = new Error( "User details not send in request body");
        return next( error )   
    };
    
    Users
        .create( userDetails )
        .then( newUser => res.status( 201 ).json( newUser) )
        .catch( error => {
            if( error.name = "ValidationError") {
                error.status = 400;
            } else {
                error.status = 500;
            }
            return next( error )
        });
};

const login = ( req, res, next )=> {
    // this has { email: string, password: string }
    const userDetails = req.body;

    if( !userDetails ) {
        const error = new Error( "Login details are not sent in request body by the user" );
        return next( error );
    };

    if( !userDetails.email || !userDetails.password ) {
        const error = new Error( "Login details are not sent in request body by the user" );
        return next( error );
    }

    Users
        .findOne( { email: userDetails.email })
        .then( user => {
            if( !user ) {
                const error = new Error( "No matching credentials" );
                error.status = 404;
                return next( error );
            }

            // check if password matches the hashed one in DB
            user.checkPassword( userDetails.password, ( err, isMatch ) => {
                if( err ) {
                    const error = new Error( 'No matching credentials' );
                    error.status = 404;
                    return next( error );
                }

                if( !isMatch ) {
                    const error = new Error( 'No matching credentials' );
                    error.status = 404;
                    return next( error );
                }    

                // Genrate the token for login user
                const claims = {
                    userId: user._id,
                    name: user.name,
                    email: user.email
                };

                jwt.sign( claims,  'qwerty' /* || *Process.env.jwt_secret */ , { expiresIn: 24 * 60 * 60 }, ( err , token) => {
                    if( err ) {
                        err.status = 500;
                        return next ( err )
                    }

                    res.json({
                        email: user.email,
                        token: token
                    });
                });
            });   
       })
       .catch( error => {
        if( error.name = "ValidationError") {
            error.status = 400;
        } else {
            error.status = 500;
        }
        return next( error )
       });
};

module.exports = {
    register,
    login
};