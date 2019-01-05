/* Main JS */
'use strict';

const app = (function($) {

	const slider = {
		intro: '#introSlider'
	};

	function _sliderBS(elem) {
		if($(elem).length) {
			console.log($(elem).length);
		}
	}

	function sliders() {
		return {
			intro: _sliderBS(slider.intro)
		}
	}

	return {
		carousels: sliders()
	}

})(jQuery);
