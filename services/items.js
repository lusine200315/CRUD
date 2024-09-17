const ItemsModel = require('../models/items');

const { NotFoundError, SaveItemError, DeleteItemError } = require('../core/errors');
const Validator = require('../core/validators');

class ItemsService {

  static async addItem(title, createdAt) {
    Validator.titleAndCreatedAtValidator(title, createdAt);

    const item = new ItemsModel({ title, createdAt });
    const savedItem = await item.save();

    if(!savedItem) {
      throw new SaveItemError();
    }

    return item;
  }

  static async getAllItems(offset, limit, options = {}) {
    Validator.offsetAndLimitValidation(offset, limit);
    
    const result = ItemsModel.find().skip(offset).limit(limit).exec();
    
    if (!result.length) {
      throw new NotFoundError();
    }
    return result;
  }

  static async getItemById(id) {
    Validator.idValidator(id);

    const result = ItemsModel.findOne(id);
    
    if (!result.length) {
      throw new NotFoundError();
    }
    return result;
  }

  static async updateItem(id, updateFields) {
    Validator.idValidator(id);
  
    const update = {};
    if (Validator.titleValidator(updateFields.title)) {
      update.$set = update.$set || {}; 
      update.$set.title = updateFields.title;
    }
  
    if (Validator.createdAtValidator(updateFields.createdAt)) {
      update.$set = update.$set || {};
      update.$set.createdAt = new Date(updateFields.createdAt);
    }
  
    if (Object.keys(update).length === 0) {
      throw new Error('No valid fields to update');
    }
  
    const result = await ItemsModel.findOneAndUpdate(
      { _id: id },
      update,
      { new: true, runValidators: true }
    );
  
    return result;
  }
}

module.exports = ItemsService;