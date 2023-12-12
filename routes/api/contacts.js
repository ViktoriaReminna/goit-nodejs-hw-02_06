const express = require('express');

const {
  listOfContacts,
  contactById,
  createContact,
  deleteContact,
  updContact,
  updateStatusContact,
} = require('../../controllers/contacts');

const { validateBody, isValidId } = require('../../middlewares');
const schemas = require('../../schemas/contactValidation');

const router = express.Router();
const jsonParser = express.json();

router.get('/', listOfContacts);

router.get('/:contactId', isValidId, contactById);

router.post('/', jsonParser, validateBody(schemas.addSchema), createContact);

router.delete('/:contactId', isValidId, deleteContact);

router.put(
  '/:contactId',
  jsonParser,
  isValidId,
  validateBody(schemas.addSchema),
  updContact
);

router.patch(
  '/:contactId/favorite',
  jsonParser,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  updateStatusContact
);

module.exports = router;
