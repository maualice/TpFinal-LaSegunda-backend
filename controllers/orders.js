const { StatusCodes } = require('http-status-codes');
const Order = require('../models/order');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllOrders = async (req, res) => {
  const orders = await Order.find().sort('createAt');
  res.status(StatusCodes.OK).json( orders );
};

const getOrder = async (req, res) => {
  const { id: orderID } = req.params;
  const order = await Order.findOne({ _id: orderID });
  if (!order) {
    throw new NotFoundError(`No order with id ${orderID}`);
  }
  res.status(StatusCodes.OK).json({ order });
};

const createOrder = async (req, res) => {
  const order = await Order.create(req.body);
  res.status(StatusCodes.CREATED).json({ order });
};

const updateOrder = async (req, res) => {
  const {
    params: { id: orderID },
    body: { name, store, pickup },
  } = req;

  if (name === '' || store === '' || pickup === '') {
    throw new BadRequestError(
      'Name , Description and Price fields cannot be empty'
    );
  }
  const order = await Order.findOneAndUpdate({ _id: orderID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!order) {
    throw new NotFoundError(`No order with id ${orderID}`);
  }
  res.status(StatusCodes.OK).json({ order });
};

const deleteOrder = async (req, res) => {
  const { id: orderID } = req.params;
  const order = await Order.findOneAndDelete({ _id: orderID });
  if (!order) {
    throw new NotFoundError(`No order with id ${orderID}`);
  }
  res.status(StatusCodes.OK).json({ order });
};

module.exports = {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
