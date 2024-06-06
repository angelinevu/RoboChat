module.exports = {
  testEnvironment: "node",
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
  roots: ["<rootDir>/tests"],
  testMatch: ["/tests//*.test.js"],
  transform: {
    "^.+.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    ".(css|less|sass|scss)$": "identity-obj-proxy",
  },
};
