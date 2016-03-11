angular.module('starter.services', ['http-auth-interceptor', 'ngStorage'])


  .factory('LoginService', function ($http, $localStorage, $q) {
    var service = {
      login: function (user) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http.post('https://demoodra.herokuapp.com/odra/login', user, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .success(function (data) {
            $localStorage['token'] = data;
            defered.resolve(data);
          })
          .error(function (error) {
            defered.reject(error);
          });
        return promise;
      },

      logout: function (user) {
        $localStorage['token'] = null;
      },

      createUser: function (user) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http.post('https://demoodra.herokuapp.com/odra/signup', user, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .success(function (data) {
            $localStorage['token'] = data;
            defered.resolve(data);
          })
          .error(function (error) {
            defered.reject(error);
          });
        return promise;
      }
    };
    return service;
  })

  .service('GeoLocationService', function ($cordovaGeolocation) {

    var currentLocation = [];
    var gpsOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    };

    return {
      getCurrentLocation: function () {
        return $cordovaGeolocation.getCurrentPosition(gpsOptions).then(function (position) {
          currentLocation.lat = position.coords.latitude;
          currentLocation.long = position.coords.longitude;
          return currentLocation;
        });
      }

    }

  })

  .service('PictureService', function ($cordovaGeolocation, $q) {

    var defered = $q.defer();
    var promise = defered.promise;

    var optionsFileUpload = {
        fileKey: "key",
        fileName: "image.jpeg",
        chunkedMode: "false",
        mimeType: "image/jpeg",
        headers: {
          Connection: "close"
        }
      }
      ;

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

    return {
      getCameraOptions: function () {
        return options;
      },

      getUploadOptions: function () {
        return optionsFileUpload;
      },

      takePicture: function (lat, long, picture) {
        alert(lat);
        alert(long);
        alert(picture);
        $cordovaFileTransfer.upload("https://demoodra.herokuapp.com/odra/uploadImage?lat=" + lat + "&long=" + long, picture, optionsFileUpload)
          .then(function (result) {
            alert(99);
            defered.resolve(result);
            //$ionicLoading.hide();
            //var alertPopup = $ionicPopup.alert({
            //  title: 'Aviso',
            //  template: 'Los datos han sido enviados exitosamente',
            //  okType: 'button-dark'
            //});
            //alert('sending picture..');
            //alertPopup.then(function (res) {
            //  $state.go('tab.home');
            //});

          }, function (err) {
            alert(101);
            defered.reject(err);
            //alert('Error: ' + JSON.stringify(err))
          }, function (progress) {
            alert('sending picture...');
          });
        return promise;
        //  , function (progress) {
        //  alert('sending picture...');
        //  $ionicLoading.show();
        //});
      }

    }

  })

  .factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
      id: 0,
      name: 'Ben Sparrow',
      lastText: 'You on your way?',
      face: 'img/ben.png'
    }, {
      id: 1,
      name: 'Max Lynx',
      lastText: 'Hey, it\'s me',
      face: 'img/max.png'
    }];

    return {
      all: function () {
        return chats;
      },
      remove: function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function (chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  });
