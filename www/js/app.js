angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

  .run(function ($ionicPlatform, $httpBackend, $http, $ionicPopup) {

    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
      // Check for network connection
      if (window.Connection) {
        if (navigator.connection.type == Connection.NONE) {
          $ionicPopup.alert({
              title: 'No hay internet',
              template: 'Lo sentimos, la conectividad ha internet se ha perdido. Por favor reconectese y pruebe nuevamente.',
              okType: 'button-dark'
            })
            .then(function (result) {
              ionic.Platform.exitApp();
            });
        }
      }
    });
  })


  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom');

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
      })

      .state('sign-up', {
        url: '/sign-up',
        templateUrl: 'templates/sign-up.html',
        controller: 'SignUpController'
      })

      //TABS

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        controller: 'TabsCtrl'
      })

      .state('tab.home', {
        url: '/tabs-home',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tabs-home.html',
            controller: 'DashCtrl'
          }
        }
      })

      .state('tab.camera', {
        url: '/tab-takepicture',
        views: {
          'tab-chats': {
            templateUrl: 'templates/tab-takepicture.html',
            controller: 'ChatsCtrl'
          }
        }
      })
      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

  });
