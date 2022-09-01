require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
//connect DB
const connectDB = require('./db/connect');
//routers
const productsRouter = require('./routes/products');
//error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
//routes
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route </a>');
});

app.use('/api/v1/products', productsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    //connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
