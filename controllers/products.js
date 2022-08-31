const getAllProducts = async (req, res) => {
  res.send('get all products');
};

const getProduct = async (req, res) => {
  res.send('get product');
};

const createProduct = async (req, res) => {
  res.send('create product');
};

const updateProduct = async (req, res) => {
  res.send('update product');
};

const deleteProduct = async (req, res) => {
  res.send('delete product');
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
