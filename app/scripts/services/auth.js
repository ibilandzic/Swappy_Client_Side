'use strict';

angular
  .module('confusionApp')
  .factory('AuthService', ['Accounts', '$q', '$rootScope', 'ngDialog', function(Accounts, $q,
      $rootScope, ngDialog) {
    function login(loginData) {
      return Accounts
        .login(loginData)
        .$promise
        .then(function(response) {
          $rootScope.currentUser = {
            id: response.user.id,
            tokenId: response.id,
            username: loginData.username
          };
          console.log($rootScope.currentUser.tokenId);
          $rootScope.$broadcast('login:Successful');
        },
        function(response){

          var message = '\
                <div class="ngdialog-message">\
                <div><h3>Login Unsuccessful</h3></div>' +
                  '<div><p>' +  response.data.error.message + '</p><p>' +
                    response.data.error.name + '</p></div>' +
                '<div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button>\
                </div>'
            
                ngDialog.openConfirm({ template: message, plain: 'true'});
        });
    }
      
    function isAuthenticated() {
        if ($rootScope.currentUser) {
            return true;
        }
        else{
            return false;
        }
    }
      
    function getUsername() {
        return $rootScope.currentUser.username;
    }

    function logout() {
      return Accounts
       .logout()
       .$promise
       .then(function() {
         $rootScope.currentUser = null;
       });
    }
    /*
     "first_name": "string",
    "last_name": "string",
    "phone": "string",
    "address": "string",
    "image": "string",
    "realm": "string",
    "username": "string",
    "credentials": {},
    "challenges": {},
    "email": "string",
    "emailVerified": true,
    "status": "string",
    "created": "2016-05-21",
    "lastUpdated": "2016-05-21",
    "id": "string"
    */

    function register(registerData) {
      return Accounts
        .create({
        first_name: registerData.first_name,
        last_name: registerData.last_name,
        phone: registerData.phone,
        address: registerData.address,
         username: registerData.username,
         email: registerData.email,
         password: registerData.password
       })
       .$promise
      .then (function(response) {
          console.log('user data sent');
        },
        function(response){
            
              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Registration Unsuccessful</h3></div>' +
                  '<div><p>' +  response.data.error.message + 
                  '</p><p>' + response.data.error.name + '</p></div>';

                ngDialog.openConfirm({ template: message, plain: 'true'});

        });
    }

    return {
      login: login,
      logout: logout,
      register: register,
      isAuthenticated: isAuthenticated,
      getUsername: getUsername
    };
  }])

.factory('$localStorage', ['$window', function ($window) {
    return {
        store: function (key, value) {
            $window.localStorage[key] = value;
        },
        get: function (key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        remove: function (key) {
            $window.localStorage.removeItem(key);
        },
        storeObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key, defaultValue) {
            return JSON.parse($window.localStorage[key] || defaultValue);
        }
    }
}])
;
