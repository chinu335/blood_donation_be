const mongoose = require( "mongoose" );

const Requesters = mongoose.model( 'Requester' );


const addRequester = ( req, res, next ) => {
    const requesterDetails = req.body;
    const userEmail = res.locals.claims.email;
    //console.log( "email = ", userEmail );

    if( !requesterDetails ) {
        const error = new Error( "Requester details are not in the request body" );
        error.status = 400; //bad request
        return next( error )
    }
     
    if( requesterDetails.email === userEmail) {
        Requesters
            .create( requesterDetails )
            .then( requester => res.status( 201).send( requester) )
            .catch( error => {
                if( error.Name = "ValidationError" ) {
                    error.status = 400;
                } else {
                    error.status = 500;
                }
                return next ( error )
        });
    } else {
        let error = new Error( "Email id is not register" )
        return next( error )
    }    

};

const removeRequest = ( req, res, next ) => {
    const requestId = req.params.id;
    const userEmail = res.locals.claims.email;
  
    if( !requestId ) {
        const error = new Error(  "Give the right api url( request )" );
        error.status = 400;
        return next( error )
    };
    
    Requesters
            .findById( requestId )
            .then( requestdetails => {
                if( !requestdetails ) {
                    res.send( "Not a valid register helping request" )
                }

                if( requestdetails.email === userEmail ) {
                    Requesters
                        .findByIdAndDelete( requestId )
                        .then( () => res.status( 201).send( "Helping Request is succesfully removed") )
                        .catch ( error => {
                            err.status = 500;
                            return next( error )
                        });
                } else {
                    res.send( "Not a register user")
                }
            })
            .catch( error => {
                if( error.Name = "ValidationError" ) {
                    error.status = 400;
                } else {
                    error.status = 500;
                }
                return next ( error )
            });
};


const findRequest = ( req, res, next ) => {
    let timeZone = req.query.timezone;
    const userEmail = res.locals.claims.email;
     
    // @formating the date
    const currentDate = () => {
        let d = new Date(),
        month = '' + ( d.getMonth() + 1 ),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    };

   allTimeZones = [ "present", "past", "future" ]
   
   // @getting requests based on the timezone    
   if( timeZone === allTimeZones[0] ) {
       Requesters
            .find( 
                { email: userEmail,
                  date: { $eq: currentDate() }      
            })
            .then( requests => res.send( requests ) )
            .catch( error => {
                if( error.Name = "ValidationError" ) {
                    error.status = 400;
                } else {
                    error.status = 500;
                }
                return next ( error )
            });            
   } else if ( timeZone === allTimeZones[1] ) {
       Requesters
            .find({
                email: userEmail,
                date: { $lt: currentDate() }
            })
            .then( requests => res.send( requests ) )
            .catch( error => {
                if( error.Name = "ValidationError" ) {
                    error.status = 400;
                } else {
                    error.status = 500;
                }
                return next ( error )
            }); 
   } else if( timeZone === allTimeZones[2] ) {
        Requesters
            .find({
                email: userEmail,
                date: { $gt: currentDate() }
            })
            .then( requests => res.send( requests ) )
            .catch( error => {
                if( error.Name = "ValidationError" ) {
                    error.status = 400;
                } else {
                    error.status = 500;
                }
                return next ( error )
            }); 
    } else {
       Requesters
            .find({
                email: userEmail
            })
            .then( requests => res.send( requests ) )
            .catch( error => {
                if( error.Name = "ValidationError" ) {
                    error.status = 400;
                } else {
                    error.status = 500;
                }
                return next ( error )
            }); 
    }
};

const getRequestById = ( req, res, next) => {
    const id = req.params.id;

    if( !id ) {
        const error = new Error(  "Give the right api url( request )" );
        error.status = 400;
        return next( error )
    };

    Requesters
        .findById( id )
        .then( request => res.status( 201 ).send( request))
        .catch( error => {
            if( error.Name = "ValidationError" ) {
                error.status = 400;
            } else {
                error.status = 500;
            }
            return next ( error )
        }); 
}

module.exports = {
    addRequester,
    removeRequest,
    findRequest,
    getRequestById
};