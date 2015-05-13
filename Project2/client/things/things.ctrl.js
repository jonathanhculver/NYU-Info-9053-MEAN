angular.module("myWorld").controller("ThingsCtrl", function($scope, $location, NavSvc, ThingsSvc){
  NavSvc.setTab("Things");
  $scope.message = "I am the Things control";
  $scope.user = ThingsSvc.user;
  $scope.delete = function(thing){
    ThingsSvc.deleteThing(thing).then(
      function(){
        $scope.error = null;
        $scope.success = "Thing has been deleted";
        activate();
      },
      function(error){
        $scope.error = error;
      }
    );
  };
  $scope.edit = function(thing){
    $location.path("/things/" + thing._id);
  };
  $scope.insert = function(){
    ThingsSvc.insertThing($scope.inserting).then(
      function(thing){
        $scope.success = "Insert successful for " + thing.name;
        $scope.error = null;
        activate();
      },
      function(error){
          $scope.error = error;
        $scope.success = null;
      }
    );
  };
  function activate(){
    $scope.inserting = {};
    ThingsSvc.getThings().then(function(things){
      $scope.things = things;
    });
  }
  activate();
});



