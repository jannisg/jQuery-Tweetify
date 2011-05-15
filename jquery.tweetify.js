(function($){
	
	$.fn.extend({
		tweetify : function( options ) {
			
			var internal = {
				'baseurl' : 'http://twitter.com/share',
				'buttonClass' : 'twitter-share-button',
				'attrs' : [ 'url' , 'via' , 'text' , 'related' , 'count' , 'lang' , 'counturl' ]
			}
			
			var options = $.extend( {} , internal , $.fn.tweetify.defaults , options ), o = options;
			var pageurl = window.location.protocol+'//'+window.location.host+window.location.pathname;
			var twitterJs = '<script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>';
			
			this.each(function() {
				var self = $(this);
				// store specific data to include in this button
				var data = o, defaultvalues = data.queries, myValues = {};

				$.each( internal.attrs , function(i, val) {
				  if ( typeof self.data(val) !== "undefined" ) { 
						myValues[val] = self.data(val);
				  } else {
						myValues[val] = defaultvalues[val];
					}
				});
				
				// loop through existing data-attributes and if they're twitter related override the defaults.
				$.each( self.data() , function(key, val) {
					if ( $.inArray( key , internal.attrs ) ) { 
						myValues[key] = val; // if key is a twitter api attribute then store it, overriding the defaults.
					}
				});
			
				// attach custom hook at the end of ones url, eg: for adding a query string.
				if ( typeof self.data('extension') !== "undefined" ) {
					// store the selector string.
					var extension = self.data('extension');
					// if not a string make it one.
					if ( typeof extension !== "string" ) { extension = self.data('extension').toString(); }
					// append this sting to the URL
					defaultvalues.url += encodeURIComponent( extension );
				}

				if ( o.customButton ) { 
					// if we have a custom button to display, don't attach the script and instead create some custom share urls.
					// generate a encoded URL with all parameters.
					var generate = '';
					$.each( defaultvalues , function( key, val ) {
						if ( val != '' ) { 
					  	generate += '&'+key+'='+encodeURIComponent( val );
						}
					});
					var generate = generate.replace( /^&/ , '?'); // make the first ampersand a questionmark to begin the query string that is being attached to the share URL
					
					self.attr('href', internal.baseurl+generate ).bind('click', function(e) {
					  e.preventDefault();
						window.open(this.href,'_blank','height=450,width=550');
					});
					
				} else {
					// generate the data-attributes so that once twitter.js ignites it will pick up on our custom options.
					$.each( defaultvalues , function( key , val ) {
						if ( val != '' && typeof self.data( key ) === "undefined" ) { 
							self.attr('data-'+key , val );
						}
					});
					// add the default href
					// add the button class so that the js picks up on it.
					self.attr('href', myValues.url ).addClass( internal.buttonClass ); 
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
			'via' 		: 'jannisg',
			'text'		: '',
			'related' : 'jannisg',
			'count' 	: 'none',
			'lang'		: 'en',
			'counturl': ''
		},
		'customButton' : false
	}

})(jQuery);