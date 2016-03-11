angular.module('starter.services', ['http-auth-interceptor', 'ngStorage'])


.factory('LoginService', function ($http, $localStorage) {
    var service = {
        login: function (user) {
            $http.post('http://localhost:8080/odra/login', {
                    'email': 're',
                    'password': 're'
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .success(function (data/*, status, headers, config*/) {
                var myjson = JSON.parse(data);
                alert(myjson);
                alert(1);
                    //alert(data);
                   // alert(JSON.stringify(data));
                    // $http.defaults.headers.common.Authorization = data.authorizationToken;
                    //    $localStorage['token'] = data.authorizationToken;
                    //  authService.loginConfirmed(data, function (config) {
                    //        config.headers.Authorization = data.authorizationToken;
                    //      return config;
                    //    });
                })
                .error(function (data/*, status, headers, config*/) {
                alert(2);    
                /*alert('error');
                    alert(JSON.stringify(data));
                    alert(JSON.stringify(headers));
                    alert(JSON.stringify(config));*/
                    //  $rootScope.$broadcast('event:auth-login-failed', status);
                });
            /*$http({
                    url: "http://localhost:8080/odra/login",
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    data: {"email": "re", "password": "re"}
                })
                .then(function (response) {
                    alert(1);
                        //alert(JSON.stringify(response));
                    },
                    function (response) { // optional
                        alert(2);
                        //alert(JSON.stringify(response));
                    });*/
        },
        logout: function (user) {
            /* $http.post('https://logout', {}, {
                     ignoreAuthModule: true
                 })
                 .finally(function (data) {
                     delete $http.defaults.headers.common.Authorization;
                     $rootScope.$broadcast('event:auth-logout-complete');
                 });*/
        },

        createUser: function (user) {
            if (user.name == "a") {
                throw ('Algo paso aqui');
            }
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