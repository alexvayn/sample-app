angular.module( 'sample.home', [
  'ui.router',
  'angular-storage',
  'angular-jwt'
  ,'ngDialog'
])
.config(function($stateProvider) {
  $stateProvider.state('home', {
    url: '/',
    controller: 'HomeCtrl',
    templateUrl: 'home/home.html',
    data: {
      requiresLogin: true
    }
  });
})
.controller( 'HomeCtrl', function HomeController( $scope, $http, store, jwtHelper, ngDialog) {

  $scope.jwt = store.get('jwt');
  $scope.decodedJwt = $scope.jwt && jwtHelper.decodeToken($scope.jwt);
  $scope.loggedInUser = $scope.decodedJwt;

  function callApi(type, url) {
    $scope.response = null;
    $scope.userProducts = null;
    $scope.api = type;
    $http({
      url: url,
      method: 'GET'
    }).then(function(quote) {
      $scope.response = quote.data;
    }, function(error) {
      $scope.response = error.data;
    });
  }

  $scope.getUserProducts = function() {
    $http({
      url: 'http://192.78.139.240:3001/idiom/internal/userProducts',
      method: 'POST'
    }).then(function(res) {
      $scope.userProducts = res.data;
      return $scope.userProducts;
    }, function(error) {
      $scope.userProducts = error;
      return error;
    });

  }

  $scope.getUserProducts();

  $scope.getProductName = function(productCode){
    var name = null;
    switch (productCode) {
    case "cinfo":
        name = "Company Information";
        break;
    case "mfa":
        name = "MFA";
        break;
    case "apptracker":
        name = "Application Tracker";
        break;
    case "testproduct":
        name = "Test Product";
        break;
    }
    return name;
  }

  $scope.listUserFunctionsForProduct = function(productCode) {
    $http({
        url: 'http://192.78.139.240:3001/idiom/internal/userFunctionsByProduct',
        data: {productId: productCode},
        method: 'POST'
      }).then(function(res) {
        alert('User is entitled to the following functions: \n' + JSON.stringify(res.data));
        $scope.functions = res.data;
        return $scope.functions;
      }, function(error) {
        $scope.functions = error;
        return error;
      });
  }

 // $scope.userInput = "senders";

  $scope.findUsers = function(userInput, userSearchBy) {

  if(!userInput) userInput = "Alex";
    if(!userSearchBy) userSearchBy = "firstName";


    $http({
        url: 'http://192.78.139.240:3001/idiom/internal/user/findUsers',
        data: {searchQuery: userInput, searchBy: userSearchBy},
        method: 'POST'
      }).then(function(res) {
        console.log('results from findusers -> ' + res.data);
        $scope.findUserResult = res.data;
        return $scope.findUserResult;
      }, function(error) {
        $scope.functions = error;
        return error;
      });

  }


});
