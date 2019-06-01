# Dack-Server
A scoreboard &amp; tournament manager for Darts

## Technologies
Below is a short explanation of which technologies are used and what they're used for.  
- MongoDB - For all data storage
  - mongoose - Node library for managing the connection to mongodb
  - jsonwebtoken - Node library for handling sessions/tokens
  - password-hash - Node library for hashing password
- Express - The webserver itself
  - morgan - Logging library to log all requests of the webserver

## Setting up

### Database

We use mongodb to store all the data. After setting up the database,  
make sure to include the connection details in the main [config](/config/config.json) file.

