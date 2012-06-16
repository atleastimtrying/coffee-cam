class Display
	constructor: (@video)->
		@canvas = $('canvas')[0]
		@canvas.width = 640
		@canvas.height = 480
		@context = @canvas.getContext '2d'
		@context.globalAlpha = 0.1
	draw: =>
		@context.fillRect 320,0,320,480
		@context.drawImage @video, 0, 0, 640, 480
		window.requestAnimationFrame @draw

class Source
	constructor: (@video)->
		@navigator = navigator
		@navigator.webkitGetUserMedia
			video: true
			audio: false
		, @success, @error
	
	success: (stream)=> 
		@video.src = window.webkitURL.createObjectURL stream
		window.app.display.draw()
	
	error: -> alert "broked"

class App
	constructor: ->
		@video = $('<video autoplay></video>')[0]
		@source = new Source @video
		@display = new Display @video

$ -> window.app = new App