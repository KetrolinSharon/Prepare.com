// Define AngularJS app
var app = angular.module("prepareApp", []);

// QUESTIONS CONTROLLER
app.controller("QuestionsController", function($scope, $window) {
  
  // List to store generated questions
  $scope.questions = [];
  
  // Input topic
  $scope.topic = "";

  // Function to generate questions
  $scope.generate = function() {
    if (!$scope.topic) {
      alert("Please enter a topic!");
      return;
    }

    // Dummy AI-generated questions
    $scope.questions = [
      `What is ${$scope.topic}?`,
      `Explain key features of ${$scope.topic}.`,
      `How do you use ${$scope.topic} in real-world projects?`,
      `What are the common challenges with ${$scope.topic}?`,
      `Provide an example scenario where ${$scope.topic} is useful.`
    ];
  };

  // Go back to home page
  $scope.goHome = function() {
    $window.location.href = "home.html";
  };
});
