/* PageUp JS */
'use strict';

const custom = (function($) {

	const $mobile		= $('.mobile'),
		  $desktop		= $('.desktop'),
		  $pageUpBtn	= $('#pageUp'),
		  showClass		= 'show';

	let showAt = 650;


	function _pageUp(topElem, speed) {
		$pageUpBtn.on('click', function() {
			$('html, body').animate({
				scrollTop: $(topElem).offset().top
			}, speed);
		});
	}

	function _onScroll() {
		$(window).scroll(function() {
			if( $(window).scrollTop() > showAt ) {
				$pageUpBtn.addClass( showClass );
			} else {
				$pageUpBtn.removeClass( showClass );
			}
		});
	}

	function mobileChecking() {
		if( !$desktop.length ) {
			_onScroll();
			_pageUp( 'body', 750 );
		}
	}

	function desktopChecking() {
		showAt = 800;
		if( !$mobile.length ) {
			_onScroll();
			_pageUp( 'body', 750 );
		}
	}

	return {
		onMobile:	mobileChecking(),
		onDesktop:	desktopChecking()
	}

})(jQuery);
