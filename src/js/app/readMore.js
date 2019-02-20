/* ReadMore JS */
'use strict';

/*
options = {
    class,
    css : {},
    text: {
        more,
        less
    }
}
readMore(selector, options);
*/
// new
module.exports = function(button, options) {

    options = (options === undefined ? {} : options);

    let elClass = (options.class === undefined ? 'show' : options.class),
        css = (options.css === undefined ? {height: '300px'} : options.css),
        text = options.text;

    if( text === undefined ) {
        text = {
            less: 'Show less',
            more: 'Show more'
        };
    } else {
        text.less = (typeof text.less === 'undefined' ? 'Show less' : options.text.less);
        text.more = (typeof text.more === 'undefined' ? 'Show more' : options.text.more);
    }

    function _toggleShow(button, elClass, css, text) {
        let _this = $(button);

        if( _this.length ) {
            let $target  = $( _this.attr('data-target') ),
                styles  = {};

            $.each(css, function(param, value) {
                styles[param] = value;
            });

            $target.css(styles);

            _this.on('click', function() {
                
                console.log(_this + ' clicks');

                $(this).toggleClass('collapsed');

                $target.toggleClass(elClass);

                if( $(this).hasClass('collapsed') ) {
                    $(this).children('span').text(text.less);
                } else {
                    $(this).children('span').text(text.more);
                    $('html, body').animate({
                        scrollTop: $target.offset().top
                    }, 500);
                }
            });
        }
    }

	return _toggleShow(button, elClass, css, text);
};

// old
/* const readMore = (function() {
    //const btn = '#readMore'; //default

	const element = {
        show: 'show',
        css: {
            height: '200px'
        }
	};

    function _toggleShow(btn, css=element.css) {
        let _this = $(btn);

        if(_this.length) {
            let $target  = $( _this.attr('data-target') ),
                styles  = {};

            $.each(css, function(param, value) {
                //console.log(param + ' | ' + value);
                styles[param] = value;
            });
            //console.log(styles);
            $target.css(styles);

            _this.on('click', function() {
                $(this).toggleClass('collapsed');
                $target.toggleClass(element.show);

                if( $(this).hasClass('collapsed') ) {
                    $(this).children('span').text('Show less');
                } else {
                    $(this).children('span').text('Show more');
                    $('html, body').animate({
        				scrollTop: $target.offset().top
        			}, 500);
                }
            });
        } else {
            console.log(_this + ' Button does not exist...');
        }
    }

	return {
		seoReadMore: _toggleShow('#seoReadMore', {height: '300px'})
	}

})();
*/
