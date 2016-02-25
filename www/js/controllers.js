angular.module('starter.controllers', [])

  .controller('LoginController', function ($scope, $state) {

    $scope.login = function (user) {
      console.log('Login', user)
      $state.go('tab.home');
    };

  })

  .controller('DashCtrl', function ($scope) {
  })

  .controller('ChatsCtrl', function ($scope, $cordovaCamera, $cordovaFileTransfer, $ionicLoading, $ionicPopup, $state) {
    $scope.takePicture = function () {
      var options = {
        quality: 10,
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
        $cordovaFileTransfer.upload("https://demoodra.herokuapp.com/uploadImage", $scope.imgUri, optionsUp)
          .then(function (result) {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Aviso',
              template: 'Los datos han sido enviados exitosamente',
              okType: 'button-dark'
            });

            alertPopup.then(function(res) {
              $state.go('tab.home');
            });

          }, function (err) {
            alert('Error: ' + JSON.stringify(err))
          }, function (progress) {
            $ionicLoading.show();
          });
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
