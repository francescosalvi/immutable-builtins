import fs from 'fs';
import pkg from '../package.json' with { type: "json" };
import jsr from '../jsr.json' with { type: "json" };

jsr.version = pkg.version;

fs.writeFileSync('./jsr.json', JSON.stringify(jsr, null, 2) + '\n');
console.log(`Synced jsr.json to version ${pkg.version}`);
