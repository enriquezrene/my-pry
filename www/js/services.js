angular.module('starter.services', [])

  .service('LoginService', function () {
    this.login = function (user) {
      return user != null && user.email == user.password;
    }
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
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      lastText: 'I should buy a boat',
      face: 'img/adam.jpg'
    }, {
      id: 3,
      name: 'Perry Governor',
      lastText: 'Look at my mukluks!',
      face: 'img/perry.png'
    }, {
      id: 4,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/mike.png'
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
