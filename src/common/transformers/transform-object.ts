import { ClassConstructor, plainToInstance } from 'class-transformer';

export const transformStringOrObject = (
  value: any,
  cls?: ClassConstructor<any>,
) => {
  return typeof value === 'string'
    ? value
    : plainToInstance(cls ?? Object, value);
};
