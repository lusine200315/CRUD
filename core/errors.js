class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
};

class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}
class ValidationError extends AppError {
  constructor(message = 'Invalid request parameters') {
    super(message, 400);
  }
}

class InvalidId extends ValidationError {
  constructor(message = 'Invalid or missing id') {
    super(message, 400);
  }
}

class InvalidOffset extends ValidationError {
  constructor(message = 'Invalid or missing offset') {
    super(message, 400);
  }
}

class InvalidLimit extends ValidationError {
  constructor(message = 'Invalid or missing limit') {
    super(message, 400);
  }
}

class InvalidTitle extends ValidationError {
  constructor(message = 'Invalid or missing title') {
    super(message, 400);
  }
}
class InvalidCreatedAt extends ValidationError {
  constructor(message = 'Invalid or missing limit') {
    super(message, 400);
  }
}

class NoFieldsToUpdateError extends AppError {
  constructor(message = 'No fields to update provided') {
    super(message);
  }
}

class SaveItemError extends Error {
  constructor() {
    super('Failed to save the item');
    this.name = 'SaveItemError';
  }
}

class DeleteItemError extends Error {
  constructor() {
    super('Failed to save the item');
    this.name = 'SaveItemError';
  }
}

module.exports = {
  AppError,
  ValidationError,
  InvalidOffset,
  InvalidLimit,
  InvalidId,
  InvalidTitle,
  InvalidCreatedAt,
  SaveItemError,
  DeleteItemError,
  NotFoundError,
  NoFieldsToUpdateError,
};