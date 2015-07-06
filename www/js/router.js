mainModule.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "templates/menu.html",
            controller: 'AppCtrl'
        })
        .state('app.settings', {
            url: "/settings",
            views: {
                'menuContent': {
                    templateUrl: "templates/settings.html"
                }
            }
        })
        .state('app.customers', {
            url: "/customers",
            views: {
                'menuContent': {
                    templateUrl: "templates/customers.html",
                    controller: 'customersController'
                }
            }
        })
        .state('app.customers.single', {
            url: "/customers/:playlistId",
            views: {
                'menuContent': {
                    templateUrl: "templates/customer.html",
                    controller: 'customerController'
                }
            }
        });

    $urlRouterProvider.otherwise('/app/settings');
});