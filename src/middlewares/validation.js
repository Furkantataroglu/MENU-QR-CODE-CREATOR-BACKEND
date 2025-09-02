import Joi from "joi";

// Menu validation schema
export const validateMenu = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(100).required().messages({
      'string.empty': 'Menü başlığı boş olamaz',
      'string.min': 'Menü başlığı en az 1 karakter olmalı',
      'string.max': 'Menü başlığı en fazla 100 karakter olmalı',
      'any.required': 'Menü başlığı gerekli'
    }),
    userId: Joi.number().integer().positive().required().messages({
      'number.base': 'Kullanıcı ID sayı olmalı',
      'number.integer': 'Kullanıcı ID tam sayı olmalı',
      'number.positive': 'Kullanıcı ID pozitif olmalı',
      'any.required': 'Kullanıcı ID gerekli'
    })
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    const validationError = new Error(errorMessage);
    validationError.status = 400;
    return next(validationError);
  }
  next();
};

// Dish validation schema
export const validateDish = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(100).required().messages({
      'string.empty': 'Yemek adı boş olamaz',
      'string.min': 'Yemek adı en az 1 karakter olmalı',
      'string.max': 'Yemek adı en fazla 100 karakter olmalı',
      'any.required': 'Yemek adı gerekli'
    }),
    description: Joi.string().max(500).optional().allow('').messages({
      'string.max': 'Açıklama en fazla 500 karakter olmalı'
    }),
    price: Joi.number().positive().precision(2).required().messages({
      'number.base': 'Fiyat sayı olmalı',
      'number.positive': 'Fiyat pozitif olmalı',
      'number.precision': 'Fiyat en fazla 2 ondalık basamak olmalı',
      'any.required': 'Fiyat gerekli'
    }),
    imageUrl: Joi.string().uri().optional().allow('').messages({
      'string.uri': 'Geçerli bir URL giriniz'
    }),
    menuId: Joi.number().integer().positive().required().messages({
      'number.base': 'Menü ID sayı olmalı',
      'number.integer': 'Menü ID tam sayı olmalı',
      'number.positive': 'Menü ID pozitif olmalı',
      'any.required': 'Menü ID gerekli'
    })
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    const validationError = new Error(errorMessage);
    validationError.status = 400;
    return next(validationError);
  }
  next();
};

// User validation schema
export const validateUser = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Geçerli bir email adresi giriniz',
      'any.required': 'Email gerekli'
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Şifre en az 6 karakter olmalı',
      'any.required': 'Şifre gerekli'
    })
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    const validationError = new Error(errorMessage);
    validationError.status = 400;
    return next(validationError);
  }
  next();
};
