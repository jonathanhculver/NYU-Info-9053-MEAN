angular.module("myWorld")
.controller("ThingCtrl", function($scope, $location, $routeParams, NavSvc, ThingsSvc){
  NavSvc.setTab("Things");
  function activate(){
    ThingsSvc.getThing($routeParams.id).then(function(thing){
      $scope.thing = thing;
    });
  }
  activate();
});
