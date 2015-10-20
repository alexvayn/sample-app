angular.module( 'sample.login', [
  'ui.router',
  'angular-storage'
])
.config(function($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    controller: 'LoginCtrl',
    templateUrl: 'login/login.html'
  });
})
.controller( 'LoginCtrl', function LoginController( $scope, $http, store, $state) {

  $scope.user = {};

  $scope.login = function() {
    $http({
      url: 'http://192.78.139.240:3001/idiom/internal/authenticate',
      method: 'POST',
      data: $scope.user
    }).then(function(response) {
      store.set('jwt', response.data.id_token);
      $state.go('home');
    }, function(error) {
      alert(error.data);
    });    
  }

});

