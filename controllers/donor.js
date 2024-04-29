const mongoose = require( "mongoose" );

const Donors = mongoose.model( 'Donor' );

const addDonor = ( req, res, next ) => {
    const donorDetails = req.body;
    const userEmail = res.locals.claims.email;

    if( !donorDetails ) {
        const error = new Error( "Donor details are not in the request body" )
        return next( error)
    };
    if( donorDetails.email === userEmail ) {

        Donors
            .create( donorDetails )
            .then( donor => res.status( 201 ).send( donor ) )
            .catch( error => {
                if( error.name = 'ValidationError' ) {
                    error.status = 400;
                } else {
                    error.status = 500;
                }
                return next( error )
        });
    } else {
        let error = new Error( "Email id is not register" )
        return next( error )
    }    
  
};

const getDonors = ( req, res, next ) => {
    let city = req.query.city;
    const bloodGroup = req.query.bloodGroup;

    if( city ) {
        city = req.query.city.toLowerCase();
    }; 
    
    console.log( "city = ",city );
    console.log( "bg = ", bloodGroup );

    const allBloodGroups = [ "A+", "B+", "AB+", "O+", "O-", "A-", "B-", "AB-" ]
    const cities = [ 'ajmer','alwar','banswara','baran','barmer','bharatpur','bhilwara','bikaner','bundi','chittorgarh','churu', 'dausa','dholpur','dungarpur','janumangarh','jaipur','jaisalmer','jalore','jhalawar','jhunjhunu','jodhpur','karauli','kota','nagaur','pali','pratapgarh','rajsamand','sawai madhopur','sikar','sirohi','sri ganganagar','tonk','udaipur' ];
        
    if( allBloodGroups.includes( bloodGroup ) && cities.includes( city ) ) {
        Donors
            .find( { 
                    "location.city" : city ,
                    bloodGroup : bloodGroup 
            } )
            .then( donors => res.status( 201 ).send( donors ))
            .catch( error => {
                if( error.Name = "ValidationError" ) {
                    error.status = 400;
                } else {
                    error.status = 500;
                }
                return next( error )
            });

    } else if ( allBloodGroups.includes( bloodGroup ) && !cities.includes( city ) ) {
        Donors
            .find( {
                bloodGroup: bloodGroup
            } )
            .then( alldonors => res.status( 201 ).send( alldonors ) )
            .catch(error => {
                if( error.Name = "ValidationError") {
                    error.status = 400;
                } else {
                    error.status = 500;
                }
                return next( error )
            }); 

   } else if ( !allBloodGroups.includes( bloodGroup ) && cities.includes( city ) ) {
       Donors
            .find({
                "location.city": city
            })
            .then( alldonors => res.status( 201 ).send( alldonors ) )
            .catch( error => {
                if( error.Name = "ValidationError" ) {
                    error.status = 400;
                } else {
                    error.status = 500;
                }
                return next( error )
            });
   }  else {
       Donors
            .find({})
            .then( alldonors => {
                // console.log( alldonors );
                res.status( 201 ).send( alldonors ) 
            })
            .catch(error => {
                if( error.Name = "ValidationError" ) {
                    error.status = 400;
                } else {
                    error.status = 500;
                }
                return next( error )
            });
   }
};

const removeYourself = ( req, res, next ) => {
    const donorId = req.params.id;
    console.log( "id =", donorId )
    const userEmail = res.locals.claims.email;

    if( !donorId ) {
        const error = new Error( "Give the right api url( request )" );
        return next( error )
    }
    
    Donors
        .findById( donorId )
        .then( donor => {
            if( !donor ) {
                res.send( "Not a register donor" )
            };

            if( donor.email === userEmail ) {
                Donors
                    .findByIdAndDelete( donorId )
                    .then( () => res.status( 201 ).send( "Donor is successfully removed"))
                    .catch ( error => {
                        err.status = 500;
                        return next( error )
                    });
            } else {
                res.send( "you are not a register user");
            }
        })
        .catch( error => {
            if( error.Name = "ValidationError" ) {
                error.status = 400;
            } else {
                error.status = 500;
            }
            return next( error )
        });
};

const getAllDonors = ( req, res, next ) => {
    Donors
        .find({})
        .then( alldonors => {
            res.status( 201 ).send( alldonors ) 
        })
        .catch(error => {
            if( error.Name = "ValidationError" ) {
                error.status = 400;
            } else {
                error.status = 500;
            }
            return next( error )
        });
}

module.exports = {
    addDonor,
    getDonors,
    removeYourself,
    getAllDonors
};