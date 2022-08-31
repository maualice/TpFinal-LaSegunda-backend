const express = require('express');
const app = express();
//connect DB

//routers

//error handler

app.use(express.json());
//routes
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route </a>');
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
