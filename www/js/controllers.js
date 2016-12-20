angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope) {
    })

    .controller('settingsController', function ($scope, pouchService) {

        // init
        $scope.initPouchDB = function () {
            pouchService.init();
        };

        // start
        $scope.syncNow = function () {
            pouchService.syncNow();
        };

        // stop
        $scope.stopSync = function () {
            pouchService.stopSync();
        };

    });