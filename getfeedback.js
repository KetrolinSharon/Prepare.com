// Define AngularJS app for feedback page
var app = angular.module("feedbackApp", []);

// Feedback Controller
app.controller("FeedbackController", function($scope, $window) {
  $scope.answer = "";
  $scope.feedback = "";

  // Dummy feedback logic
  $scope.getFeedback = function() {
    if (!$scope.answer) {
      alert("Please enter your answer!");
      return;
    }
    $scope.feedback = "Good effort! Focus on clarity and providing examples. Make your response more structured and concise.";
  };

  // Navigate back to home page
  $scope.goHome = function() {
    $window.location.href = "home.html";
  };
});
