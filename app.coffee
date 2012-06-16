class App
	constructor: ->
		@navigator = navigator
		@display = $('#display')[0]
		@display.autoplay = true
		@navigator.webkitGetUserMedia
			video: true
			audio: true
		, 
		@success, 
		@error
	success: (stream)-> @display.src = window.webkitURL.createObjectURL stream
	error: -> alert "broked"

$ -> window.app = new App