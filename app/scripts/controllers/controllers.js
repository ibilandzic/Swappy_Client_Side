'use strict';

angular.module('confusionApp')




.controller('MyAdsController', ['$scope','$state', '$rootScope', 'Item','Favorites', function ($scope,$state, $rootScope, Item, Favorites) {

    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showItem = false;
    $scope.message = "Loading ...";
    



    if ($rootScope.currentUser) {
      
      console.log('myads:user auth');
      
       Item.find({"filter":{"where":{
            "accountId": $rootScope.currentUser.id
        }}})
        .$promise.then(
        function (response) {
            $scope.items = response;
            if ($scope.items.length > 0){
                         $scope.showItem = true;
                        console.log('User is authenticated');
            }
            else{
                $scope.message = "No ads found";
            }
            
            
        },
        function (response) {
            console.log("Error");
            $scope.message = "No ads found.";
        });
    }
    else{
        
        $scope.message = "You are not logged in";
    }


   

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };
   
    

    $scope.deleteItem = function(itemid) {
        
        //destroy item
        Item.deleteById({id: itemid});
        console.log("Item deleted");
   
         Favorites.find({"filter":{"where":{"itemId": itemid}}}).$promise.then(function(response){
            
                $scope.favs = response;
                
                if ($scope.favs.length>0){
                    for (var i=0; i<$scope.favs.length;i++){
                        Favorites.deleteById({id:$scope.favs[i].id});
                        console.log("Fav deleted");
                    }
                }
                else ("Fav array is empty");
                $state.go($state.current, {}, {reload: true});
            
        },function(response){
            
        });
        //
    };
    
  
   
}])


