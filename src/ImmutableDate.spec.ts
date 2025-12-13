/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ImmutableDate } from './ImmutableDate';
import { parse } from 'date-fns';

describe('ImmutableDate', (): void => {
  it('should not be usable in place of a Date (TypeScript)', (): void => {
    // @ts-expect-error[TS2345]: Argument of type ImmutableDate is not assignable to parameter of type Date
    ((date: Date): void => void date)(new ImmutableDate());
  });

  it('should not accept a Date instance (TypeScript)', (): void => {
    // @ts-expect-error[TS2345]: Argument of type Date is not assignable to parameter of type ImmutableDate
    ((date: ImmutableDate): void => void date)(new Date());
  });

  describe('constructor', (): void => {
    it("should support Date's no args signature", (): void => {
      expect(new ImmutableDate()).toBeInstanceOf(ImmutableDate);
    });

    it("should support Date's numeric arg signature", (): void => {
      const immutableDateFromNumber = new ImmutableDate(123456);

      expect(immutableDateFromNumber).toBeInstanceOf(ImmutableDate);
      expect(immutableDateFromNumber.valueOf()).toBe(123456);
    });

    it("should support Date's string arg signature", (): void => {
      const immutableDateFromString = new ImmutableDate(
        '2022-03-22T00:00:00.000Z',
      );

      expect(immutableDateFromString).toBeInstanceOf(ImmutableDate);
      expect(immutableDateFromString.toISOString()).toBe(
        '2022-03-22T00:00:00.000Z',
      );
    });

    it("should support Date's Date arg signature (cloning)", (): void => {
      const immutableDateFromDate = new ImmutableDate(
        new Date('2022-03-22T00:00:00.000Z'),
      );

      expect(immutableDateFromDate).toBeInstanceOf(ImmutableDate);
      expect(immutableDateFromDate.toISOString()).toBe(
        '2022-03-22T00:00:00.000Z',
      );
    });

    it("should support Date's date-parts signature", (): void => {
      const immutableDateFromDateParts = new ImmutableDate(
        2021,
        1,
        1,
        1,
        1,
        1,
        1,
      );

      expect(immutableDateFromDateParts).toBeInstanceOf(ImmutableDate);
      expect(immutableDateFromDateParts.toISOString()).toBe(
        '2021-02-01T01:01:01.001Z',
      );
    });

    it('should support construction from another ImmutableDate (cloning)', (): void => {
      const immutableDateFromOtherImmutableDate = new ImmutableDate(
        new ImmutableDate('2022-03-22T00:00:00.000Z'),
      );

      expect(immutableDateFromOtherImmutableDate).toBeInstanceOf(ImmutableDate);
      expect(immutableDateFromOtherImmutableDate.toISOString()).toBe(
        '2022-03-22T00:00:00.000Z',
      );
    });

    it.each([
      new Date('whatever'),
      // showcase that not even `date-fns::parse` throws when it can't match the format!
      parse('whatever', 'dd/MM/yyyy', new Date()),
      parse('31/31/2021', 'dd/MM/yyyy', new Date()),
      parse('29/02/2023', 'dd/MM/yyyy', new Date()),
    ])(
      'should automatically throw on `Invalid Date` (added behavior)',
      (invalidDate: Date): void => {
        expect(invalidDate.toString()).toBe('Invalid Date');
        expect(invalidDate.valueOf()).toBeNaN();

        expect((): ImmutableDate => new ImmutableDate(invalidDate)).toThrow(
          'Could not construct a valid date',
        );
      },
    );
  });

  describe('parse', (): void => {
    it("should be available and behave like Date's", (): void => {
      expect(ImmutableDate.parse('2021-02-01T01:01:01.001Z')).toBe(
        new Date('2021-02-01T01:01:01.001').valueOf(),
      );
    });
  });

  describe('UTC', (): void => {
    it("should be available and behave like Date's", (): void => {
      expect(ImmutableDate.UTC(2021, 1, 1, 1, 1, 1, 1)).toBe(
        new Date(2021, 1, 1, 1, 1, 1, 1).valueOf(),
      );
    });
  });

  describe('now', (): void => {
    it("should be available and behave like Date's", (): void => {
      expect(typeof ImmutableDate.now()).toBe('number');
    });
  });

  describe('instances', (): void => {
    it('should not allow invocation of mutating methods (TypeScript, runtime)', (): void => {
      const immutableDate = new ImmutableDate();

      expect((): void => {
        // @ts-expect-error[T]: Property does not exist
        immutableDate.setTime();
      }).toThrow('Cannot use a mutating method on an ImmutableDate instance');
      expect((): void => {
        // @ts-expect-error[TS2552]: Property does not exist
        immutableDate.setMilliseconds();
      }).toThrow('Cannot use a mutating method on an ImmutableDate instance');
      expect((): void => {
        // @ts-expect-error[TS2551]: Property does not exist
        immutableDate.setUTCMilliseconds();
      }).toThrow('Cannot use a mutating method on an ImmutableDate instance');
      expect((): void => {
        // @ts-expect-error[TS2551]: Property does not exist
        immutableDate.setSeconds();
      }).toThrow('Cannot use a mutating method on an ImmutableDate instance');
      expect((): void => {
        // @ts-expect-error[TS2551]: Property does not exist
        immutableDate.setUTCSeconds();
      }).toThrow('Cannot use a mutating method on an ImmutableDate instance');
      expect((): void => {
        // @ts-expect-error[TS2551]: Property does not exist
        immutableDate.setMinutes();
      }).toThrow('Cannot use a mutating method on an ImmutableDate instance');
      expect((): void => {
        // @ts-expect-error[TS2551]: Property does not exist
        immutableDate.setUTCMinutes();
      }).toThrow('Cannot use a mutating method on an ImmutableDate instance');
      expect((): void => {
        // @ts-expect-error[TS2551]: Property does not exist
        immutableDate.setHours();
      }).toThrow('Cannot use a mutating method on an ImmutableDate instance');
      expect((): void => {
        // @ts-expect-error[TS2551]: Property does not exist
        immutableDate.setUTCHours();
      }).toThrow('Cannot use a mutating method on an ImmutableDate instance');
      expect((): void => {
        // @ts-expect-error[TS2551]: Property does not exist
        immutableDate.setDate();
      }).toThrow('Cannot use a mutating method on an ImmutableDate instance');
      expect((): void => {
        // @ts-expect-error[TS2551]: Property does not exist
        immutableDate.setUTCDate();
      }).toThrow('Cannot use a mutating method on an ImmutableDate instance');
      expect((): void => {
        // @ts-expect-error[TS2551]: Property does not exist
        immutableDate.setMonth();
      }).toThrow('Cannot use a mutating method on an ImmutableDate instance');
      expect((): void => {
        // @ts-expect-error[TS2551]: Property does not exist
        immutableDate.setUTCMonth();
      }).toThrow('Cannot use a mutating method on an ImmutableDate instance');
      expect((): void => {
        // @ts-expect-error[TS2551]: Property does not exist
        immutableDate.setFullYear();
      }).toThrow('Cannot use a mutating method on an ImmutableDate instance');
      expect((): void => {
        // @ts-expect-error[TS2551]: Property does not exist
        immutableDate.setUTCFullYear();
      }).toThrow('Cannot use a mutating method on an ImmutableDate instance');
      expect((): void => {
        // @ts-expect-error[TS2551]: Property does not exist
        immutableDate.setYear();
      }).toThrow('Cannot use a mutating method on an ImmutableDate instance');
    });
  });

  describe('toMutable', (): void => {
    it('should create a regular Date with the same value', (): void => {
      const immutableDate = new ImmutableDate(123456);
      const date: Date = immutableDate.toMutable();

      expect(date.constructor).toBe(Date);
      expect(date.valueOf()).toBe(123456);
      expect(typeof date.setMonth(1)).toBe('number');
    });
  });
});
