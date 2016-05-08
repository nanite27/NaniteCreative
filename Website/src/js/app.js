var nanitecreative = angular.module('nanitecreative', [
  'ngRoute',
  'ncControllers'
]);

angular.element(document).ready(function() {
nanitecreative.run(function($rootScope, $http) {
    $rootScope.pageName = '';
    $http({
        method: 'GET',
        url: 'data/page-definition.json'
    }).then(function successCallback(response) {
        $rootScope.pageDefinition = response.data;
    });

    $rootScope.pageTitle = function() {
        if (typeof $rootScope.pageDefinition != 'undefined') {
        $rootScope.pageDefinition[$rootScope.pageName].title;
        console.log($rootScope.pageName + ' ' + $rootScope.pageDefinition[$rootScope.pageName].title);
        }

    }

    $rootScope.$on('$routeChangeSuccess', function(e, current, previous) {
        var parts = current.$$route.originalPath.split('/');
        $rootScope.pageName = pageDefinition[parts[0]].title;
    })
});

angular.bootstrap(document, ['nanitecreative']);
});



nanitecreative.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
       when('/', {
        templateUrl: 'partial/homepage.html',
        controller: 'HomepageCtrl'
      }).
      when('/photography', {
        templateUrl: 'partial/photography.html',
        controller: 'PhotographyCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
  
var ncControllers = angular.module('ncControllers', []);

ncControllers.controller('HomepageCtrl', ['$scope', '$rootScope',
  function ($scope, $rootScope) {
  $rootScope.page = {
    title : 'Nanite Creative',
    logo : 'logo.png'
  }
  }]);

ncControllers.controller('PhotographyCtrl', ['$scope', '$rootScope',
  function ($scope, $rootScope) {
  $rootScope.page = {
    title : 'Photography',
    logo : 'photography/logo.png'
  }
  }]);