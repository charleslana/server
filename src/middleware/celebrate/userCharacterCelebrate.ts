import UserCharacterBreedEnum from 'enum/UserCharacterBreedEnum';
import UserCharacterClassEnum from 'enum/UserCharacterClassEnum';
import UserCharacterFactionEnum from 'enum/UserCharacterFactionEnum';
import UserCharacterSeaEnum from 'enum/UserCharacterSeaEnum';
import { celebrate, Joi, Segments } from 'celebrate';

export const userCharacterCreateMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        characterId: Joi.number().integer().min(1).required().messages({
          'number.base': 'O campo {{#label}} deve ser um número',
          'number.integer': 'O campo {{#label}} deve ser um número inteiro',
          'number.min': 'O campo {{#label}} deve ser maior ou igual a {{#limit}}',
          'any.required': 'O campo {{#label}} é obrigatório',
        }),
        name: Joi.string()
          .pattern(/^[a-zA-Z0-9]*$/)
          .trim()
          .min(3)
          .max(15)
          .required()
          .messages({
            'string.pattern.base':
              'o campo {{#label}} com o valor {:[.]} deve conter apenas letras sem acentos e números',
            'string.min':
              'O tamanho do texto de {{#label}} deve ter pelo menos {{#limit}} caracteres',
            'string.max':
              '{{#label}} tamanho do texto deve ser menor ou igual a {{#limit}} caracteres',
            'any.required': 'O campo {{#label}} é obrigatório',
            'string.empty': 'O campo {{#label}} não pode estar vazio',
          }),
        faction: Joi.string()
          .valid(...Object.values(UserCharacterFactionEnum))
          .required()
          .messages({
            'any.required': 'O campo {{#label}} é obrigatório',
            'any.only': `O campo {{#label}} deve ser um dos valores: ${Object.values(
              UserCharacterFactionEnum
            ).join(', ')}`,
          }),
        sea: Joi.string()
          .valid(...Object.values(UserCharacterSeaEnum))
          .required()
          .messages({
            'any.required': 'O campo {{#label}} é obrigatório',
            'any.only': `O campo {{#label}} deve ser um dos valores: ${Object.values(
              UserCharacterSeaEnum
            ).join(', ')}`,
          }),
        breed: Joi.string()
          .valid(...Object.values(UserCharacterBreedEnum))
          .required()
          .messages({
            'any.required': 'O campo {{#label}} é obrigatório',
            'any.only': `O campo {{#label}} deve ser um dos valores: ${Object.values(
              UserCharacterBreedEnum
            ).join(', ')}`,
          }),
        class: Joi.string()
          .valid(...Object.values(UserCharacterClassEnum))
          .required()
          .messages({
            'any.required': 'O campo {{#label}} é obrigatório',
            'any.only': `O campo {{#label}} deve ser um dos valores: ${Object.values(
              UserCharacterClassEnum
            ).join(', ')}`,
          }),
      },
    },
    { abortEarly: false }
  );
};

export const userCharacterTopFactionMiddleware = () => {
  return celebrate(
    {
      [Segments.QUERY]: {
        faction: Joi.string()
          .valid(...Object.values(UserCharacterFactionEnum))
          .required()
          .messages({
            'any.required': 'O campo {{#label}} é obrigatório',
            'any.only': `O campo {{#label}} deve ser um dos valores: ${Object.values(
              UserCharacterFactionEnum
            ).join(', ')}`,
          }),
      },
    },
    { abortEarly: false }
  );
};

export const userCharacterTopClassMiddleware = () => {
  return celebrate(
    {
      [Segments.QUERY]: {
        class: Joi.string()
          .valid(...Object.values(UserCharacterClassEnum))
          .required()
          .messages({
            'any.required': 'O campo {{#label}} é obrigatório',
            'any.only': 'O valor do campo {{#label}} deve ser um dos valores válidos: {{#valids}}',
          }),
      },
    },
    { abortEarly: false }
  );
};

export const updateUserCharacterAvatarMiddleware = () => {
  return celebrate(
    {
      [Segments.PARAMS]: {
        avatar: Joi.number().integer().min(1).required().messages({
          'number.base': 'O campo {{#label}} deve ser um número',
          'number.integer': 'O campo {{#label}} deve ser um número inteiro',
          'number.min': 'O campo {{#label}} deve ser maior ou igual a {{#limit}}',
          'any.required': 'O campo {{#label}} é obrigatório',
        }),
      },
    },
    { abortEarly: false }
  );
};

export const updateUserCharacterAttributeMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: Joi.object({
        strength: Joi.number().integer().min(1).max(999),
        dexterity: Joi.number().integer().min(1).max(999),
        intelligence: Joi.number().integer().min(1).max(999),
        resistance: Joi.number().integer().min(1).max(999),
      })
        .or('strength', 'dexterity', 'intelligence', 'resistance')
        .messages({
          'object.missing':
            'Pelo menos um dos campos (strength, dexterity, intelligence, resistance) deve ser fornecido',
        }),
    },
    {
      abortEarly: false,
      messages: {
        'number.base': 'O campo {{#label}} deve ser um número',
        'number.integer': 'O campo {{#label}} deve ser um número inteiro',
        'number.min': 'O campo {{#label}} deve ser maior ou igual a {{#limit}}',
        'number.max': 'O campo {{#label}} não pode ser maior que {{#limit}}',
      },
    }
  );
};
