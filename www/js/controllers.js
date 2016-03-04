angular.module('starter.controllers', [])

  .controller('LoginController', function ($scope, $http, $state, $ionicModal, LoginService) {

    $scope.message = "";

    $scope.user = {
      email: null,
      password: null,
      name: null
    };

    $scope.signUp = function () {
      $state.go('sign-up');
    }

    $scope.login = function () {
      try {
        LoginService.login($scope.user);
        $state.go('tab.home');
      } catch (e) {
        $scope.message = 'No me puedo logear';
      }
    };

    $scope.$on('event:auth-loginRequired', function (e, rejection) {
      $state.go('login');
    });

    $scope.$on('event:auth-loginConfirmed', function () {
      $scope.email = null;
      $scope.password = null;
      $state.go('tab.home');
    });

    $scope.$on('event:auth-login-failed', function (e, status) {
      var error = "Login fallido";
      if (status == 401) {
        error = "Las credenciales ingresadas son incorrectas";
      }
      $scope.message = error;
    });

    $scope.$on('event:auth-logout-complete', function () {
      $state.go('app.home', {}, {reload: true, inherit: false});
    });

  })

  .controller('DashCtrl', function ($scope, $http, LoginService) {

  })

  .controller('ChatsCtrl', function (PictureService, GeoLocationService, $ionicPlatform, $scope, $cordovaCamera, $cordovaFileTransfer, $ionicLoading, $ionicPopup, $state, $cordovaGeolocation) {

    $scope.findGeolocation = function () {
      GeoLocationService.getCurrentLocation().then(function (currentLocation) {
        $scope.currentPosition = currentLocation;
      });
    }

    $ionicPlatform.ready(function () {
      $scope.findGeolocation();
    })


    $scope.takePicture = function () {

      var options = PictureService.getCameraOptions();

      $scope.sendPhoto = function () {
        var optionsUp = PictureService.getUploadOptions();
        //alert('sending picture');
        $cordovaFileTransfer.upload("https://demoodra.herokuapp.com/uploadImage?lat=" + $scope.currentPosition.lat + "&long=" + $scope.currentPosition.long, $scope.imgUri, optionsUp)
          .then(function (result) {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Aviso',
              template: 'Los datos han sido enviados exitosamente',
              okType: 'button-dark'
            });

            alertPopup.then(function (res) {
              $state.go('tab.home');
            });

          }, function (err) {
            alert('Error: ' + JSON.stringify(err))
          }, function (progress) {
            //$ionicLoading.show();
          });
      }


      $cordovaCamera.getPicture(options).then(function (imageData) {
        $scope.imgUri = "data:image/jpeg;base64," + imageData;
      }, function (err) {
        console.log(err);
      });

    }
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('SignUpController', function ($scope, $state, LoginService) {

    $scope.message = "";

    $scope.user = {
      email: null,
      password: null,
      name: null
    };

    $scope.registerUser = function () {
      try {
        LoginService.createUser($scope.user);
        $state.go('tab.home');
      } catch (e) {
        console.log(e)
      }
    };

  })

  .controller('TabsCtrl', function ($scope, $state, LoginService) {
    $scope.logout = function () {
      LoginService.logout();
      $state.go('login');
    }


  });
