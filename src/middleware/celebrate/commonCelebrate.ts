import { celebrate, Joi, Segments } from 'celebrate';

export const idParamMiddleware = () => {
  return celebrate(
    {
      [Segments.PARAMS]: {
        id: Joi.number().required(),
      },
    },
    { abortEarly: false }
  );
};

export const uuidParamMiddleware = () => {
  return celebrate(
    {
      [Segments.PARAMS]: {
        id: Joi.string().guid({ version: 'uuidv4' }).required(),
      },
    },
    { abortEarly: false }
  );
};
