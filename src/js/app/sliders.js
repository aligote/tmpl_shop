/* Sliders JS */

(function($) {
'use strict';

	const slider = {
		intro: '#introSlider'
	};

	function _sliderBS(elem) {
		if($(elem).length) {
			console.log($(elem).length);
		}
	}

	function sliders() {
		_sliderBS(slider.intro);
	}

	return {
		carousels: sliders()
	}

})(jQuery);
