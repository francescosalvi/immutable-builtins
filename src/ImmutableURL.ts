import { ImmutableURLSearchParams, ImmutableURLSearchParamsUnbranded } from './ImmutableURLSearchParams';

/**
 * This is the *instance* type
 */
export type ImmutableURL = {
  readonly [K in keyof URL]: K extends 'searchParams'
    ? ImmutableURLSearchParamsUnbranded
    : URL[K];
} & {
  readonly __ImmutableURL__brand: undefined;
};

/**
 * This is the class/constructor definition
 */
export const ImmutableURL: {
  readonly prototype: ImmutableURL;

  new(url: string | URL | ImmutableURL, base?: string | URL | ImmutableURL): ImmutableURL;

  /** @see {URL.canParse} */
  canParse(url: string | URL, base?: string): boolean;
  /** @see {URL.createObjectURL} */
  createObjectURL(obj: Blob): string;
  /** @see {URL.revokeObjectURL} */
  revokeObjectURL(url: string): void;
} = class extends URL implements ImmutableURL {
  readonly __ImmutableURL__brand: undefined;

  constructor(...args: unknown[]) {
    // @ts-expect-error[TS2556]: A spread argument must either have a tuple type or be passed to a rest parameter.
    super(...args);

    const makePropImmutable = (propName: keyof URL): void => {
      const propValue = this[propName];

      Object.defineProperties(this, {
        [propName]: {
          configurable: false,
          get: (): typeof propValue => propValue,
          set: (): never  => {
            throw new Error('Cannot use property setter on an ImmutableURL instance');
          }
        }
      });
    };
    
    makePropImmutable('hash');
    makePropImmutable('host');
    makePropImmutable('hostname');
    makePropImmutable('href');
    makePropImmutable('origin');
    makePropImmutable('password');
    makePropImmutable('pathname');
    makePropImmutable('port');
    makePropImmutable('protocol');
    makePropImmutable('search');
    makePropImmutable('username');

    const searchParams = this.searchParams;
    
    Object.defineProperties(this, {
      searchParams: { 
        configurable: false,
        get: (): ImmutableURLSearchParams => new ImmutableURLSearchParams(searchParams),
        set: (): never  => {
          throw new Error('Cannot use property setter on an ImmutableURL instance');
        }
       },
    });
  }
};
