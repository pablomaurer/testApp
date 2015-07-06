angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, pouchService) {

        // With the new view caching in Ionic, Controllers are only called once: isn't that bad for memory if
        // i really make a very very huge app? I like it more when it loads here and there slow than that it crashes
        // cause of too much memory usage.. maybe somebody can explain this little bit to me?
    })

    .controller('customersController', function ($scope) {

        $scope.$on('$ionicView.afterEnter', function(){
            if (!$scope.customers) {
                getList();
            }
        });

        // initial get
        var getList = function () {
            pouchService.query('customer/all').then(function (result) {
                $scope.customers = result;
                $ionicLoading.hide();
            });
        };
    })

    .controller('customerController', function ($scope, $stateParams) {
    });
