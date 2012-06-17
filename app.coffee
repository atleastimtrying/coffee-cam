class Display
  constructor: (@video)->
    @canvas = $('canvas')[0]
    @canvas.width = 320
    @canvas.height = 240
    @context = @canvas.getContext '2d'
  
  draw: (pixelData)=>
    pixelArray = pixelData.data
    @pixelChange pixelArray, index for pixel, index in pixelArray
    pixelData.data = pixelArray
    @context.putImageData pixelData, 0, 0
  
  pixelChange: (array, index)->
    r = array[index]
    g = array[index+1]
    b = array[index+2]
    a = array[index+3]
    brightness = (r+g+b)/3
    array[index] = r
    array[index+1] = g
    array[index+2] = b
    array[index+3] = a

class Source
  constructor: (@video)->
    @navigator = navigator
    @navigator.webkitGetUserMedia
      video: true
      audio: false
    , @success, @error
    @canvas = document.createElement 'canvas'
    @canvas.width = 320
    @canvas.height = 240
    @context = @canvas.getContext '2d'
  
  success: (stream)=> 
    @video.src = window.webkitURL.createObjectURL stream
    window.app.draw()
  
  getVideoPixels: ->
    @context.drawImage @video, 0, 0 , 320, 240
    #@context.fillRect 10,10,100,100
    iData = @context.getImageData 0, 0, 320, 240
    iData

  error: -> alert "broked"

class App
  constructor: ->
    @video = $('<video autoplay></video>')[0]
    @source = new Source @video
    @display = new Display @video
  draw: =>
    @display.draw @source.getVideoPixels()
    window.requestAnimationFrame @draw

$ -> window.app = new App