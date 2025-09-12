var app = angular.module('prepareApp', ['ngAnimate']);

// ✅ Add capitalize filter
app.filter('capitalize', function() {
  return function(input) {
    if (!input) return '';
    return input.charAt(0).toUpperCase() + input.slice(1);
  };
});

app.controller('MainController', function($scope) {
  // ✅ Scope variables
  $scope.title = "welcome to prepare.com";
  $scope.subtitle = "Your personal AI-based interview coach.";
  $scope.servicesText = "AI-generated mock questions tailored for you.";
  $scope.practiceText = "Sharpen your skills with timed practice sessions.";
  $scope.feedbackText = "Receive instant, detailed feedback.";

  // ✅ Functions
  $scope.startInterview = function() {
    alert("Interview started!");
  };

  $scope.generateQuestions = function() {
    alert("Questions generated!");
  };

  $scope.practice = function() {
    alert("Practice session started!");
  };

  $scope.getFeedback = function() {
    alert("Feedback generated!");
  };
});

// ✅ highlight directive
app.directive('highlight', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.on('mouseenter', () => element.css('background', '#f0f0f0'));
      element.on('mouseleave', () => element.css('background', ''));
    }
  };
});
