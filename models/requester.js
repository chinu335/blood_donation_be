const mongoose = require( "mongoose" );

const requesterSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    units: {
        type: Number,
        required: true,
        min: 1,
        max: 20
    },
    date: {
        type: Date,
        require : true
    },
    hospitalName:{
        type: String,
        required: true
    },
    location: {
        city: {
            type: String,
            required: true
        },
        state: {
                type: String,
                required: true
            }
    },
    email: {
        type: String,
        required: true,
    },
    contact: {
            type: Number,
            required: true
    },
    urgerntRequirment: {
        type: String,
        required: true
    }
});

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validBloodGroupRegex = /^(A|B|AB|O)[+-]$/;

// Custom Email validation before saving to DB
requesterSchema.path( "email" ).validate(
    email => emailRegex.test( email ),
    'Invalid email id fromat'
);

requesterSchema.path( "bloodGroup").validate(
    bloodGroup => validBloodGroupRegex.test( bloodGroup ),
    'Invalid blood group format , Right format- A+,B+,AB+,O+,O-,A-,B-,AB- '
);

mongoose.model( 'Requester', requesterSchema );