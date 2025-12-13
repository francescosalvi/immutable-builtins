export type ImmutableURLSearchParamsUnbranded = Readonly<Omit<
  URLSearchParams,
  'append' | 'delete' | 'set' | 'sort'
>>;

/**
 * This is the *instance* type
 */
export type ImmutableURLSearchParams = ImmutableURLSearchParamsUnbranded
  & {
  readonly __ImmutableURLSearchParams__brand: undefined;
}
;

/**
 * This is the class/constructor definition
 */
export const ImmutableURLSearchParams: {
  readonly prototype: ImmutableURLSearchParams;

  new(init?: string[][] | Record<string, string> | string | URLSearchParams | ImmutableURLSearchParams): ImmutableURLSearchParams;
} = class extends URLSearchParams implements ImmutableURLSearchParams {
  readonly __ImmutableURLSearchParams__brand: undefined;

  override append: () => void = throwCannotUseMutatingMethodError;
  override delete: () => void = throwCannotUseMutatingMethodError;
  override set: () => void = throwCannotUseMutatingMethodError;
  override sort: () => void = throwCannotUseMutatingMethodError;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(...args: unknown[]) {
    // @ts-expect-error[TS2345]: Argument of type unknown is not assignable to parameter of type...
    super(...args);
  }
};

function throwCannotUseMutatingMethodError(): never {
  throw new Error(
    'Cannot use a mutating method on an ImmutableURLSearchParams instance',
  );
};
