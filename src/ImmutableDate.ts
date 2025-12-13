/**
 * This is the *instance* type
 */
export type ImmutableDate = Omit<
  Date,
  | 'setTime'
  | 'setMilliseconds'
  | 'setUTCMilliseconds'
  | 'setSeconds'
  | 'setUTCSeconds'
  | 'setMinutes'
  | 'setUTCMinutes'
  | 'setHours'
  | 'setUTCHours'
  | 'setDate'
  | 'setUTCDate'
  | 'setMonth'
  | 'setUTCMonth'
  | 'setFullYear'
  | 'setUTCFullYear'
  | 'setYear'
> & {
  readonly __ImmutableDate__brand: undefined;
  /**
   * Creates a new regular (mutable) date by cloning the current instance
   */
  toMutable(): Date;
};

/**
 * Notes for users:
 *
 * A derived `Date` definition where all the mutating methods have been disabled
 *    both at compile-time (TS) and runtime (JS).
 *  To obtain (cast to) a regular `Date` from it, use the `toMutable` extension method.
 *  Constructor signatures support is identical to that of `Date`, with the added
 *   benefit that it automatically throws in case an `Invalid Date` is yielded internally.
 *
 * ---
 * Notes for maintainers:
 *
 * This is the class/constructor definition
 * - we implement a class that extends Date
 * - we forbid invocation of methods that mutate the internal date value (runtime guards)
 * - we assign the new class (constructor) to a constant that we type as
 *    a modified DateConstructor that instead of returning Date returns our
 *    "trimmed" version without setters (plus the additional `toMutable` utility).
 */
export const ImmutableDate: {
  readonly prototype: ImmutableDate;

  new (): ImmutableDate;
  new (value: number | string | Date | ImmutableDate): ImmutableDate;
  new (year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number): ImmutableDate;

  // The following are declared for convenience but are not strictly necessary
  //  since they won't return a Date instance

  /** @see Date.parse */
  parse(s: string): number;
  /** @see Date.UTC */
  UTC(...args: Parameters<DateConstructor['UTC']>): number;
  /** @see Date.now */
  now(): number;
} = class extends Date implements ImmutableDate {
  readonly __ImmutableDate__brand: undefined;

  override setTime: () => number = throwCannotUseMutatingMethodError;
  override setMilliseconds: () => number = throwCannotUseMutatingMethodError;
  override setUTCMilliseconds: () => number = throwCannotUseMutatingMethodError;
  override setSeconds: () => number = throwCannotUseMutatingMethodError;
  override setUTCSeconds: () => number = throwCannotUseMutatingMethodError;
  override setMinutes: () => number = throwCannotUseMutatingMethodError;
  override setUTCMinutes: () => number = throwCannotUseMutatingMethodError;
  override setHours: () => number = throwCannotUseMutatingMethodError;
  override setUTCHours: () => number = throwCannotUseMutatingMethodError;
  override setDate: () => number = throwCannotUseMutatingMethodError;
  override setUTCDate: () => number = throwCannotUseMutatingMethodError;
  override setMonth: () => number = throwCannotUseMutatingMethodError;
  override setUTCMonth: () => number = throwCannotUseMutatingMethodError;
  override setFullYear: () => number = throwCannotUseMutatingMethodError;
  override setUTCFullYear: () => number = throwCannotUseMutatingMethodError;
  /* override */ setYear: () => number = throwCannotUseMutatingMethodError; // not included in default lib

  // as an added QoL improvement, let's also enforce the construction of valid dates
  constructor(...args: unknown[]) {
    // @ts-expect-error[TS2556]: A spread argument must either have a tuple type or be passed to a rest parameter.
    super(...args);

    if (isNaN(this.valueOf())) {
      throw new Error('Could not construct a valid date');
    }
  }

  toMutable(): Date {
    return new Date(this.valueOf());
  }
};

function throwCannotUseMutatingMethodError(): never {
  throw new Error('Cannot use a mutating method on an ImmutableDate instance');
};
