module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg|woff|woff2|ttf|otf|eot)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: ['js', 'ts', 'tsx'],
};
