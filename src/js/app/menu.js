/* Menu JS */
'use strict';

function TheMenu (id) {
	
    this.id = id;
	
	this.sandwitch = function() {
    	let button = document.querySelectorAll(this.id);
		
		button.forEach(function(el) {
			return _toggleSandwitch(el, 'show');
		});
	}
	
	function _toggleSandwitch(el, showClass) {
		let target  = el.getAttribute('data-target'),
			menu    = document.querySelector(target);

		function _switchMenuClass() {
			_switchClass(menu, showClass);
		}

		return el.addEventListener('click', _switchMenuClass, false);
	}

    function _switchClass(el, newClass) {
		
        if( !el.classList.contains(newClass) ) {
            el.classList.add(newClass);
        } else {
            el.classList.remove(newClass);
        }
    }
}


const mainMenu = new TheMenu('[data-toggle="menu"]');

mainMenu.sandwitch();

