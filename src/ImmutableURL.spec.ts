import { ImmutableURL } from './ImmutableURL';
import { ImmutableURLSearchParams } from './ImmutableURLSearchParams';

describe('ImmutableURL', (): void => {
  it('should not be usable in place of a URL (TypeScript)', (): void => {
    // @ts-expect-error[TS2345]: Argument of type ImmutableURL is not assignable to parameter of type URL
    ((date: URL): void => void date)(new ImmutableURL('http://localhost'));
  });

  it('should not accept a URL instance (TypeScript)', (): void => {
    // @ts-expect-error[TS2345]: Argument of type URL is not assignable to parameter of type ImmutableURL
    ((date: ImmutableURL): void => void date)(new URL('http://localhost'));
  });

  describe('constructor', (): void => {
    it(`should support URL's "from URL" signature`, (): void => {
      const immutableURL = new ImmutableURL(new URL('http://localhost/search'));

      expect(immutableURL).toBeInstanceOf(ImmutableURL);
      expect(immutableURL.toString()).toBe('http://localhost/search');
    });

    it(`should support URL's "from string" signature`, (): void => {
      const immutableURL = new ImmutableURL('http://localhost/search');

      expect(immutableURL).toBeInstanceOf(ImmutableURL);
      expect(immutableURL.toString()).toBe('http://localhost/search');
    });

    it(`should support URL's "from string, string" signature`, (): void => {
      const immutableURL = new ImmutableURL('search', 'http://localhost');

      expect(immutableURL).toBeInstanceOf(ImmutableURL);
      expect(immutableURL.toString()).toBe('http://localhost/search');
    });

    it(`should support URL's "from string, URL" signature`, (): void => {
      const immutableURL = new ImmutableURL(
        'search',
        new URL('http://localhost'),
      );

      expect(immutableURL).toBeInstanceOf(ImmutableURL);
      expect(immutableURL.toString()).toBe('http://localhost/search');
    });

    it(`should support "from ImmutableURL" signature (cloning)`, (): void => {
      const immutableURL = new ImmutableURL(
        new ImmutableURL('http://localhost/search'),
      );

      expect(immutableURL).toBeInstanceOf(ImmutableURL);
      expect(immutableURL.toString()).toBe('http://localhost/search');
    });

    it(`should support "from string, ImmutableURL" signature`, (): void => {
      const immutableURL = new ImmutableURL(
        'search',
        new ImmutableURL('http://localhost'),
      );

      expect(immutableURL).toBeInstanceOf(ImmutableURL);
      expect(immutableURL.toString()).toBe('http://localhost/search');
    });
  });

  describe('canParse', (): void => {
    it("should be available and behave like URL's", (): void => {
      expect(ImmutableURL.canParse('foo')).toBe(false);
      expect(ImmutableURL.canParse('http://localhost')).toBe(true);
    });
  });

  describe('createObjectURL, revokeObjectURL', (): void => {
    it("should be available and behave like URL's", (): void => {
      const blob = new Blob([]);
      const blobURL = ImmutableURL.createObjectURL(blob);

      expect(blobURL).toMatch(/blob:nodedata:.*/);
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      expect(ImmutableURL.revokeObjectURL(blobURL)).toBeUndefined();
    });
  });

  describe('instances', (): void => {
    it('should not allow mutations of their properties (TypeScript, runtime)', (): void => {
      const immutableUrl = new ImmutableURL(
        'https://john:1234@developer.mozilla.org:80/en-US/docs/Web/API/URL/search?q=123#fragment',
      );

      const expectInitialState = (): void => {
        expect(immutableUrl.hash).toBe('#fragment');
        expect(immutableUrl.host).toBe('developer.mozilla.org:80');
        expect(immutableUrl.hostname).toBe('developer.mozilla.org');
        expect(immutableUrl.href).toBe(
          'https://john:1234@developer.mozilla.org:80/en-US/docs/Web/API/URL/search?q=123#fragment',
        );
        expect(immutableUrl.origin).toBe('https://developer.mozilla.org:80');
        expect(immutableUrl.password).toBe('1234');
        expect(immutableUrl.pathname).toBe('/en-US/docs/Web/API/URL/search');
        expect(immutableUrl.port).toBe('80');
        expect(immutableUrl.protocol).toBe('https:');
        expect(immutableUrl.search).toBe('?q=123');
        expect(immutableUrl.username).toBe('john');
      };

      expectInitialState();

      expect((): void => {
        // @ts-expect-error[TS2540]: Cannot assign to * because it is a read-only property.
        immutableUrl.hash = 'anchor';
      }).toThrow('Cannot use property setter on an ImmutableURL instance');
      expect((): void => {
        // @ts-expect-error[TS2540]: Cannot assign to * because it is a read-only property.
        immutableUrl.host = 'www.example.com';
      }).toThrow('Cannot use property setter on an ImmutableURL instance');
      expect((): void => {
        // @ts-expect-error[TS2540]: Cannot assign to * because it is a read-only property.
        immutableUrl.hostname = 'www.example.com';
      }).toThrow('Cannot use property setter on an ImmutableURL instance');
      expect((): void => {
        // @ts-expect-error[TS2540]: Cannot assign to * because it is a read-only property.
        immutableUrl.href = 'http://www.example.com';
      }).toThrow('Cannot use property setter on an ImmutableURL instance');
      expect((): void => {
        // @ts-expect-error[TS2540]: Cannot assign to * because it is a read-only property.
        immutableUrl.password = 'secret';
      }).toThrow('Cannot use property setter on an ImmutableURL instance');
      expect((): void => {
        // @ts-expect-error[TS2540]: Cannot assign to * because it is a read-only property.
        immutableUrl.pathname = '/foo/bar';
      }).toThrow('Cannot use property setter on an ImmutableURL instance');
      expect((): void => {
        // @ts-expect-error[TS2540]: Cannot assign to * because it is a read-only property.
        immutableUrl.port = '3000';
      }).toThrow('Cannot use property setter on an ImmutableURL instance');
      expect((): void => {
        // @ts-expect-error[TS2540]: Cannot assign to * because it is a read-only property.
        immutableUrl.protocol = 'http';
      }).toThrow('Cannot use property setter on an ImmutableURL instance');
      expect((): void => {
        // @ts-expect-error[TS2540]: Cannot assign to * because it is a read-only property.
        immutableUrl.search = '?q=456';
      }).toThrow('Cannot use property setter on an ImmutableURL instance');
      expect((): void => {
        // @ts-expect-error[TS2540]: Cannot assign to * because it is a read-only property.
        immutableUrl.username = 'john';
      }).toThrow('Cannot use property setter on an ImmutableURL instance');
      expect((): void => {
        // @ts-expect-error[TS2540]: Cannot assign to * because it is a read-only property.
        immutableUrl.searchParams = new URLSearchParams();
      }).toThrow('Cannot use property setter on an ImmutableURL instance');

      expectInitialState();
    });

    it('should have an instance of ImmutableURLSearchParams as their `searchParams` property', (): void => {
      const immutableUrl = new ImmutableURL(
        'https://localhost?foo=bar&baz=qux',
      );

      expect(immutableUrl.searchParams).toBeInstanceOf(
        ImmutableURLSearchParams,
      );
    });
  });
});
