(function($){
	
	$.fn.extend({
		tweetify : function( options ) {
			
			var internal = {
				'baseurl' 		: 'http://twitter.com/share',
				'buttonClass' : 'twitter-share-button',
				'scriptTag' 	: '<script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>',
				'attrs' 			: [ 'url' , 'via' , 'text' , 'related' , 'count' , 'lang' , 'counturl' , 'extension' ]
			};
			var options = $.extend( {} , $.fn.tweetify.defaults , options );
			var ignite = false; // a switch to capture if any tweet buttons are using the official script.
			
			this.each(function() {
				var self = $(this), o = options, defaultvalues = o.queries, myValues = {};

				// loop through all possible attrs and copy the current (markup defined ones) into the myValues object.
				$.each( internal.attrs , function(i, key) {
				  if ( typeof self.data(key) !== "undefined" ) { 
						myValues[key] = self.data(key);
				  } else if ( typeof defaultvalues[key] !== "undefined" ) {
						myValues[key] = defaultvalues[key];
					} else {
						myValues[key] = '';
					}
				});

				// if the URL is unspecified use the document url.
				var sharingThisPage = false;
				if ( myValues.url == "" ) { 
					var pageurl = window.location.href;
					pageurl = encodeURIComponent( pageurl );
					myValues.url = pageurl;
					sharingThisPage = true;
				}
				// Add the extension if specified
				if ( myValues.extension ) {
					if ( !sharingThisPage ) { 
						myValues.url = encodeURIComponent( myValues.url );
					}
					myValues.url += encodeURIComponent( myValues.extension );
				}
				
				
				
				if ( o.customButton ) { 
					// this is using a custom graphic for the button so don't ignite when JS is added.
					var queryString = ''; // a var to hold the to-be generated query string
					// generate the string by looping over all available and non-empty twitter api data attributes generating the proper query url syntax
					$.each( myValues , function( key , val ) {
						if ( val && key != 'extension' ) { // ignore the extension attribute since it's a custom one.
							queryString += '&'+key+'='+val;  // add the key and value to the querystring.
						}
					});
					queryString = queryString.replace( /^&/ , '?' ); // change the very first ampersand with a questionmark to begin the query.
					var fullurl = internal.baseurl+queryString // merge the twitter share url with the generated string.
					
					// attach the generated url to the objects href element then bind a custom popup (that look just like the original one) to the object.
					self.attr( 'href' , fullurl ).bind('click', function(e) {
						var width  = 550, 
								height = 450, 
								// get all positions to center popup
								top 	 = ( ($(window).height()/2) - (height/2) ),
								left 	 = ( ($(window).width() /2) - (width/2) );
								
					  e.preventDefault(); // stop default click (so we don't actually follow the url)
						window.open(this.href,'_blank','height='+height+',width='+width+',top='+top+',left='+left); // open a popup centered within the viewport
					});
					
				} else {
					// add the default class and all attributes so that the widgets.js picks up on it.
					$.each( myValues , function( key , val ) {
						if ( key == 'url' && typeof self.data(key) === "undefined" ) { 
							var url = decodeURIComponent( val );
							self.attr( 'data-'+key , url );
						} else if ( val && key != 'extension' && typeof self.data(key) === "undefined" ) {
							self.attr( 'data-'+key , val )
						}
					});
					// since the official script needs the buttonClass to pick up on this as a button we'll add it here.
					self.addClass( internal.buttonClass );
					ignite = true; // we also set ignite to true so that we can attach the script AFTER all buttons have been looped over.
				}

			}); // end each loop
			
			// after all looping and data-attribute writing we'll add the official script here to ignite our default buttons.
			if ( ignite ) {
				$('body').append( internal.scriptTag );
			}
			
			// return the jquery objects, keeping things chainable.
			return this;
			
		}
	});
	

	$.fn.tweetify.defaults = {
		'queries' : {
			'url'			: '',
			'via' 		: '',
			'text'		: '',
			'related' : '',
			'count' 	: 'none',
			'lang'		: '',
			'counturl': ''
		},
		'customButton' : false
	}

})(jQuery);