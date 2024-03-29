import { faker } from '@faker-js/faker';

export const generateRandomString = (count: number): string => {
  return faker.string.alphanumeric(count);
};

export const formatDate = (date: Date): string => {
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export function omitField<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  field: K
): Omit<T, K> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [field]: _omittedField, ...rest } = obj;
  return rest as Omit<T, K>;
}

export function omitFields<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  fieldsToOmit: K[]
): Omit<T, K> {
  const result: Record<string, unknown> = {};
  for (const key in obj) {
    if (!fieldsToOmit.includes(key as unknown as K)) {
      result[key] = obj[key];
    }
  }
  return result as Omit<T, K>;
}
