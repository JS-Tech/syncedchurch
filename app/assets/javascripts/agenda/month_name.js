/* global angular */
"use strict";

var module = angular.module("directives");

module.directive("monthName", [function() {

  return function(scope, element, attrs) {
    var $ = { "currentMonth": null, "nextMonth": null, "previousMonth": null };

    element.bind("scroll", function() {
      $.currentMonth = $.currentMonth || document.getElementById("current-month");
      $.nextMonth = $.nextMonth || document.getElementById("next-month") || nextMonthElement($.currentMonth);
      $.previousMonth = $.previousMonth || document.getElementById("previous-month") || previousMonthElement($.currentMonth);

      if($.nextMonth !== null && offset($.nextMonth).top < 100) {
        updateMonthName(scope, $.nextMonth);
        $ = updateSelectors($, "nextMonth", "previousMonth", nextMonthElement);
      }

      if($.previousMonth !== null && offset($.previousMonth).top > -100) {
        updateMonthName(scope, $.previousMonth);
        $ = updateSelectors($, "previousMonth", "nextMonth", previousMonthElement);
      }
    });
  };
}]);

function updateMonthName(scope, element) {
  scope.$apply(function() {
    scope.currentMonth = element.getElementsByClassName("month-name")[0].innerHTML;
  });
}

function updateSelectors($, mainSelector, secondSelector, callback) {
  if($[secondSelector] !== null) { $[secondSelector].removeAttribute("id"); }
  $[mainSelector].setAttribute("id", "current-month");
  $.currentMonth.setAttribute("id", "previous-month");
  $.currentMonth = $[mainSelector];
  $[secondSelector] = $.currentMonth;
  $[mainSelector] = callback($[mainSelector]);
  return $;
}

function offset(element) {
  var rect = element.getBoundingClientRect(), bodyElt = document.body;
  return {
    top: rect.top + bodyElt .scrollTop,
    left: rect.left + bodyElt .scrollLeft
  }
}

function nextMonthElement(element) {
  var nextElement = element.nextElementSibling;
  return findMonthElement(nextElement, nextMonthElement)
}

function previousMonthElement(element) {
  var previousElement = element.previousElementSibling;
  return findMonthElement(previousElement, previousMonthElement)
}

function findMonthElement(element, callback) {
  if(element !== null) {
    if(element.classList.contains('has-month')) {
      element.setAttribute("id", "previous-month");
      return element;
    } else {
      return callback(element);
    }
  } else {
    return null
  }
}