const express = require('express');
const app = express();
//connect DB

//routers

//error handler
const notFoundMiddleware = require('./middleware/not-found');

app.use(express.json());
//routes
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route </a>');
});

app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
