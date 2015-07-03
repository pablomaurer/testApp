angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

        // With the new view caching in Ionic, Controllers are only called once: isn't that bad for memory if
        // i really make a very very huge app? I like it more when it loads here and there slow than that it crashes
        // cause of too much memory usage.. maybe somebody can explain this little bit to me?
    })

    .controller('customersController', function ($scope) {
        $scope.customers = [
            {title: 'Reggae', id: 1},
            {title: 'Chill', id: 2},
            {title: 'Dubstep', id: 3},
            {title: 'Indie', id: 4},
            {title: 'Rap', id: 5},
            {title: 'Cowbell', id: 6}
        ];
    })

    .controller('customerController', function ($scope, $stateParams) {
    });
