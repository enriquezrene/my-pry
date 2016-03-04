angular.module('starter.controllers', [])

  .controller('LoginController', function ($scope, $state, LoginService) {

    $scope.signUp = function () {
      $state.go('sign-up');
    }

    $scope.login = function (user) {
      if (LoginService.login(user)) {
        $scope.login.error = false;
        $scope.user = null;
        $state.go('tab.home');
      } else {
        $scope.login.error = true;
      }
    };

  })

  .controller('DashCtrl', function ($scope) {
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
      //alert('taking picture');
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

  .controller('SignUpController', function ($scope, $state) {
    $scope.registerUser = function (user) {
      console.log('Login', user)
      $state.go('tab.home');
    };


  })

  .controller('AccountCtrl', function ($scope, $state) {

  });
