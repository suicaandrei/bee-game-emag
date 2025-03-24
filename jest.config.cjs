module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'cjs'],
    // Look for test files with .cjs extension
    testMatch: ['**/__tests__/**/*.cjs', '**/?(*.)+(spec|test).cjs'],
  };