/**
 * Created by Mikkel on 13/10/16.
 */

var app = angular.module("MyApp", ['ngRoute']);


var users = [];
app.controller("UserController", function ($http, $routeParams) {
    
    var self = this;
    self.populate = function(){
        if (users.length === 0) {
        $http.get("data/data.json").success(function (data) {
            users = data.users;
            self.users = users;
        })
    } else { //We used the cache property on the http request instead self.users = users;
    }
    if (users != null) {
        console.log("Adding user: " + $routeParams.id)
        self.user = users[$routeParams.id];
        users = [];
    }
    }
    self.populate();
    
});

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'partials/overview.html',
            controller: 'UserController',
            controllerAs: 'dataCtrl'
        }).
        when('/details/:id', {
            templateUrl: 'partials/details.html',
            controller: 'UserController',
            controllerAs: 'dataCtrl'
        });
    }]);

