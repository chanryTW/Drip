angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('menu.iChatMIS', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/iChatMIS.html',
        controller: 'iChatMISCtrl'
      }
    }
  })

  .state('menu.developer', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/developer.html',
        controller: 'developerCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('menu.page7', {
    url: '/page7',
    views: {
      'side-menu21': {
        templateUrl: 'templates/page7.html',
        controller: 'page7Ctrl'
      }
    }
  })

  .state('menu.page8', {
    url: '/page8',
    views: {
      'side-menu21': {
        templateUrl: 'templates/page8.html',
        controller: 'page8Ctrl'
      }
    }
  })

  .state('page9', {
    url: '/page9',
    templateUrl: 'templates/page9.html',
    controller: 'page9Ctrl'
  })

$urlRouterProvider.otherwise('/side-menu21/page1')


});