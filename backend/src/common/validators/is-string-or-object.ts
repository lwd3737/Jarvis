import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'stringOrNestedObject', async: false })
export class IsStringOrObjectConstraint
  implements ValidatorConstraintInterface
{
  validate(value: string | Record<string, any>): boolean {
    if (typeof value === 'string') return true;
    if (typeof value === 'object')
      return value !== null && !Array.isArray(value);
    return false;
  }
  defaultMessage?(): string {
    return 'Value must be a string or a object';
  }
}

export function IsStringOrObject(options?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: IsStringOrObjectConstraint,
    });
  };
}
