$(document).ready(function() {
	
	$.fn.tweetify.defaults.customButton = true;
	
	// Show no default button, use custom generated URL to trigger popup content
	$('.tweetify').tweetify();
	
	// customButton = false, hence we're using twitters original.
	$('.tweetify2').tweetify({
		customButton:false
	});
	
});
