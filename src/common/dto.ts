export abstract class Dto {
  abstract toRecord(): Record<string, any>;
}
