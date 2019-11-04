module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "proposal"
    ],
    "rules": {
        "semi": [2, "always"],
        "react/jsx-uses-react": 1,
        "proposal/class-property-space-infix-ops": "error"
    }
};
