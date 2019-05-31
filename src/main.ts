/*
Logger: https://github.com/winstonjs/winston

*/
import express from 'express';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 3000;

// logging
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({
    message: "Hello World!"
  })
});


app.listen(port, () => {

  return console.log(`server is listening on http://localhost:${port}`);
  
});