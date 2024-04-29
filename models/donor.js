const mongoose = require( "mongoose" );

const donorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    contactNumber: {
        type: Number,
        required: true,
    },
    location:{
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        }
    }
});

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validBloodGroupRegex = /^(A|B|AB|O)[+-]$/;

// Custom Email validation before saving to DB
donorSchema.path( "email" ).validate(
    email => emailRegex.test( email ),
    'Invalid email id fromat'
);

donorSchema.path( "bloodGroup").validate(
    bloodGroup => validBloodGroupRegex.test( bloodGroup ),
    'Invalid blood group format , Right format- A+,B+,AB+,O+,O-,A-,B-,AB- '
);


mongoose.model( 'Donor', donorSchema );