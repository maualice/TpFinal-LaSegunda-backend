const { StatusCodes } = require('http-status-codes');
const Store = require('../models/store');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllStores = async (req, res) => {
  const stores = await Store.find().sort('createAt');
  res.status(StatusCodes.OK).json({ stores, count: stores.length });
};

const getStore = async (req, res) => {
  const { id: storeID } = req.params;
  const store = await Store.findOne({ _id: storeID });
  if (!store) {
    throw new NotFoundError(`No store with id ${storeID}`);
  }
  res.status(StatusCodes.OK).json({ store });
};

const createStore = async (req, res) => {
  const store = await Store.create(req.body);
  res.status(StatusCodes.CREATED).json({ store });
};

const updateStore = async (req, res) => {
  const {
    params: { id: storeID },
    body: { name, address, city, openingHours },
  } = req;

  if (name === '' || address === '' || city === ''|| openingHours === '') {
    throw new BadRequestError(
      'Name , Address , City and OpeningHours fields cannot be empty'
    );
  }
  const store = await Store.findOneAndUpdate({ _id: storeID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!store) {
    throw new NotFoundError(`No store with id ${storeID}`);
  }
  res.status(StatusCodes.OK).json({ store });
};

const deleteStore = async (req, res) => {
  const { id: storeID } = req.params;
  const store = await Store.findOneAndDelete({ _id: storeID });
  if (!store) {
    throw new NotFoundError(`No store with id ${storeID}`);
  }
  res.status(StatusCodes.OK).json({ store });
};

module.exports = {
  getAllStores,
  getStore,
  createStore,
  updateStore,
  deleteStore,
};
