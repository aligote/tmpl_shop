/* Menu JS */
'use strict';

function MenuConstructor (id) {
    this.id = id;
    this.button = document.querySelector(this.id);

    this.onclick = function() {
        let target  = this.button.getAttribute('data-target'),
            menu    = document.querySelector(target);

        return toggleClass(menu, 'is-open');
    }

    function toggleClass(el, newClass) {
        if(!el.classList.contains(newClass)) {
            el.classList.add(newClass);
        } else {
            el.classList.remove(newClass);
        }
    }
}

MenuConstructor.prototype.btnClick = function() {
    this.button.addEventListener('click', this.onclick.bind(this), false);
}

const mainMenu = new MenuConstructor('button[data-toggle="menu"]');
mainMenu.btnClick();

/*
const Menu = (function() {
    const options = {
        element: '#menu'
    };
})();
*/

/*
const mainMenu = (function() {
    let ID;

    const Menu = function (id) {
        this.id = id;

        this.fromLeft = function() {
            console.log('Show the menu ' + this.id + ' from the left side');
        };

        this.fromRight = function() {
            console.log('Show the menu ' + this.id + ' from the right side');
        };
    }

    const menu = new Menu(ID);

    return {
        id:         ID,
        from:       function(side) {
            if(side === 'left') {
                return menu.fromLeft();
            } else {
                return menu.fromRight();
            }
        }
        // onLeft:     menu.fromLeft(),
        // onRight:    menu.fromRight()
    }

    // const menu = new Menu('#menu');
    // menu.showLeft();
})();

mainMenu.id = '#test';
mainMenu.from('right');
*/
