/* Sliders JS */
'use strict';

require('../../../node_modules/owl.carousel/dist/owl.carousel');

(function($) {

	const slider = {
		intro: 		'#introSlider',
		prodList: 	'#products__carousel_1'
	};

	const optProdList_1 = {
		nav: false,
		dots: true,
		onInitialized: function(e) {
			let _this = $(e.target);

			if(_this.hasClass('d-flex')) {
				_this.removeClass('d-flex')
			}
		}
	}

	function _sliderBS(elem) {
		if($(elem).length) {
			console.log($(elem).length);
		}
	}

	function _owlSlider(selector, options=null) {
		$(selector).owlCarousel(options);
	}

	return {
		slider_intro: 	_sliderBS(slider.intro),
		slider_prod_1: 	_owlSlider(slider.prodList, optProdList_1),
	}

})(jQuery);
