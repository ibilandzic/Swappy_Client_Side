'use strict';

angular.module('confusionApp', ['ui.router','ngResource','ngDialog', 'lbServices'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                        controller  : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/home.html'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })
        
            // route for the aboutus page
            
            .state('app.woman', {
                url:'woman',
                views: {
                    'content@': {
                        templateUrl : 'views/woman.html',
                        controller  : 'WomanController'                  
                    }
                }
            })
            
            .state('app.girls', {
                url:'girls',
                views: {
                    'content@': {
                        templateUrl : 'views/girls.html',
                        controller  : 'GirlsController'                  
                    }
                }
            })
            
            .state('app.boys', {
                url:'boys',
                views: {
                    'content@': {
                        templateUrl : 'views/boys.html',
                        controller  : 'BoysController'                  
                    }
                }
            })
            
            .state('app.man', {
                url:'man',
                views: {
                    'content@': {
                        templateUrl : 'views/man.html',
                        controller  : 'ManController'                  
                    }
                }
            })
          
           .state('app.newad', {
                url:'newad',
                views: {
                    'content@': {
                        templateUrl : 'views/newadd.html',
                        controller  : 'NewAdController'                  
                    }
                }
            })
            
            .state('app.myads', {
                url:'myads',
                views: {
                    'content@': {
                        templateUrl : 'views/myads.html',
                        controller  : 'MyAdsController'                  
                    }
                }
            })

            .state('app.favorites', {
                url: 'favorites',
                views: {
                    'content@': {
                        templateUrl : 'views/favorites.html',
                        controller  : 'FavoritesController'
                   }
                }
            });
    
        $urlRouterProvider.otherwise('/');
    })
;
