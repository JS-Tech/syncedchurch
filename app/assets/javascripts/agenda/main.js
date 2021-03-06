/* global angular */
"use strict";

var app = angular.module("Agenda", ["filters", "services", "directives"]);

angular.module("filters", []);
angular.module("services", []);
angular.module("directives", []);

app.controller("MainController", ["$scope", "$timeout", "Calendar", function($scope, $timeout, Calendar) {

  $scope.categories = JSON.parse(document.getElementById("categories-form").getAttribute("data-values"));

  initCalendar($scope, $timeout, Calendar);

  $scope.updateCalendar = function() {
    initCalendar($scope, $timeout, Calendar);
  };

  $scope.updateCategories = function(e) {
    var checkbox = e.currentTarget,
        value = parseInt(checkbox.value)
    if(checkbox.checked) {
      $scope.categories.push(value)
    } else {
      var i = $scope.categories.indexOf(value);
      $scope.categories.splice(i, 1);
    }
  };

}]);

function initCalendar($scope, $timeout, Calendar) {
  $scope.ready = false;
  $scope.weeks = [];

  $scope.calendar = new Calendar($scope.categories);

  $scope.today = $scope.calendar.todayKey;

  $scope.currentMonth = $scope.calendar.currentMonth;
  $scope.currentYear = $scope.calendar.currentYear;

  $timeout(function() {
    $scope.calendar.generateFirstMonth(function() {
      $scope.weeks = $scope.calendar.weeks;
      $scope.ready = true;
    });
  });

};
