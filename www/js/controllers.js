angular.module('starter.controllers', [])

  .controller('LoginController', function ($scope, $http, $state, $ionicModal, LoginService) {

    clearForm();

    $scope.showSignUpForm = function () {
      $state.go('sign-up');
    };

    $scope.login = function () {
      LoginService.login($scope.user).then(function (data) {
        $state.go('tab.home');
        clearForm();
      }).catch(function (error) {
        clearForm();
        $scope.message = 'Credenciales incorrectas';
      })
    };

    function clearForm() {
      $scope.user = {
        email: null,
        password: null,
        name: null
      };
    }

  })

  .controller('SignUpController', function ($scope, $state, LoginService) {

    clearForm();

    $scope.registerUser = function () {
      LoginService.createUser($scope.user).then(function (data) {
        clearForm();
        $state.go('tab.home');
      }).catch(function (error) {
        clearForm();
        $scope.message = 'Ocurrio un error al crear el usuario: ';
      })
    };

    function clearForm() {
      $scope.user = {
        email: null,
        password: null,
        name: null
      };
    }

  })

  .controller('DashCtrl', function ($scope, $http, LoginService) {

  })

  .controller('ChatsCtrl', function (PictureService, GeoLocationService, $ionicPlatform, $scope, $cordovaCamera, $cordovaFileTransfer, $ionicLoading, $ionicPopup, $state, $cordovaGeolocation) {

    $scope.findGeolocation = function () {
      GeoLocationService.getCurrentLocation().then(function (currentLocation) {
        $scope.currentPosition = currentLocation;
      });
    };

    $ionicPlatform.ready(function () {
      $scope.findGeolocation();
    });


    $scope.takePicture = function () {

      var options = PictureService.getCameraOptions();

      $scope.sendPhoto = function () {
        var optionsUp = PictureService.getUploadOptions();
        alert('sending picture');
        params = new Object();
        params.headers = {Basic: 'cmVuZTplbnJpcXVleg=='};
        optionsUp.params = params;

        $cordovaFileTransfer.upload("http://diyboot-moe.rhcloud.com/uploadImage?lat=" + $scope.currentPosition.lat + "&long=" + $scope.currentPosition.long, $scope.imgUri, optionsUp)
          .then(function (result) {
            alert('sending picture.');
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Aviso',
              template: 'Los datos han sido enviados exitosamente',
              okType: 'button-dark'
            });
            alert('sending picture..');
            alertPopup.then(function (res) {
              $state.go('tab.home');
            });

          }, function (err) {
            alert('Error: ' + JSON.stringify(err))
          }, function (progress) {
            alert('sending picture...');
            $ionicLoading.show();
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

  .controller('TabsCtrl', function ($scope, $state, LoginService) {
    $scope.logout = function () {
      LoginService.logout();
      $state.go('login');
    }


  });
