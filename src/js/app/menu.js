// drop menu plugin
;(function() {
    'use strict';
    // 
    // menu drop
    $.fn.mobileMenu = function(options) {
        //settings
        var settings = $.extend({
            navClose    : null,
            speed       : 300
        }, options);
      
        return this.each(function() {
            
            var navToggle 	= $(this),
                navbar    	= $('#' + navToggle.data('toggle')),
				navlink		= navbar.find('a'),
                speed     	= settings.speed;
            
            navbar.addClass('mobileMenu').attr('aria-hidden', true);
			
			function closeNavbar() {
				navbar.removeClass('is-open').attr('aria-hidden', true);
			}
			
			function openNavbar() {
				navbar.addClass('is-open').attr('aria-hidden', false);
			}
			
			$(document).on('click', function(e) {
				if(!navbar.is(e.target) && navbar.has(e.target).length === 0 && navToggle.has(e.target).length === 0) {
					closeNavbar();
				}			
			});
			
				
			navlink.on('click', closeNavbar);
            
            // open/close menu
            if (settings.navClose === null) {
                navToggle.on('click', openNavbar || closeNavbar);
            } else {                
                settings.navClose.on('click', closeNavbar);
            }            
            
        });
    };
})(console.log('menu loaded'));

/* menu */
var navbarToggle   = $('#menuToggle');

navbarToggle.mobileMenu({ speed: 500 });