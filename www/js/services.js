angular.module('starter.services', ['ngStorage'])


    .service('LoginService', function ($http, $localStorage, $q, $httpParamSerializer) {

        return {

            login: function (user) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                user.submit='Login';
                $http({
                    method: 'POST',
                    url: 'http://50.112.14.69:8080/api/authentication',
                    headers : {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: $httpParamSerializer(user)
                }).success(function (data) {
                    console.log('login'),
                    $localStorage['token'] = data;
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(data);
                    console.log(status);
                    console.log(headers);
                    console.log(config);
                    deferred.reject(data);
                });
                return promise;
            },

            logout: function (user) {
                /*var deferred = $q.defer();
                var promise = deferred.promise;
                user.submit='Login';
                $http({
                    method: 'POST',
                    url: 'http://50.112.14.69:8080/api/logout'
                }).success(function (data) {
                    console.log('logout');
                    $localStorage['token'] = null;
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log('fail logout');
                    deferred.reject(data);
                });
                return promise;*/
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
            quality: 10,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 10,
            targetHeight: 10,
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
