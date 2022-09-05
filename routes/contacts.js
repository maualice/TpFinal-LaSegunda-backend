const express = require('express');
const router = express.Router();

const {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require('../controllers/contacts');

router.route('/').post(createContact).get(getAllContacts);
router.route('/:id').get(getContact).delete(deleteContact).patch(updateContact);

module.exports = router;
