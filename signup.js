// Define AngularJS Module
/*
  .controller('SignupController', ['SignupService', 'MessageFactory', function(SignupService, MessageFactory) {
    var vm = this;
    vm.user = {};
    vm.message = MessageFactory.getWelcomeMessage();

    vm.signup = function () {
      if (SignupService.register(vm.user)) {
        alert("Signup Successful!\nWelcome, " + vm.user.name);
      } else {
        alert("Signup Failed! Please check your inputs.");
      }
    };
  }])

  
  .service('SignupService', function () {
    var registeredUsers = [];

    this.register = function (user) {
      if (user.name && user.email && user.password) {
        registeredUsers.push(user);
        return true;
      }
      return false;
    };
  })

  .factory('MessageFactory', function () {
    return {
      getWelcomeMessage: function () {
        return "signup to learn more!!";
      }
    };
  })


  .directive('highlight', function () {
    return {
      restrict: 'A',
      link: function (scope, element) {
        element.on('focus', function () {
          element.css('border', '2px solid #00f7ff');
        });
        element.on('blur', function () {
          element.css('border', '');
        });
      }
    };
  })

  
  .filter('capitalizeFirst', function () {
    return function (input) {
      if (!input) return '';
      return input.charAt(0).toUpperCase() + input.slice(1);
    };
  });
  */
 // Define AngularJS Module
angular.module('signupApp', [])

  // Controller with Dependency Injection
  .controller('SignupController', ['SignupService', 'MessageFactory', function(SignupService, MessageFactory) {
    var vm = this;
    vm.user = {};
    vm.message = MessageFactory.getWelcomeMessage();

    vm.signup = function () {
    SignupService.register(vm.user)
    .then(function (response) {
      alert("Signup Successful!\nWelcome, " + vm.user.name);
      window.location.href = "home.html"; // redirect to login page
    })
    .catch(function (error) {
      console.error("Signup error:", error);
      let msg = (error.data && error.data.message) 
                  ? error.data.message 
                  : "Server unreachable. Please try again later.";
      alert(msg);
    });
  };

  }])

  // Service: Handles Registration Logic (connects to server.js)
  .service('SignupService', ['$http', function ($http) {
  this.register = function (user) {
    return $http.post("http://localhost:5000/api/users/signup", user);
  };
}])

  // Factory: Provides Static Messages
  .factory('MessageFactory', function () {
    return {
      getWelcomeMessage: function () {
        return "signup to learn more!!";
      }
    };
  })

  // Directive: Highlights Input Fields
  .directive('highlight', function () {
    return {
      restrict: 'A',
      link: function (scope, element) {
        element.on('focus', function () {
          element.css('border', '2px solid #00f7ff');
        });
        element.on('blur', function () {
          element.css('border', '');
        });
      }
    };
  })

  // Filter: Capitalize First Letter
  .filter('capitalizeFirst', function () {
    return function (input) {
      if (!input) return '';
      return input.charAt(0).toUpperCase() + input.slice(1);
    };
  });

