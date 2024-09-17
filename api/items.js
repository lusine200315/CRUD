const express = require('express');
const Router = express.Router();

const ItemsService = require('../services/items');
const Validator = require('../core/validators.js');

const start = require('../middleware/start.js');
const { NotFoundError, NoFieldsToUpdateError } = require('../core/errors.js');
const { getResponse } = require('../core/utility.js');

Router.post('/', async (req, res) => {
  const { title, createdAt } = req.body;

  try {
    Validator.titleAndCreatedAtValidator(title, createdAt);

    const item = ItemsService.addItem({title, createdAt});
    const response = getResponse(item, req,start);

    res.status(201).send(response);

  } catch(error) {
    console.error(error, `error`);
    res.status(error.statusCode).send(error.message);
  }
});

Router.get('/', start, async (req, res) => {
  const { offset = 0, limit = 10 } = req.query;

  try {
    Validator.offsetAndLimitValidation(offset, limit);
  
    const result = await ItemsService.getAllItems(offset, limit);
    const response = getResponse(result, req.start);
    
    res.status(200).send(response);

  } catch (error) {
    console.error(error, `error`);
    res.status(error.statusCode).send(error.message);
  };
});

Router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    Validator.idValidator(id);

    const result = await ItemsService.getItemById(id);
    const response = getResponse(result, req.start);

    res.status(200).send(response);

  } catch(error) {
    console.error(error, `error`);
    res.status(error.statusCode).send(error.message);
  }
});

Router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    Validator.idValidator(id);

    const result = await ItemsService.deleteItem(id);
    const response = getResponse(result, req.start);

    res.status(200).send(response);

  } catch(error) {
    console.error(error, `error`);
    res.status(error.statusCode).send(error.message);
  }
});
  
Router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, createdAt } = req.body;

  try {
    Validator.idValidator(id);

    if(title) {
      Validator.titleValidator(title);
    }
    if(createdAt) {
      Validator.createdAtValidator(createdAt);
    }

    let result;
    if (title && createdAt) {
      result = await ItemsService.updateItem(id, { title, createdAt });
    } else if (title) {
      result = await ItemsService.updateItem(id, { title });
    } else if (createdAt) {
      result = await ItemsService.updateItem(id, { createdAt });
    } else {
      throw new NoFieldsToUpdateError();
    }

    if (result.modifiedCount === 0) {
      throw new NotFoundError();
    }

    const response = getResponse(result, req.start);

    res.status(200).send(response);

  } catch(error) {
    console.error(error, `error`);
    res.status(error.statusCode).send(error.message);
  }

  
});

module.exports = Router;