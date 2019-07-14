const elements = {
    devText: document.querySelector('.dev-text'),
    sections: document.querySelectorAll('section'),
    paginationBtn: document.querySelector('.footer-pagination'),
    paginationBtnText: document.querySelector('.footer-pagination__text'),
    paginationBtnIcon: document.querySelector('.footer-pagination__icon'),
    nav: document.querySelector('nav'),
    navbar: document.querySelector('.navbar'),
    slides: document.querySelectorAll('.slide'),
    sliderNavigation: document.querySelectorAll('.slider-navbar li')
}

function throttle(fn, wait) {
    var time = Date.now();
    return function () {
        if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
        }
    }
}


module.exports = {
    throttle,
    elements
}
