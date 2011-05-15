(function($){
	
	$.fn.extend({
		tweetify : function( options ) {
			
			var privateOptions = {
				'url' : 'http://twitter.com/share',
				'buttonClass' : 'twitter-share-button'
			}
			var options = $.extend( {} , privateOptions , $.fn.tweetify.defaults , options )
			var pageurl = window.location.protocol+'//'+window.location.host+window.location.pathname;
			var twitterJs = '<script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>';
			
			this.each(function() {
				var o = options;
				var self = $(this);

				// store specific data to include in this button
				var data = o;
				
				// check if the queries.url is blank, if so set it to the current path
				if ( data.queries.url == "" || typeof data.queries.url !== "string" ) { 
					 data.queries.url = pageurl;
				}
				// if the data-text attribute is available use it.
				if ( data.queries.text == "" && typeof self.data('text') !== "undefined" ) { 
					data.queries.text = self.data('text');
				} else if ( typeof self.data('text') === "undefined" ) {
					data.queries.text = '';
				}

				// attach custom hook at the end of ones url, eg: for adding a query string.
				if ( typeof o.urlExtend !== "undefined" ) {
					// store the selector string.
					var extension = o.urlExtend;
					// if not a string make it one.
					if ( typeof extension !== "string" ) { 
						 extension = o.urlExtend.toString();
					}
					// append this sting to the URL
					data.queries.url += encodeURIComponent( extension );
				}

				if ( o.customButton ) { 
					// if we have a custom button to display, don't attach the script and instead create some custom share urls.
					// generate a encoded URL with all parameters.
					var generate = '';
					$.each( data.queries , function(key, val) {
						if ( val != '' ) { 
					  	generate += '&'+key+'='+encodeURIComponent( val );
						}
					});
					var generate = generate.replace( /^&/ , '?'); // make the first ampersand a questionmark to begin the query string that is being attached to the share URL
					
					self.attr('href', data.url+generate ).bind('click', function(e) {
					  e.preventDefault();
						window.open(this.href,'_blank','height=450,width=550');
					});
					
				} else {
					// generate the data-attributes so that once twitter.js ignites it will pick up on our custom options.
					$.each( data.queries , function( key , val ) {
						if ( val != '' && typeof self.data( key ) === "undefined" ) { 
							self.attr('data-'+key , val );
						}
					});
					// add the default href
					// add the button class so that the js picks up on it.
					self.attr('href', data.url ).addClass( data.buttonClass ); 
				}

			}); // <= end the each loop
			
			if ( !options.customButton ) { 
				// if we're using the default button just attach the script which will create the default buttons.
				$('body').append( twitterJs ); // attach script after attributes have been filled to ignite functionality
			}
			
			// return the jquery objects, keeping things chainable.
			return this;
		}
		
	});
	

	$.fn.tweetify.defaults = {
		'queries' : {
			'url'			: '',
			'count' 	: 'none',
			'via' 		: 'jannisg',
			'related' : 'jannisg',
			'text'		: ''
		},
		'customButton' : false
	}

})(jQuery);