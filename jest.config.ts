import type { Config } from 'jest';

const config: Config = {
    globalSetup: '<rootDir>/jest.globalSetup.ts',
    clearMocks: true,
    transform: {
        '^.+\\.ts$': [
            'ts-jest',
            {
                tsconfig: 'tsconfig.test.json',
            },
        ],
    },
    testPathIgnorePatterns: [
      "/node_modules/",
      "/dist/"
    ],
};

export default config;
