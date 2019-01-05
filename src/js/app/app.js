/* Main JS */

const app = (function($) {
	'use strict';

	const app = {};

	function example() {
		//let docWidth = $(document).width();
		console.log( $(document).width() );
		$(window).on('resize', function() {
			console.log( $(document).width() );
		});
	}

	return {
		example:	example()
	}

})(jQuery);
