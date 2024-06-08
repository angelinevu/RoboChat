// jest.config.js
module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  testEnvironment: "node",
  moduleFileExtensions: ["js", "jsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  verbose: true,
};
