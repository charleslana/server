import { celebrate, Joi, Segments } from 'celebrate';
import { escapeTagsHTML } from './commonCelebrate';
import { NextFunction, Request, Response } from 'express';

export const newspaperCreateMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        title: Joi.string().trim().min(1).max(255).required().messages({
          'string.min':
            'O tamanho do texto de {{#label}} deve ter pelo menos {{#limit}} caracteres',
          'string.max':
            '{{#label}} tamanho do texto deve ser menor ou igual a {{#limit}} caracteres',
          'any.required': 'O campo {{#label}} é obrigatório',
          'string.empty': 'O campo {{#label}} não pode estar vazio',
        }),
        description: Joi.string().trim().min(1).max(10000).required().messages({
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

export const newspaperUpdateMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        id: Joi.number().integer().min(1).required().messages({
          'number.base': 'O campo {{#label}} deve ser um número',
          'number.integer': 'O campo {{#label}} deve ser um número inteiro',
          'number.min': 'O campo {{#label}} deve ser maior ou igual a {{#limit}}',
          'any.required': 'O campo {{#label}} é obrigatório',
        }),
        title: Joi.string().trim().min(1).max(255).required().messages({
          'string.min':
            'O tamanho do texto de {{#label}} deve ter pelo menos {{#limit}} caracteres',
          'string.max':
            '{{#label}} tamanho do texto deve ser menor ou igual a {{#limit}} caracteres',
          'any.required': 'O campo {{#label}} é obrigatório',
          'string.empty': 'O campo {{#label}} não pode estar vazio',
        }),
        description: Joi.string().trim().min(1).max(10000).required().messages({
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

export function escapeNewspaperHTMLMiddleware(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  if (request.body.title) {
    request.body.title = escapeTagsHTML(request.body.title);
  }
  if (request.body.description) {
    request.body.description = escapeTagsHTML(request.body.description);
  }
  next();
}
