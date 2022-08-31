const express = require('express');
const app = express();
//connect DB

//routers
const productsRouter = require('./routes/products');
//error handler
const notFoundMiddleware = require('./middleware/not-found');

app.use(express.json());
//routes
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route </a>');
});

app.use('/api/v1/products', productsRouter);

app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    //connectDB
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
