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
    };

    $scope.login = function () {
      LoginService.login($scope.user).then(function (data) {
        $state.go('tab.home');
        $scope.message = '';
      }).catch(function (error) {
        $scope.message = 'Credenciales incorrectas';
        $scope.user = {
          email: null,
          password: null
        };
      })
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

  .controller('DashCtrl', function ($state, $scope, $http, LoginService) {


  })

  .controller('ChatsCtrl', function (PictureService, GeoLocationService, $ionicPlatform, $scope, $cordovaCamera, $cordovaFileTransfer, $ionicLoading, $ionicPopup, $state) {

    $scope.imgUri = undefined;
    
    $scope.findGeolocation = function () {
      GeoLocationService.getCurrentLocation().then(function (currentLocation) {
        $scope.currentPosition = currentLocation;
      });
    };

    $ionicPlatform.ready(function () {
      $scope.findGeolocation();
    });

    var options = PictureService.getCameraOptions();

    $scope.takePicture = function () {
      $cordovaCamera.getPicture(options).then(function (imageData) {
        $scope.imgUri = "data:image/jpeg;base64," + imageData;
      }, function (err) {
        $ionicPopup.alert({
          title: 'Error',
          template: 'Ocurrio un error al usar la camara',
          okType: 'button-dark'
        });
      });
    };


    //$scope.sendPhoto = function () {
    //  //$ionicLoading.show();
    //  PictureService.takePicture($scope.currentPosition.lat, $scope.currentPosition.long, $scope.imgUri).then(function (data) {
    //    //  $ionicLoading.hide();
    //      var alertPopup = $ionicPopup.alert({
    //        title: 'Aviso',
    //        template: 'Los datos han sido enviados exitosamente',
    //        okType: 'button-dark'
    //      });
    //      alertPopup.then(function (res) {
    //        $state.go('tab.home');
    //      });
    //    })
    //    .catch(function (error) {
    //      //$ionicLoading.hide();
    //      $ionicPopup.alert({
    //        title: 'Error',
    //        template: 'Ocurrio un error al enviar los datos, intente mas tarde',
    //        okType: 'button-dark'
    //      });
    //    });


    $scope.sendPhoto = function () {
      var optionsUp = PictureService.getUploadOptions();
      //params = new Object();
      //
      //params.headers = {
      //  Connection: "close"
      //};
      //optionsUp.params = params;

      $cordovaFileTransfer.upload("https://demoodra.herokuapp.com/odra/upload?lat=" + $scope.currentPosition.lat + "&long=" + $scope.currentPosition.long, $scope.imgUri, optionsUp)
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
          $scope.imgUri = undefined;
        }, function (err) {
          alert('Error: ' + JSON.stringify(err))
        }, function (progress) {
          $ionicLoading.show();
        });
    };


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
      LoginService.createUser($scope.user).then(function (data) {
        $scope.message = '';
        $state.go('tab.home');
      }).catch(function (error) {
        $scope.message = 'Ocurrio un error al crear el usuario: ';
        $scope.user = {
          email: null,
          password: null,
          name: null
        };
      })
    }

  })

  .controller('TabsCtrl', function ($scope, $state, LoginService) {
    $scope.logout = function () {
      LoginService.logout();
      $state.go('login');
    }


  });
