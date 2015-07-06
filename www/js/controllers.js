angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope) {

        // With the new view caching in Ionic, Controllers are only called once: isn't that bad for memory if
        // i really make a very very huge app? I like it more when it loads here and there slow than that it crashes
        // cause of too much memory usage.. maybe somebody can explain this little bit to me?
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

    })

    .controller('customersController', function ($scope, $ionicLoading, pouchService) {

        $ionicLoading.show({
            template: 'Loading...<br><ion-spinner icon="ios"></ion-spinner>'
        });

        // will load customers afterEnter
        $scope.$on('$ionicView.afterEnter', function(){
            if (!$scope.customers) {
                getList();
            }
        });

        // getting customers will also fire first indexing, which will crash
        var getList = function () {
            pouchService.query('customer/all').then(function (result) {
                $scope.customers = result;
                $ionicLoading.hide();
            });
        };
    })

    .controller('customerController', function ($scope, $stateParams, pouchService) {
    });