.controller('WomanController', ['$scope','$window', '$rootScope', 'Item', 'Favorites','Accounts', function ($scope, $window, $rootScope, Item, Favorites,Accounts) {

    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showFavorites = true;
    $scope.showItem = false;
    $scope.message = "Loading ...";
    $scope.showContact = false;
    
    $scope.isAuth = function() {
        if ($rootScope.currentUser) {
      
      console.log('user is auth');
        return true;
    }
    else{
        
        console.log('user is not auth');
        return false;
    }
    };

    Item.find({"filter":{"where":{"category":"Woman"},"include": {"relation": "account"}}})
        .$promise.then(
        function (response) {
            $scope.items = response;
            
            if ($scope.items.length > 0){
               $scope.showItem = true;
               console.log("Woman: category not empty");
            }
            else{
                $scope.message="Category is empty";
            }
            
           
    
        },
        function (response) {
            console.log("Error");
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };

    $scope.toggleFavorites = function () {
        $scope.showFavorites = !$scope.showFavorites;
    };
    
    $scope.addToFavorites = function(itemid) {

    if ($rootScope.currentUser) {
      
      var itemInFavorites = 0;
      var favoriteItem = [];
      //check if this is already in favorites
      
      Favorites.find({"filter":{
          "where":{"itemId":itemid,"accountId":$rootScope.currentUser.id}
      }}).$promise.then(function (response){
          
          favoriteItem = response;
          if (favoriteItem.length > 0){
             itemInFavorites = 1;
             console.log("item is already favorite");
             alert("Item is already added as favorite");
          }
          
          else{
              //item is not in favorite
              console.log('adding favorites');
              Favorites.create({accountId: $rootScope.currentUser.id, itemId: itemid});
              alert("Item added as favorite");
          }
          
      }, function (response){
          console.log("error fetching favorites");
          alert("Unable to check favorites. Try again later!");
          itemInFavorites = 1;
      }); 
         
    }
    else{
        
        $scope.message = "You are not logged in";
        alert("Please log in.");
    }
        
    };
    
    
    
    $scope.sendMail = function(emailId,subject,message){
        console.log("Trying to open default meail client");
        
    $window.open("mailto:"+ emailId + "?subject=" + subject+"&body="+message,"_self");
        };
    
    $scope.getContact = function (accountId){
        
        $scope.contact = Accounts.findById({id: accountId});
        $scope.showContact = true;
        
    };
   
}])


.controller('GirlsController', ['$scope','$window', '$rootScope', 'Item', 'Favorites','Accounts', function ($scope, $window, $rootScope, Item, Favorites,Accounts) {

    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showFavorites = true;
    $scope.showItem = false;
    $scope.message = "Loading ...";
    $scope.showContact = false;
    
    $scope.isAuth = function() {
        if ($rootScope.currentUser) {
      
      console.log('user is auth');
        return true;
    }
    else{
        
        console.log('user is not auth');
        return false;
    }
    };
    Item.find({"filter":{"where":{"category":"Girls"}}})
        .$promise.then(
        function (response) {
            $scope.items = response;
            
            if ($scope.items.length > 0){
               $scope.showItem = true;
               console.log("Woman: category not empty");
            }
            else{
                $scope.message="Category is empty";
            }
            
           
    
        },
        function (response) {
            console.log("Error");
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };

    $scope.toggleFavorites = function () {
        $scope.showFavorites = !$scope.showFavorites;
    };
    
   $scope.addToFavorites = function(itemid) {

    if ($rootScope.currentUser) {
      
      var itemInFavorites = 0;
      var favoriteItem = [];
      //check if this is already in favorites
      
      Favorites.find({"filter":{
          "where":{"itemId":itemid,"accountId":$rootScope.currentUser.id}
      }}).$promise.then(function (response){
          
          favoriteItem = response;
          if (favoriteItem.length > 0){
             itemInFavorites = 1;
             console.log("item is already favorite");
             alert("Item is already added as favorite");
          }
          
          else{
              //item is not in favorite
              console.log('adding favorites');
              Favorites.create({accountId: $rootScope.currentUser.id, itemId: itemid});
              alert("Item added as favorite");
          }
          
      }, function (response){
          console.log("error fetching favorites");
          alert("Unable to check favorites. Try again later!");
          itemInFavorites = 1;
      }); 
         
    }
    else{
        
        $scope.message = "You are not logged in";
        alert("Please log in.");
    }
        
    };
    
    
    
    $scope.sendMail = function(emailId,subject,message){
        
    $window.open("mailto:"+ emailId + "?subject=" + subject+"&body="+message,"_self");
        };
    
    $scope.getContact = function (accountId){
        
        $scope.contact = Accounts.findById({id: accountId});
        $scope.showContact = true;
        
    };
   
}])


.controller('BoysController', ['$scope','$window', '$rootScope', 'Item', 'Favorites','Accounts', function ($scope, $window, $rootScope, Item, Favorites,Accounts) {

    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showFavorites = true;
    $scope.showItem = false;
    $scope.message = "Loading ...";
    $scope.showContact = false;
    
    $scope.isAuth = function() {
        if ($rootScope.currentUser) {
      
      console.log('user is auth');
        return true;
    }
    else{
        
        console.log('user is not auth');
        return false;
    }
    };

    Item.find({"filter":{"where":{"category":"Boys"}}})
        .$promise.then(
        function (response) {
            $scope.items = response;
            
            if ($scope.items.length > 0){
               $scope.showItem = true;
               console.log("Woman: category not empty");
            }
            else{
                $scope.message="Category is empty";
            }
            
           
    
        },
        function (response) {
            console.log("Error");
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };

    $scope.toggleFavorites = function () {
        $scope.showFavorites = !$scope.showFavorites;
    };
    
      $scope.addToFavorites = function(itemid) {

    if ($rootScope.currentUser) {
      
      var itemInFavorites = 0;
      var favoriteItem = [];
      //check if this is already in favorites
      
      Favorites.find({"filter":{
          "where":{"itemId":itemid,"accountId":$rootScope.currentUser.id}
      }}).$promise.then(function (response){
          
          favoriteItem = response;
          if (favoriteItem.length > 0){
             itemInFavorites = 1;
             console.log("item is already favorite");
             alert("Item is already added as favorite");
          }
          
          else{
              //item is not in favorite
              console.log('adding favorites');
              Favorites.create({accountId: $rootScope.currentUser.id, itemId: itemid});
              alert("Item added as favorite");
          }
          
      }, function (response){
          console.log("error fetching favorites");
          alert("Unable to check favorites. Try again later!");
          itemInFavorites = 1;
      }); 
         
    }
    else{
        
        $scope.message = "You are not logged in";
        alert("Please log in.");
    }
        
    };
    
    
    
    $scope.sendMail = function(emailId,subject,message){
        
    $window.open("mailto:"+ emailId + "?subject=" + subject+"&body="+message,"_self");
        };
    
    $scope.getContact = function (accountId){
        
        $scope.contact = Accounts.findById({id: accountId});
        $scope.showContact = true;
        
    };
   
}])

.controller('ManController', ['$scope', '$rootScope', 'Item', 'Favorites','$window', function ($scope, $rootScope, Item, Favorites,$window) {

    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showFavorites = true;
    $scope.showItem = false;
    $scope.message = "Loading ...";
    $scope.showContact = false;
    
    $scope.isAuth = function() {
        if ($rootScope.currentUser) {
      
      console.log('user is auth');
        return true;
    }
    else{
        
        console.log('user is not auth');
        return false;
    }
    };

    Item.find({"filter":{"where":{"category": "Man"},"include": {"relation": "account"}}})
        .$promise.then(
        function (response) {
            $scope.items = response;
            
            if ($scope.items.length > 0){
               $scope.showItem = true;
               console.log("Woman: category not empty");
            }
            else{
                $scope.message="Category is empty";
            }
            
           
    
        },
        function (response) {
            console.log("Error");
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };

    $scope.toggleFavorites = function () {
        $scope.showFavorites = !$scope.showFavorites;
    };
    
      $scope.addToFavorites = function(itemid) {

    if ($rootScope.currentUser) {
      
      var itemInFavorites = 0;
      var favoriteItem = [];
      //check if this is already in favorites
      
      Favorites.find({"filter":{
          "where":{"itemId":itemid,"accountId":$rootScope.currentUser.id}
      }}).$promise.then(function (response){
          
          favoriteItem = response;
          if (favoriteItem.length > 0){
             itemInFavorites = 1;
             console.log("item is already favorite");
             alert("Item is already added as favorite");
          }
          
          else{
              //item is not in favorite
              console.log('adding favorites');
              Favorites.create({accountId: $rootScope.currentUser.id, itemId: itemid});
              alert("Item added as favorite");
          }
          
      }, function (response){
          console.log("error fetching favorites");
          alert("Unable to check favorites. Try again later!");
          itemInFavorites = 1;
      }); 
         
    }
    else{
        
        $scope.message = "You are not logged in";
        alert("Please log in.");
    }
        
    };
    
    
    
    $scope.sendMail = function(emailId,subject,message){
        
    $window.open("mailto:"+ emailId + "?subject=" + subject+"&body="+message,"_self");
        };
    
    $scope.getContact = function (accountId){
        
        $scope.contact = Accounts.findById({id: accountId});
        $scope.showContact = true;
        
    };
   
}])




.controller('NewAdController', ['$scope', '$rootScope', '$state', '$stateParams', 'Item','ItemType','ItemSize','Item_state','Accounts','Favorites','$window', function ($scope, $rootScope, $state, $stateParams, Item,ItemType,ItemSize,Item_state,Accounts,Favorites,$window) {
    
   $scope.allSizes;
   $scope.allTypes;
   $scope.allStates={};
   $scope.showForm=false;
   $scope.message ="Loading ...";
   
  if ($rootScope.currentUser) {
      
      console.log('user auth');
        $scope.showForm = true;
        
        //dodano je nije dobro u favorites controleru
        $scope.account = Accounts.findById({id: $rootScope.currentUser.id});
        
        ItemType.find()
        .$promise
            .then(function(response){
                //got all item types
                $scope.allTypes = response;
               
            },
            function(response){
                //if response is blank, get default
                $scope.showForm = false;
                console.log("Unable to fetch item types");
                $scope.message = "Unable to fetch item type data. Try again later.";
                
            });
            
            
    ItemSize.find()
        .$promise
            .then(function(response){
                $scope.allSizes = response;
               
            },function(response){
                 $scope.showForm = false;
                console.log("Unable to fetch item size");
                $scope.message = "Unable to fetch item size data. Try again later.";
                 
            });
            
    
    Item_state.find()
        .$promise
            .then(function(response){
                $scope.allStates = response;
                $scope.stateAvailable=true;
            },function(response){
                $scope.allStates = "Good";
                 
            });
    }
    else{
        
        $scope.message = "You are not logged in";
    }
   
    
    
    $scope.newItem = {
        name: "",
        descr: "",
        type:"",
        size:"EUR ",
        state:"Good",
        gender:"Female",
        category:"Woman",
        accountId:"",
        contact:""
    };

    $scope.submitItem = function () {
        
        
        $scope.newItem.accountId = $rootScope.currentUser.id;
        $scope.newItem.contact = $scope.account.email;
        

        Item.create($scope.newItem);
        console.log('new item created');

        $state.go($state.current, {}, {reload: true});
        
        $scope.itemForm.$setPristine();
        
        $scope.newItem = {
        name: "",
        descr: "",
        type:"",
        size:"",
        state:"",
        gender:"",
        category:"",
        accountId:""
    };
       
     
       
    }
}])

// implement the IndexController and About Controller here


.controller('FavoriteController', ['$scope','$window', '$rootScope', '$state', 'Favorites', 'Accounts', function ($scope, $window, $rootScope, $state, Favorites, Accounts) {

    $scope.showFavorites = false;
    $scope.message = "Loading ...";
    
    
    if ($rootScope.currentUser) {
      
        console.log('user auth');
        //try fetching favorites by accountId
        
        Accounts.favorites({id:$rootScope.currentUser.id, "filter":
        {"include":["item"]}
        })
        .$promise.then(
        function (response) {
            $scope.favorites = response;
            if ($scope.favorites.length > 0){
                $scope.showFavorites = true;
                
            }
            else{
                $scope.message="No items in favorites";
            }
            
           
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
        
    }
    else{
       
        console.log("favorites: not auth");
        $scope.message = "You are not logged in";
    }
   

    
    $scope.deleteFavorite = function(favoriteid) {
        Favorites.deleteById({id: favoriteid});
        $scope.showDelete = !$scope.showDelete;
        $state.go($state.current, {}, {reload: true});
    };
    
     $scope.sendMail = function(emailId,subject,message){
        console.log("favorites: opening email client");
        $window.open("mailto:"+ emailId + "?subject=" + subject+"&body="+message,"_self");
        };
}])


//new favorites

.controller('FavoritesController', ['$scope','$window', '$rootScope', '$state', 'Favorites', 'Accounts', function ($scope, $window, $rootScope, $state, Favorites, Accounts) {

    $scope.showFavorites = false;
    $scope.message = "Loading ...";
    
    
    if ($rootScope.currentUser) {
       
        console.log('user auth');

        //try fetching favorites by accountId
        
        Favorites.find({"filter":{"where":
        {"accountId":$rootScope.currentUser.id},
        "include":["item"]}})
        .$promise.then(
        function (response) {
            $scope.favorites = response;
            if ($scope.favorites.length > 0){
                $scope.showFavorites = true;
                
            }
            else{
                $scope.message="No items in favorites";
            }
           
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
        
    }
    else{
       
        console.log("favorites: not auth");
        $scope.message = "You are not logged in";
    }
   
    
    $scope.deleteFavorite = function(favoriteid) {
        Favorites.deleteById({id: favoriteid});
        $scope.showDelete = !$scope.showDelete;
        $state.go($state.current, {}, {reload: true});
    };
    
     $scope.sendMail = function(emailId,subject,message){
        console.log("favorites: opening email client");
        $window.open("mailto:"+ emailId + "?subject=" + subject+"&body="+message,"_self");
        };
}])

.controller('HeaderController', ['$scope', '$state', '$rootScope', 'ngDialog', 'AuthService', function ($scope, $state, $rootScope, ngDialog, AuthService) {

    $scope.loggedIn = false;
    $scope.username = '';
    
    if(AuthService.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthService.getUsername();
    }
        
    $scope.openLogin = function () {
        ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller:"LoginController" });
    };
    
    $scope.openRegister = function(){
        ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterController" });
    };
    
    $scope.logOut = function() {
       AuthService.logout();
        $scope.loggedIn = false;
        $scope.username = '';
    };
    
    $rootScope.$on('login:Successful', function () {
        $scope.loggedIn = AuthService.isAuthenticated();
        $scope.username = AuthService.getUsername();
    });
        
    $rootScope.$on('registration:Successful', function () {
        $scope.loggedIn = AuthService.isAuthenticated();
        $scope.username = AuthService.getUsername();
    });
    
    $scope.stateis = function(curstate) {
       return $state.is(curstate);  
    };
    
}])

.controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'AuthService', function ($scope, ngDialog, $localStorage, AuthService) {
    
    $scope.loginData = $localStorage.getObject('userinfo','{}');
    
    $scope.doLogin = function() {
        if($scope.rememberMe)
           $localStorage.storeObject('userinfo',$scope.loginData);

        AuthService.login($scope.loginData);

        ngDialog.close();

    };
            
    $scope.openRegister = function () {
        ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterController" });
    };
    
}])


.controller('RegisterController', ['$scope','$state','$window', 'ngDialog', '$localStorage', 'AuthService','Accounts', function ($scope,$window,$state, ngDialog, $localStorage, AuthService,Accounts) {
    
    $scope.register={};
    $scope.loginData={};
    
    
    $scope.registration={
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    username: "",
    password:"",
    email: ""
   
  };
  $scope.accounts=[];
    
    $scope.doRegister = function() {

        AuthService.register($scope.registration);
        console.log('data sent');
        
        ngDialog.close();

    };
    
    $scope.createNewAccount = function(){
    
    console.log('entering function');
    $scope.accounts = Accounts.find({"filter": {
                    "where": {"username": $scope.registration.username}}});
    
    if ($scope.accounts.length > 0) {
        
        console.log('account exists');
        ngDialog.close();
        
        return;
        }
        
    else{
        Accounts.create($scope.registration);
        console.log("new account created");
        
        // $state.go($state.current, {}, {reload: true});
         $scope.registration={
            first_name: "",
            last_name: "",
            phone: "",
            address: "",
            image: "",
            realm: "",
            username: "",
            password:"",
            email: ""
   
            };
            
        $window.alert("New account succesfully created");
        ngDialog.close();
        return;
        
    }
    
    }
}])
;