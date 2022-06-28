module.exports = {
  root: true,
  env: {
    node: true,
    amd: true,
    "browser": true,
    "commonjs": true,
    "es6": true,
    "jquery": false,
    mocha: true
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    // parser: "babel-eslint",
    "sourceType": "module"
  },
  "plugins": [
    "html"
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": "warn"
  }
};
