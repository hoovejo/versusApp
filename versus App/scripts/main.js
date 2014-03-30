require.config({
    paths: {
        jQuery: "libs/jquery.min",
        kendo: "libs/kendo.mobile.min"
    },
    shim: {
        jQuery: {
            exports: "jQuery"
        },
        kendo: {
            deps: ["jQuery"],
            exports: "kendo"
        }
    }
});

// Expose the app module to the global scope so Kendo can access it.
var app; 
require(["app/app"], function (inApp) {
    app = inApp;
    app.init(app);
});