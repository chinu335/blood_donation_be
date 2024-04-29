// Connent to the DB
require( './data/init' );

const express = require( "express" );
const morgan = require( "morgan" );
const cors = require( "cors" );

const authRouter = require( './routes/auth' );
const donorRouter = require( './routes/donor' );
const requesterRouter = require( './routes/requester' );
const getAllrequesterRouter = require( './routes/allRequester' );
const { pageNotFoundHandler , errorHandler } = require( './middleware/error-handlers' );

const app = express();

app.use( morgan( ':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"' ) );

// sets req.body ( parses incoming JSON content in request body )
app.use( express.json() );
app.use( cors() );

// sets req.body ( parses incoming data from a form )
app.use( express.urlencoded( { extended: false } ) );

app.use( '/api', authRouter );
app.use( '/api/donor', donorRouter ); 
app.use( '/api/requester', requesterRouter );
app.use( '/api/allrequester', getAllrequesterRouter );

// page not found handler
app.use(  pageNotFoundHandler );

// error Handler
app.use( errorHandler );

const PORT = process.env.PORT || 3000;

app.listen( PORT , error => {
    if( error ) {
        return console.error( error.message )
    }

    console.log( `Server started on http://localhost:${PORT}` );
});

