module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    // '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    // '^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@material-ui/)'
  ],
  // moduleNameMapper: {
  //   '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  //   '^components(.*)$': '<rootDir>/components$1',
  //   '^styles(.*)$': '<rootDir>/styles$1',
  //   '^icons(.*)$': '<rootDir>/icons$1',
  //   '^utils(.*)$': '<rootDir>/utils$1',
  //   '^src(.*)$': '<rootDir>/src$1',
  // },
}