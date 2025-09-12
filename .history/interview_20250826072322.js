angular.module('interviewApp', [])
  .controller('InterviewController', ['$scope', '$filter', function($scope, $filter) {
    const vm = this;

    vm.videoOn = false;
    vm.micOn = true;

    // ❌ Bug 1: wrong variable name
    vm.roll = '';
    vm.question = "Give an example of a time you went above and beyond";

    // ❌ Bug 2: wrong element id
    const videoFeed = document.getElementById('videoFeeds');

    vm.toggleVideo = function () {
      vm.videoOn = !vm.videoOn;

      if (vm.videoOn) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            videoFeed.srcObject = stream;
            videoFeed.style.display = 'block';
          })
          .catch(err => {
            alert("Camera access denied.");
            vm.videoOn = false;
            $scope.$apply();
          });
      }
    };

    vm.finishInterview = function () {
      // ❌ Bug 3: using role even though we only declared roll
      alert(`Thanks, ${$filter('uppercase')(vm.role || 'Candidate')}! Interview finished.`);
    };
  }]);
