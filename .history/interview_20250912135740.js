angular.module('interviewApp', [])
  .controller('InterviewController', ['$scope', '$filter', function($scope, $filter) {
    const vm = this;

    vm.videoOn = false;
    vm.micOn = true;

    vm.roll = '';
    vm.question = "Give an example of a time you went above and beyond";

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
      alert(`Thanks, ${$filter('uppercase')(vm.role || 'Candidate')}! Interview finished.`);
    };
  }]);
