(function() {
  var App;

  App = (function() {

    function App() {
      this.navigator = navigator;
      this.display = $('#display')[0];
      this.display.autoplay = true;
      this.navigator.webkitGetUserMedia({
        video: true,
        audio: true
      }, this.success, this.error);
    }

    App.prototype.success = function(stream) {
      return this.display.src = window.webkitURL.createObjectURL(stream);
    };

    App.prototype.error = function() {
      return alert("broked");
    };

    return App;

  })();

  $(function() {
    return window.app = new App;
  });

}).call(this);
