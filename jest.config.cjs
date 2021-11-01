module.exports = {
  verbose: true,
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json'
    }
  },
  moduleFileExtensions: [
    'js',
    'ts',
    'json'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest'
  }
};
