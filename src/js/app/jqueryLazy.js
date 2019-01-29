/* jqueryLazy JS */
'use strict';

require('jquery-lazy');

(function($) {

	const lazyload = {
		$el:		$('img.lazyload'),
		options:	{
			effect:			'fadeIn',
			effectTime:		1500,
			threshold:		0,
			afterLoad: function(el) {
				$(el).removeClass('lazyload');
			},
			onError: function(element) {
				console.log('error loading ' + element.data('src'));
			}
		}
	};

	function _lazyLoad() {
		let lazy = lazyload.$el.Lazy( lazyload.options );
		return lazy;
	}

	return {
		lazyLoad:	_lazyLoad()
	}

})(jQuery);
