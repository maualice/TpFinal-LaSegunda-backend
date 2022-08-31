const { StatusCodes } = require('http-status-codes');

const getAllProducts = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'get all products' });
};

const getProduct = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'get product' });
};

const createProduct = async (req, res) => {
  res.status(StatusCodes.CREATED).json({ msg: 'create product' });
};

const updateProduct = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'update product' });
};

const deleteProduct = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'delete product' });
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
