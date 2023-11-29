const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const config = {
    setupFilesAfterEnv: ['<rootDir>/.jest/jest.setup.ts'],
    testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(config);
