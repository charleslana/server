import UserGenderEnum from 'enum/UserGenderEnum';
import { celebrate, CelebrateError, Joi, Segments } from 'celebrate';

export const userCreateMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        username: Joi.string()
          .pattern(/^[a-zA-ZÀ-ú0-9]*$/)
          .trim()
          .min(3)
          .max(15)
          .required()
          .messages({
            'string.pattern.base':
              'o campo {{#label}} com o valor {:[.]} deve conter apenas letras e números',
            'string.min':
              'O tamanho do texto de {{#label}} deve ter pelo menos {{#limit}} caracteres',
            'string.max':
              '{{#label}} tamanho do texto deve ser menor ou igual a {{#limit}} caracteres',
            'any.required': 'O campo {{#label}} é obrigatório',
            'string.empty': 'O campo {{#label}} não pode estar vazio',
          }),
        password: Joi.string().required().min(6).max(50).messages({
          'string.base': 'O campo {{#label}} deve ser uma string válida',
          'string.min': 'O campo {{#label}} deve ter pelo menos {#limit} caracteres',
          'string.max': 'O campo {{#label}} não deve ter mais de {#limit} caracteres',
          'any.required': 'O campo {{#label}} é obrigatório',
        }),
        email: Joi.string()
          .email()
          .trim()
          .max(50)
          .required()
          .messages({
            'string.email': 'O campo {{#label}} deve conter um e-mail válido',
            'any.custom': 'O campo {{#label}} deve conter apenas letras minúsculas',
            'string.max':
              '{{#label}} tamanho do texto deve ser menor ou igual a {{#limit}} caracteres',
          })
          .custom(value => {
            if (value !== value.toLowerCase()) {
              throw new CelebrateError('O campo email deve conter apenas letras minúsculas');
            }
            return value;
          }),
        fullName: Joi.string()
          .pattern(/^[a-zA-ZÀ-ú ]*$/)
          .trim()
          .min(3)
          .max(100)
          .required()
          .messages({
            'string.pattern.base':
              'o campo {{#label}} com o valor {:[.]} deve conter apenas letras e espaço',
            'string.min':
              'O tamanho do texto de {{#label}} deve ter pelo menos {{#limit}} caracteres',
            'string.max':
              '{{#label}} tamanho do texto deve ser menor ou igual a {{#limit}} caracteres',
            'any.required': 'O campo {{#label}} é obrigatório',
            'string.empty': 'O campo {{#label}} não pode estar vazio',
          }),
        gender: Joi.string()
          .valid(...Object.values(UserGenderEnum))
          .required()
          .messages({
            'any.required': 'O campo {{#label}} é obrigatório',
            'any.only': `O campo {{#label}} deve ser um dos valores: ${Object.values(
              UserGenderEnum
            ).join(', ')}`,
          }),
      },
    },
    { abortEarly: false }
  );
};

export const userCheckUsernameExistsMiddleware = () => {
  return celebrate(
    {
      [Segments.PARAMS]: {
        username: Joi.string()
          .pattern(/^[a-zA-ZÀ-ú0-9]*$/)
          .trim()
          .min(3)
          .max(15)
          .required()
          .messages({
            'string.pattern.base':
              'o campo {{#label}} com o valor {:[.]} deve conter apenas letras e números',
            'string.min':
              'O tamanho do texto de {{#label}} deve ter pelo menos {{#limit}} caracteres',
            'string.max':
              '{{#label}} tamanho do texto deve ser menor ou igual a {{#limit}} caracteres',
            'any.required': 'O campo {{#label}} é obrigatório',
            'string.empty': 'O campo {{#label}} não pode estar vazio',
          }),
      },
    },
    { abortEarly: false }
  );
};

export const userCheckEmailExistsMiddleware = () => {
  return celebrate(
    {
      [Segments.PARAMS]: {
        email: Joi.string().email().trim().max(50).required().lowercase().messages({
          'string.email': 'O campo {{#label}} deve conter um e-mail válido',
          'string.lowercase': 'O campo {{#label}} deve conter apenas letras minúsculas',
          'string.max':
            '{{#label}} tamanho do texto deve ser menor ou igual a {{#limit}} caracteres',
        }),
      },
    },
    { abortEarly: false }
  );
};

export const userAuthMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        username: Joi.string().trim().required().messages({
          'any.required': 'O campo {{#label}} é obrigatório',
          'string.empty': 'O campo {{#label}} não pode estar vazio',
        }),
        password: Joi.string().required().messages({
          'any.required': 'O campo {{#label}} é obrigatório',
          'string.empty': 'O campo {{#label}} não pode estar vazio',
        }),
      },
    },
    { abortEarly: false }
  );
};
