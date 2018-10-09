/* Main JS */

const app = (function() {

	'use strict';

	const app = {
		introSlider: '#introSlider'
	};

	function _sliderIntro(elem) {
		console.log( $(elem).length );
	}

	function sliders() {
		return {
			intro: _sliderIntro(app.introSlider)
		}
	}

	return {
		sliders: sliders
	}

})(jQuery);