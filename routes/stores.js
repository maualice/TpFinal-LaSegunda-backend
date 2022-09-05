const express = require('express');
const router = express.Router();

const {
  getAllStores,
  getStore,
  createStore,
  updateStore,
  deleteStore,
} = require('../controllers/stores');

router.route('/').post(createStore).get(getAllStores);
router.route('/:id').get(getStore).delete(deleteStore).patch(updateStore);

module.exports = router;
