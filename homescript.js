var app = angular.module('prepareApp', ['ngAnimate', 'ngRoute']);

// Main Controller
app.controller("MainController", function($scope) {
  $scope.title = "Welcome to Prepare.com";
  $scope.subtitle = "Your personal AI-based interview coach.";
  $scope.servicesText = "AI-generated mock questions tailored for you.";
  $scope.practiceText = "Sharpen your skills with timed practice sessions.";
  $scope.feedbackText = "Receive instant, detailed feedback.";

  // Redirects
  $scope.startInterview = function() {
    window.location.href = "interview.html";
  };

  $scope.generateQuestions = function() {
    window.location.href = "questions.html";
  };

  $scope.startMockInterview = function() {
    window.location.href = "interview.html";
  };

  $scope.getFeedback = function() {
    window.location.href = "getfeedback.html";
  };

  $scope.goToAccount = function() {
    window.location.href = "account.html"; // Or your account page
  };
});

// Capitalize filter
app.filter('capitalize', function() {
  return function(input) {
    if (!input) return '';
    return input.charAt(0).toUpperCase() + input.slice(1);
  };
});

// Highlight directive
app.directive('highlight', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.on('mouseenter', () => element.css('background', '#f0f0f0'));
      element.on('mouseleave', () => element.css('background', ''));
    }
  };
});
