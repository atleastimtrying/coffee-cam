(function() {
  var App, Display, Source;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Display = (function() {

    function Display(video) {
      this.video = video;
      this.draw = __bind(this.draw, this);
      this.canvas = $('canvas')[0];
      this.canvas.width = 640;
      this.canvas.height = 480;
      this.context = this.canvas.getContext('2d');
      this.context.globalAlpha = 0.1;
    }

    Display.prototype.draw = function() {
      this.context.fillRect(320, 0, 320, 480);
      this.context.drawImage(this.video, 0, 0, 640, 480);
      return window.requestAnimationFrame(this.draw);
    };

    return Display;

  })();

  Source = (function() {

    function Source(video) {
      this.video = video;
      this.success = __bind(this.success, this);
      this.navigator = navigator;
      this.navigator.webkitGetUserMedia({
        video: true,
        audio: false
      }, this.success, this.error);
    }

    Source.prototype.success = function(stream) {
      this.video.src = window.webkitURL.createObjectURL(stream);
      return window.app.display.draw();
    };

    Source.prototype.error = function() {
      return alert("broked");
    };

    return Source;

  })();

  App = (function() {

    function App() {
      this.video = $('<video autoplay></video>')[0];
      this.source = new Source(this.video);
      this.display = new Display(this.video);
    }

    return App;

  })();

  $(function() {
    return window.app = new App;
  });

}).call(this);
