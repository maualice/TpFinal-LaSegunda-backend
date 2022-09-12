const { StatusCodes } = require('http-status-codes');
const Product = require('../models/product');
const { BadRequestError, NotFoundError } = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const getAllProducts = async (req, res) => {
  const products = await Product.find().sort('createAt');
  res.status(StatusCodes.OK).json(products);
};

const getProduct = async (req, res) => {
  const { id: productID } = req.params;
  const product = await Product.findOne({ _id: productID });
  if (!product) {
    throw new NotFoundError(`No product with id ${productID}`);
  }
  res.status(StatusCodes.OK).json(product);
};

const createProduct = async (req, res) => {
  const prod = new Product({ ...req.body });

  if (req.files.image) {
    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        use_filename: true,
        folder: 'products',
      }
    );
    prod.image = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
  }
  fs.unlinkSync(req.files.image.tempFilePath);
  const product = await Product.create(prod);
  res.status(StatusCodes.CREATED).json({ product });
};

const updateProduct = async (req, res) => {
  const {
    params: { id: productID },
    body: { name, description, price },
  } = req;

  if (name === '' || description === '' || price === '') {
    throw new BadRequestError(
      'Name , Description and Price fields cannot be empty'
    );
  }
  const product = await Product.findOneAndUpdate({ _id: productID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new NotFoundError(`No product with id ${productID}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id: productID } = req.params;
  const product = await Product.findOneAndDelete({ _id: productID });
  if (!product) {
    throw new NotFoundError(`No product with id ${productID}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
