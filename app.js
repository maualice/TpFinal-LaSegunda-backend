require('dotenv').config();
require('express-async-errors');

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

//Swagger
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const express = require('express');
const app = express();

const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
//connect DB
const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');
//routers
const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');
const storesRouter = require('./routes/stores');
const contactsRouter = require('./routes/contacts');
const ordersRouter = require('./routes/orders');
//error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true, //lo guarda temporalmente en local
    tempFileDir: './uploads',
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

//routes
app.get('/', (req, res) => {
  res.send('<h1>API</h1><a href="/api-docs">Documentation</a>');
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/api/v1/products', productsRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/stores', storesRouter);
app.use('/api/v1/contacts', contactsRouter);
app.use('/api/v1/orders', ordersRouter);

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
