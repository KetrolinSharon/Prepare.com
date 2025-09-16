var app = angular.module('prepareApp', ['ngAnimate', 'ngRoute']);

// ✅ Routing
app.config(function($routeProvider) {
  $routeProvider
    .when("/interview", {
      templateUrl: "interview.html",
      controller: "InterviewController"
    })
    .otherwise({ redirectTo: "/" });
});

// ✅ Main Controller
app.controller("MainController", function($scope, $location) {
  $scope.title = "welcome to prepare.com";
  $scope.subtitle = "Your personal AI-based interview coach.";
  $scope.servicesText = "AI-generated mock questions tailored for you.";
  $scope.practiceText = "Sharpen your skills with timed practice sessions.";
  $scope.feedbackText = "Receive instant, detailed feedback.";

  $scope.startInterview = function() {
    alert("Interview started!");
  };

  $scope.generateQuestions = function() {
    alert("Questions generated!");
  };

  $scope.practice = function() {
  window.location.href = "interview.html";
};

  $scope.getFeedback = function() {
    alert("Feedback generated!");
  };

  $scope.goToAccount = function() {
    alert("Redirecting to My Account...");
  };
});

// ✅ Capitalize filter
app.filter('capitalize', function() {
  return function(input) {
    if (!input) return '';
    return input.charAt(0).toUpperCase() + input.slice(1);
  };
});

// ✅ Highlight directive
app.directive('highlight', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.on('mouseenter', () => element.css('background', '#f0f0f0'));
      element.on('mouseleave', () => element.css('background', ''));
    }
  };
});

// ✅ Interview Page Controller
app.controller("MainController", function($scope) {
  $scope.practice = function() {
    // 👉 Navigate directly to interview.html
    window.location.href = "interview.html";
  };
});

