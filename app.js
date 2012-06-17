(function() {
  var App, Display, Source;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Display = (function() {
    function Display(video) {
      this.video = video;
      this.draw = __bind(this.draw, this);
      this.canvas = $('canvas')[0];
      this.canvas.width = 320;
      this.canvas.height = 240;
      this.context = this.canvas.getContext('2d');
    }
    Display.prototype.draw = function(pixelData) {
      var index, pixel, pixelArray, _len;
      pixelArray = pixelData.data;
      for (index = 0, _len = pixelArray.length; index < _len; index++) {
        pixel = pixelArray[index];
        this.pixelChange(pixelArray, index);
      }
      pixelData.data = pixelArray;
      return this.context.putImageData(pixelData, 0, 0);
    };
    Display.prototype.pixelChange = function(array, index) {
      var a, b, brightness, g, r;
      r = array[index];
      g = array[index + 1];
      b = array[index + 2];
      a = array[index + 3];
      brightness = (r + g + b) / 3;
      array[index] = r;
      array[index + 1] = g;
      array[index + 2] = b;
      return array[index + 3] = a;
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
      this.canvas = document.createElement('canvas');
      this.canvas.width = 320;
      this.canvas.height = 240;
      this.context = this.canvas.getContext('2d');
    }
    Source.prototype.success = function(stream) {
      this.video.src = window.webkitURL.createObjectURL(stream);
      return window.app.draw();
    };
    Source.prototype.getVideoPixels = function() {
      var iData;
      this.context.drawImage(this.video, 0, 0, 320, 240);
      iData = this.context.getImageData(0, 0, 320, 240);
      return iData;
    };
    Source.prototype.error = function() {
      return alert("broked");
    };
    return Source;
  })();
  App = (function() {
    function App() {
      this.draw = __bind(this.draw, this);      this.video = $('<video autoplay></video>')[0];
      this.source = new Source(this.video);
      this.display = new Display(this.video);
    }
    App.prototype.draw = function() {
      this.display.draw(this.source.getVideoPixels());
      return window.requestAnimationFrame(this.draw);
    };
    return App;
  })();
  $(function() {
    return window.app = new App;
  });
}).call(this);
