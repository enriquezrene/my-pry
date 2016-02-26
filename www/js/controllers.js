angular.module('starter.controllers', [])

  .controller('LoginController', function ($scope, $state) {

    $scope.login = function (user) {
      console.log('Login', user)
      $state.go('tab.home');
    };

  })

  .controller('DashCtrl', function ($scope) {
  })

  .controller('ChatsCtrl', function ($scope, $cordovaCamera, $cordovaFileTransfer, $ionicLoading, $ionicPopup, $state, $cordovaGeolocation) {


    var posOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    };

    $scope.rene = function () {
      alert(9);
      $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        alert(lat);
        alert(long);

      }, function (err) {
        console.log(err);
      });
    };


    $scope.takePicture = function () {
      var options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation: true
      };

      var optionsUp = {
        fileKey: "key",
        fileName: "image.jpeg",
        chunkedMode: "false",
        mimeType: "image/jpeg"
      };

      $scope.sendPhoto = function () {

        var lat = -1;
        var long = -1;

        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
          lat = position.coords.latitude;
          long = position.coords.longitude;


          $cordovaFileTransfer.upload("https://demoodra.herokuapp.com/uploadImage?lat="+lat+"&long="+long, $scope.imgUri, optionsUp)
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

        }, function (err) {
          console.log(err);
        }), function (progress) {
          $ionicLoading.show();
        };

      }


      $cordovaCamera.getPicture(options).then(function (imageData) {
        $scope.imgUri = "data:image/jpeg;base64," + imageData;
      }, function (err) {
        // error
      });

    }
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
