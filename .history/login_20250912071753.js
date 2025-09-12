// Module
/*angular.module('loginApp', [])
  .controller('LoginController', ['AuthService', 'MessageFactory', function(AuthService, MessageFactory) {
    var vm = this;
    vm.user = {};

    // Injected message from factory
    vm.welcomeMessage = MessageFactory.getMessage();
    
    // Used in view through filter
    vm.welcomeText = "Welcome back, Please enter your details";

    vm.login = function () {
      if (AuthService.authenticate(vm.user.email, vm.user.password)) {
        alert("Login Successful!");
      } else {
        alert("Invalid Credentials");
      }
    };
  }])

  // Service
  .service('AuthService', function () {
    this.authenticate = function (email, password) {
      // Basic logic for demo
      return email === "sharon@gmail.com" && password === "12345";
    };
  })

  // Factory
  .factory('MessageFactory', function () {
    return {
      getMessage: function () {
        return "Welcome to Prepare.com!";
      }
    };
  })

  // Directive
  .directive('highlightField', function () {
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

  // Filter
  .filter('capitalizeFirst', function () {
    return function (input) {
      if (!input) return '';
      return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
    };
  });
*/
// Module
angular.module('loginApp', [])
  .controller('LoginController', ['AuthService', 'MessageFactory', function(AuthService, MessageFactory) {
    var vm = this;
    vm.user = {};

    // Injected message from factory
    vm.welcomeMessage = MessageFactory.getMessage();
    vm.welcomeText = "Welcome back, Please enter your details";

    vm.login = async function () {
      try {
        const result = await AuthService.authenticate(vm.user.email, vm.user.password);

        if (result.success) {
          alert("Login Successful!\nWelcome " + result.name);
          // Redirect to dashboard
          window.location.href = "home.html";
        } else {
          alert(result.message || "Invalid Credentials");
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("Server error. Please try again later.");
      }
    };
  }])

  // Service (calls backend API instead of hardcoding)
  .service('AuthService', function () {
    this.authenticate = async function (email, password) {
      try {
        const res = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });
        return await res.json();
      } catch (err) {
        console.error("AuthService error:", err);
        return { success: false, message: "Unable to reach server" };
      }
    };
  })

  // Factory
  .factory('MessageFactory', function () {
    return {
      getMessage: function () {
        return "Welcome to Prepare.com!";
      }
    };
  })

  // Directive
  .directive('highlightField', function () {
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

  // Filter
  .filter('capitalizeFirst', function () {
    return function (input) {
      if (!input) return '';
      return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
    };
  });
