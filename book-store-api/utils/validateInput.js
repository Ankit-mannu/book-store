const Joi = require('joi');

// Validation schema for a book
const validateBookInput = (data) => {
    const schema = Joi.object({
        title: Joi.string()
        .min(1)
        .max(300)
        .required()
        .messages({
            'string.empty': 'Title is required.',
            'string.min': 'Title must be at least 1 character long.',
            'string.max': 'Title must be at most 255 characters long.',
        }),
    author: Joi.string()
        .min(1)
        .max(300)
        .required()
        .messages({
            'string.empty': 'Author is required.',
            'string.min': 'Author must be at least 1 character long.',
            'string.max': 'Author must be at most 255 characters long.',
        }),
    genre: Joi.string()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Genre is required.',
            'string.min': 'Genre must be at least 1 character long.',
            'string.max': 'Genre must be at most 100 characters long.',
        }),
    publishedDate: Joi.date()
        .iso()
        .messages({
            'date.base': 'Published Date must be a valid ISO date.',
        }),
    });

    return schema.validate(data);
};

// Validation schema for user registration
const validateUser = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(data);
};

module.exports = {
    validateBookInput,
    validateUser
};
