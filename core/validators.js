const { InvalidOffset, InvalidLimit, InvalidId, InvalidTitle, InvalidCreatedAt } = require("./errors");

class Validator {
    static async offsetAndLimitValidation(offset, limit) {
        const parsedOffset = parseInt(offset, 10);
        const parsedLimit = parseInt(limit, 10);
    
        if (!isFinite(parsedOffset)) {
            throw new InvalidOffset();
        }
        if (!isFinite(parsedLimit)) {
            throw new InvalidLimit();
        }
        return true; 
    };

    static async idValidator(id) {
        if(!id) {
            throw new InvalidId();
        }
        return true;
    }   

    static async titleAndCreatedAtValidator(title, createdAt) {
        if (!title) {
            throw new InvalidTitle();
        }
        if(!createdAt) {
            throw new InvalidCreatedAt();
        }
        return true;
    }
    static async titleValidator(title) {
        if (!title || title.trim().length === 0) {
            throw new InvalidTitle();
        }
        return true;
    }

    static async createdAtValidator(createdAt) {
        if(!createdAt) {
            throw new InvalidCreatedAt();
        }
        return true;
    }
}

module.exports = Validator;