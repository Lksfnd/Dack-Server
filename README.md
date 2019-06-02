[![Maintainability](https://api.codeclimate.com/v1/badges/0d2e15a71d0bcd9879fd/maintainability)](https://codeclimate.com/github/Lksfnd/Dack-Server/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/0d2e15a71d0bcd9879fd/test_coverage)](https://codeclimate.com/github/Lksfnd/Dack-Server/test_coverage)
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

---
## Contributing
For contributing, there's a number of things you should know.

### Logging
All logs are stored in `/logs` and can be configured in [config.json](/config/config.json) in *#logging*.
The logs are split into different categories:  
- **access** logs list all requests made to the API
- **server** logs are for internal error stuff (everything else)

Access logs are logged using morgan automatically.  
For server logging, we use [winston](https://github.com/winstonjs/winston). The usage is as follows:
![Usage](https://i.imgur.com/WFLyLuQ.png)
> Result:
> ```log
> 2019-06-02T18:15:04.349Z [SERVER] INFO: Hello World
>```


---

### Database

We use mongodb to store all the data. After setting up the database,  
make sure to include the connection details in the main [config](/config/config.json) file.

