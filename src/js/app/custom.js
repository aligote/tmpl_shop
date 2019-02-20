/* Main JS */
'use strict';

const readMore = require('./readMore');

(function($) {

	const app = {};
	
	function toReadMore() {
		let options = {
			css: {height: '200px'}
		}
		readMore('[data-plugin="readmore"]', options);
	}

	function example() {
		//let docWidth = $(document).width();
		console.log( $(document).width() );
	}

	return {
		toReadMore:		toReadMore(),
		//example:		example(),
	}

})(jQuery);
