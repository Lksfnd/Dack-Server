/*

*/
// Import Packages
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import jsonWebToken from 'jsonwebtoken';
import config from '../config/config.json';

// Import Routes
import RouteStatus from './routes/status';
import RouteAuthenticate from './routes/authenticate';


const app = express();
const port: number = config.server.port; //TODO: cfg

// Mongoose Database connection
const connectionString: string = `mongodb://${config.database.host}:${config.database.port}/${config.database.database}`;

// Connect to the database
mongoose.connect(connectionString, { useNewUrlParser: true });

const db = mongoose.connection;

// Database connection error
db.on('error', error => {
  console.error('Database connection error', error);
});

db.on('open', () => {
  console.log('Connected to database successfully!');
});

// logging requests to console via morgan in dev-mode
app.use(morgan('dev'));

// Parse URL-Encoded bodies
app.use(bodyParser.urlencoded({
  extended: false // Only simple bodies
}));

// Handle JSON bodies
app.use(bodyParser.json());

// Through all requests, send CORS allow headers
app.use((req, res, next) => {

  // Load Headers from config
  for (const header in config.api.headers) {
    res.header(header, config.api.headers[header]);
  }

  // Options request
  if (req.method === 'OPTIONS') {

    res.header('Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE'
    );

    return res.status(200).json({});
  }

  next();

});

/*
*   Not authenticated routes
*/
app.use('/status', RouteStatus); // Status Page
app.use('/authenticate', RouteAuthenticate); // Authentication (for logging in)

/*
*   Authenticated routes
*/


// no routes found
app.use((req, res, next) => {

  const error: any = new Error('Request not found');
  error.status = 404;
  next(error);

});

// Error
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      type: "Internal Server Error",
      message: error.message
    }
  });
});



app.listen(port, () => {

  return console.log(`server is listening on http://localhost:${port}`);

});