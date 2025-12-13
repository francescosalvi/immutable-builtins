/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ImmutableURLSearchParams } from './ImmutableURLSearchParams';

describe('ImmutableURLSearchParams', (): void => {
  it('should not be usable in place of an URLSearchParams (TypeScript)', (): void => {
    ((date: URLSearchParams): void => void date)(
      // @ts-expect-error[TS2345]: Argument of type ImmutableURLSearchParams is not assignable to parameter of type URL
      new ImmutableURLSearchParams('foo=bar'),
    );
  });

  it('should not accept a URLSearchParams instance (TypeScript)', (): void => {
    ((date: ImmutableURLSearchParams): void => void date)(
      // @ts-expect-error[TS2345]: Argument of type URLSearchParams is not assignable to parameter of type ImmutableURLSearchParams
      new URLSearchParams('foo=bar'),
    );
  });

  describe('constructor', (): void => {
    it("should support URLSearchParams's string signature", (): void => {
      const immutableURLSearchParams = new ImmutableURLSearchParams(
        'foo=bar&baz=qux',
      );

      expect(immutableURLSearchParams).toBeInstanceOf(ImmutableURLSearchParams);
      expect(immutableURLSearchParams.toString()).toBe('foo=bar&baz=qux');
    });

    it("should support URLSearchParams's two-dimensional string array signature", (): void => {
      const immutableURLSearchParams = new ImmutableURLSearchParams([
        ['foo', 'bar'],
        ['baz', 'qux'],
      ]);

      expect(immutableURLSearchParams).toBeInstanceOf(ImmutableURLSearchParams);
      expect(immutableURLSearchParams.toString()).toBe('foo=bar&baz=qux');
    });

    it("should support URLSearchParams's dictionary signature", (): void => {
      const immutableURLSearchParams = new ImmutableURLSearchParams({
        foo: 'bar',
        baz: 'qux',
      });

      expect(immutableURLSearchParams).toBeInstanceOf(ImmutableURLSearchParams);
      expect(immutableURLSearchParams.toString()).toBe('foo=bar&baz=qux');
    });

    it('should support construction from a URLSearchParams', (): void => {
      const immutableURLSearchParams = new ImmutableURLSearchParams(
        new URLSearchParams('foo=bar&baz=qux'),
      );

      expect(immutableURLSearchParams).toBeInstanceOf(ImmutableURLSearchParams);
      expect(immutableURLSearchParams.toString()).toBe('foo=bar&baz=qux');
    });

    it('should support construction from another ImmutableURLSearchParams (cloning)', (): void => {
      const immutableURLSearchParams = new ImmutableURLSearchParams(
        new ImmutableURLSearchParams('foo=bar&baz=qux'),
      );

      expect(immutableURLSearchParams).toBeInstanceOf(ImmutableURLSearchParams);
      expect(immutableURLSearchParams.toString()).toBe('foo=bar&baz=qux');
    });
  });

  describe('instances', (): void => {
    it('should not allow invocation of mutating methods (TypeScript, runtime)', (): void => {
      const immutableURLSearchParams = new ImmutableURLSearchParams(
        'foo=bar&baz=qux',
      );

      const expectInitialState = (): void => {
        expect(immutableURLSearchParams).toBeInstanceOf(URLSearchParams);
        expect(immutableURLSearchParams.toString()).toBe('foo=bar&baz=qux');
      };

      expectInitialState();

      expect((): void => {
        // @ts-expect-error[TS2339]: Property * does not exist on type
        immutableURLSearchParams.append('q', '123');
      }).toThrow(
        'Cannot use a mutating method on an ImmutableURLSearchParams instance',
      );
      expect((): void => {
        // @ts-expect-error[TS2339]: Property * does not exist on type
        immutableURLSearchParams.delete('q');
      }).toThrow(
        'Cannot use a mutating method on an ImmutableURLSearchParams instance',
      );
      expect((): void => {
        // @ts-expect-error[TS2339]: Property * does not exist on type
        immutableURLSearchParams.set('q', '123');
      }).toThrow(
        'Cannot use a mutating method on an ImmutableURLSearchParams instance',
      );
      expect((): void => {
        // @ts-expect-error[TS2339]: Property * does not exist on type
        immutableURLSearchParams.sort();
      }).toThrow(
        'Cannot use a mutating method on an ImmutableURLSearchParams instance',
      );

      expectInitialState();
    });
  });
});
