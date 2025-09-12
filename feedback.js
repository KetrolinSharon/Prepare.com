// Module
/*angular.module('FeedbackApp', [])
  
  // Service
  .service('FeedbackService', function() {
    this.saveFeedback = function(text) {
      console.log("Feedback received:", text);
      alert("Thank you for your feedback!");
    };
  })

  // Factory
  .factory('LoggerFactory', function() {
    return {
      log: function(msg) {
        console.log("Log from factory:", msg);
      }
    };
  })

  // Filter (capitalizes first letter of each word)
  .filter('wordCap', function() {
    return function(input) {
      if (!input) return '';
      return input.replace(/\b\w/g, function(match) {
        return match.toUpperCase();
      });
    };
  })

  // Directive (adds a border to feedback box)
  .directive('feedbackBox', function() {
    return {
      restrict: 'A',
      link: function(scope, element) {
        element.css({
          border: '2px solid #444791',
          borderRadius: '12px',
          padding: '10px'
        });
      }
    };
  })

  // Controller with Dependency Injection
  .controller('FeedbackController', ['$scope', 'FeedbackService', 'LoggerFactory',
    function($scope, FeedbackService, LoggerFactory) {
      $scope.feedbackText = '';

      $scope.submitFeedback = function() {
        if ($scope.feedbackText.trim()) {
          FeedbackService.saveFeedback($scope.feedbackText);
          LoggerFactory.log($scope.feedbackText);
          $scope.feedbackText = '';
        } else {
          alert("Please write some feedback before submitting.");
        }
      };
    }
  ]);
*/
// Module
angular.module('FeedbackApp', [])

  // Service: send feedback to backend
  .service('FeedbackService', ['$http', function($http) {
    this.saveFeedback = function(text) {
      return $http.post("http://localhost:5000/feedback", { text: text });
    };
  }])

  // Factory: simple logger
  .factory('LoggerFactory', function() {
    return {
      log: function(msg) {
        console.log("Log from factory:", msg);
      }
    };
  })

  // Filter: capitalizes first letter of each word
  .filter('wordCap', function() {
    return function(input) {
      if (!input) return '';
      return input.replace(/\b\w/g, function(match) {
        return match.toUpperCase();
      });
    };
  })

  // Directive: adds a border to feedback box
  .directive('feedbackBox', function() {
    return {
      restrict: 'A',
      link: function(scope, element) {
        element.css({
          border: '2px solid #444791',
          borderRadius: '12px',
          padding: '10px'
        });
      }
    };
  })

  // Controller
  .controller('FeedbackController', ['$scope', 'FeedbackService', 'LoggerFactory',
    function($scope, FeedbackService, LoggerFactory) {
      $scope.feedbackText = '';

      $scope.submitFeedback = function() {
        if ($scope.feedbackText.trim()) {
          FeedbackService.saveFeedback($scope.feedbackText)
            .then(function(res) {
              if (res.data.success) {
                alert(res.data.message);
                LoggerFactory.log($scope.feedbackText);
                $scope.feedbackText = '';
              } else {
                alert(res.data.message || "Error saving feedback.");
              }
            })
            .catch(function(err) {
              console.error("Error:", err);
              alert("Server error. Please try again later.");
            });
        } else {
          alert("Please write some feedback before submitting.");
        }
      };
    }
  ]);
