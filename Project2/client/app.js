//configuration
var app = angular.module("myWorld", ['ngRoute']);
app.run(function(AuthSvc){
  AuthSvc.setUser();
});

// services


//directives
