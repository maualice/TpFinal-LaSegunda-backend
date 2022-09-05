const { StatusCodes } = require('http-status-codes');
const Contact = require('../models/contact');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllContacts = async (req, res) => {
  const contacts = await Contact.find().sort('createAt');
  res.status(StatusCodes.OK).json({ contacts, count: contacts.length });
};

const getContact = async (req, res) => {
  const { id: contactID } = req.params;
  const contact = await Contact.findOne({ _id: contactID });
  if (!contact) {
    throw new NotFoundError(`No contact with id ${contactID}`);
  }
  res.status(StatusCodes.OK).json({ contact });
};

const createContact = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(StatusCodes.CREATED).json({ contact });
};

const updateContact = async (req, res) => {
  const {
    params: { id: contactID },
    body: { name, mail, subject, comment },
  } = req;

  if (name === '' || mail === '' || subject === ''|| comment === '') {
    throw new BadRequestError(
      'Name , Mail , Subject and Comment fields cannot be empty'
    );
  }
  const contact = await Contact.findOneAndUpdate({ _id: contactID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!contact) {
    throw new NotFoundError(`No contact with id ${contactID}`);
  }
  res.status(StatusCodes.OK).json({ contact });
};

const deleteContact = async (req, res) => {
  const { id: contactID } = req.params;
  const contact = await Contact.findOneAndDelete({ _id: contactID });
  if (!contact) {
    throw new NotFoundError(`No contact with id ${contactID}`);
  }
  res.status(StatusCodes.OK).json({ contact });
};

module.exports = {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
