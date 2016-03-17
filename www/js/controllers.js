angular.module('starter.controllers', [])

.controller('LoginController', function ($scope, $http, $state, $ionicModal, LoginService) {

    clearForm();

    $scope.showSignUpForm = function () {
        clearForm();
        $state.go('sign-up');
    };

    $scope.login = function () {
        LoginService.login($scope.user).then(function (data) {
            clearForm();
            $state.go('tab.home');
        }).catch(function (error) {
            clearForm();
            $scope.message = 'Credenciales incorrectas';
        })
    };

    function clearForm() {
        $scope.message = undefined;
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
        $scope.message = undefined;
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

    clearData();

    $scope.findGeolocation = function () {
        alert('finding loc');
        GeoLocationService.getCurrentLocation()
            .then(function (currentLocation) {
                $scope.currentPosition = currentLocation;
            });
    };

    $ionicPlatform.ready(function () {
        $scope.findGeolocation();
    });

    $scope.getPicture = function () {
        var options = {
            quality: 50,
            allowEdit: true,
            correctOrientation: false,
            targetWidth: 284,
            targetHeight: 309,
            imagePath: "Photo capture as Base64",
            destinationType: Camera.DestinationType.DATA_URL,
            encodingType: Camera.EncodingType.JPEG,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.item.imagePath = "Photo capture as Base64";
            $scope.item.data = "data:image/jpeg;base64," + imageData;
            console.log(imageData);
        }, function (err) {
            alert('Unable to take picture');
        });
    };

    $scope.sendInformation = function () {
        var optionsUp = PictureService.getUploadOptions();
        //        params = new Object();
        //        params.headers = {
        //            Basic: 'cmVuZTplbnJpcXVleg=='
        //        };
        //        optionsUp.params = params;

        $cordovaFileTransfer.upload("https://demoodra.herokuapp.com/odra/upload?lat=" + $scope.currentPosition.lat + "&long=" + $scope.currentPosition.long, $scope.item.data, optionsUp)
            .then(function (result) {
                $ionicLoading.hide();
                clearData();
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
                $ionicLoading.show();
            });
    };

    function clearData() {
        $scope.item = {
            data: "",
            imagePath: "Photo capture as Base64",
            destinationFILE_URI: false
        };
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