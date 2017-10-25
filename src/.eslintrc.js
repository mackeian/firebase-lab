// $ cat .eslintrc.js
module.exports = {
    'env': {
        'browser': true,
        'meteor': true,
        'node': true,
        'es6': true
    },
    "extends": "standard",
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'sourceType': 'module'
    },
    'plugins': ['react'],
    'globals': {
        // Collections
        'Persons': true,
        'Modules': true,

        // More stuff
        // [...]

        // Packages
        'lodash': true,
        'i18n': true,
        'moment': true,
        'Messenger': true
    }
}