/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    build_dir: 'build',

    app_files: {
        js: ['src/**/*.js'],
        jsunit: ['src/**/*.spec.js']
    },

    vendor_files: {
        js: [
            'vendor/requirejs/require.js'
        ]
    }
};
