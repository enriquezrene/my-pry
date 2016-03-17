angular.module('starter.services', ['ngStorage'])


  .service('LoginService', function ($http, $localStorage, $q) {

    return {

      login: function (user) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        $http.post('https://demoodra.herokuapp.com/odra/login', user, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .success(function (data) {
            $localStorage['token'] = data;
            deferred.resolve(data);
          })
          .error(function (data, status, headers, config) {
            deferred.reject(data);
          });
        return promise;
      },

      logout: function (user) {

      },

      createUser: function (user) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        $http.post('https://demoodra.herokuapp.com/odra/signup', user, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .success(function (data) {
            $localStorage['token'] = data;
            deferred.resolve(data);
          })
          .error(function (error) {
            deferred.reject(error);
          });
        return promise;
      }
    }

  })

  .service('GeoLocationService', function ($cordovaGeolocation, $ionicPopup) {
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
        }, function (err) {
          $ionicPopup.alert({
              title: 'Error con el GPS',
              template: 'Lo sentimos, no es posible usar el GPS en estos momentos. Por favor intente mas tarde.',
              okType: 'button-dark'
            })
            .then(function (result) {
              ionic.Platform.exitApp();
            });
        });
      }

    }

  })

  .service('PictureService', function ($cordovaGeolocation) {

    var optionsFileUpload = {
      fileKey: "key",
      fileName: "image.jpeg",
      chunkedMode: "false",
      mimeType: "image/jpeg"
    };

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
