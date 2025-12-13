# Immutable Built-ins

Dependency-free collection of immutable replacements for JavaScript builtins

## Installation

```bash
yarn add immutable-builtins
```

## Example Usage

```typescript
import { ImmutableDate } from 'immutable-builtins';

const d1 = new ImmutableDate();
const d2 = new ImmutableDate(d1.toMutable().setFullYear(0));

// TypeScript error: "Property 'setFullYear' does not exist on type 'ImmutableDate'";
// Runtime/JavaScript error: "Cannot use a mutating method on an ImmutableDate instance"
d1.setFullYear(0);
```

## Contributing

Issues and PRs welcome!

## License

MIT
