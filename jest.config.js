module.exports = {
  clearMocks: true,
  coverageDirectory: '__tests__/coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/*.spec.ts'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@shared/(.*)$': '<rootDir>/src/shared/$1',
    '@modules/(.*)$': '<rootDir>/src/modules/$1',
  },
};
