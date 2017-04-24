/* Exports a function which returns an object that overrides the default &
 *   plugin file patterns (used widely through the app configuration)
 *
 * To see the default definitions for Lineman's file paths and globs, see:
 *
 *   - https://github.com/linemanjs/lineman/blob/master/config/files.coffee
 */
module.exports = function(lineman) {
    //Override file patterns here
    return {
        js: {
            vendor: [
                "vendor/js/jquery.js",
                "vendor/js/bootstrap.js",
                "vendor/js/angular.js",
                "vendor/js/**/*.js"
            ],
            app: [
                "app/js/app.js",
                "app/js/consts/*.js",
                "app/js/directives/*.js",
                "app/js/factories/*.js",
                "app/js/services/*.js",
                "app/js/controllers/*.js",
                "app/js/routes.js"
            ]
        },
        less: {
            compile: {
                options: {
                    paths: ["vendor/css/boostrap.css", "vendor/css/bootstrap-theme.css", "app/css/**/*.less"]
                }
            }
        }
    };
};
