import style from '../styles/main.scss';
import { elements } from './view/base';
import 'jquery';

const API_URL = 'https://mohib-portfolio-api.herokuapp.com'

const state = {
    pageIdx: 0,
    pageBtnTextArr: ['work', 'about', 'contact', 'top'],
    animationDuration: 1000,
    lastTime: 0
}

// Page scroll and menu navigation (navbar)

elements.navItem.forEach((item, idx) => {
    item.addEventListener('click', function (e) {
        e.preventDefault();

        if (this.innerText.toLowerCase() === 'resume') {
            window.location.href = `${API_URL}/resume`
        } else {
            elements.paginationBtnText.innerText = state.pageBtnTextArr[idx]
            const pagePath = this.getAttribute('href');
            document.querySelector(pagePath).scrollIntoView({ behavior: 'smooth' });
        }
    })
})

// Page scroll and menu navigation (footer)

const showPage = (num) => {
    // if pageidx is not equal to length of section then add 1;
    if (num === 1) {
        //when scroll down
        state.pageIdx !== elements.sections.length - 1 ? state.pageIdx += 1 : state.pageIdx = 0;
        state.pageIdx === elements.sections.length - 1 ? elements.paginationBtnIcon.classList.add('rotateTop') : elements.paginationBtnIcon.classList.remove('rotateTop');
    } else if (num === -1) {
        //when scroll up
        if (state.pageIdx === 0) return;
        state.pageIdx += num;
        state.pageIdx === elements.sections.length - 1 ? elements.paginationBtnIcon.classList.add('rotateTop') : elements.paginationBtnIcon.classList.remove('rotateTop');
    }

    //Changing pagination text
    elements.paginationBtnText.innerHTML = state.pageBtnTextArr[state.pageIdx];
    //Smooth scroll
    // window.scrollTo(0, elements.sections[state.pageIdx].offsetTop);
    elements.sections[state.pageIdx].scrollIntoView({ behavior: 'smooth' })
    //Removing pageShow class / hiding all section first.
    elements.sections.forEach(section => {
        section.children[0].classList.remove('showPage');

    })
    //Showing the current section
    elements.sections[state.pageIdx].children[0].classList.add('showPage');
}

//Showing the first page on load
window.onload = () => {
    elements.sections[0].children[0].classList.add('showPage');
    elements.homeTitleE.style.transform = 'rotateY(720deg)';
}


elements.paginationBtn.addEventListener('click', () => {
    showPage(1);
});

window.addEventListener('wheel', e => {

    const wheelDelta = e.wheelDelta;
    //Getting current time;
    const currentTime = new Date().getTime();
    //inhibiting eventfire unless animationDuration is complete
    if (currentTime - state.lastTime < state.animationDuration) return;
    //executing functions on scrolling.
    if (wheelDelta < 0) {
        //next Page
        if (state.pageIdx === elements.sections.length - 1) return;
        showPage(1);

    } else if (wheelDelta > 0) {
        //prev Page
        showPage(-1);
    }
    //setting last time;
    state.lastTime = currentTime;
})

//=====================


// Cursor code 
document.addEventListener('mousemove', e => {
    // For Cursor Motion
    let mouse = {
        x: e.pageX - 10,
        y: e.pageY - 10
    }
    elements.cursor.style.opacity = '1';
    elements.cursorInner.style.top = `${mouse.y + 10}px`
    elements.cursorInner.style.left = `${mouse.x + 10}px`
    elements.cursorOuter.style.transform = `translate(${mouse.x - 1}px,${mouse.y - 1}px)`

    // For Background Color Check.
    let targetElementBgColor = window.getComputedStyle(e.target, null).getPropertyValue('background-color');
    if (targetElementBgColor === 'rgb(68, 48, 224)' || targetElementBgColor === 'rgb(47, 28, 193)') {
        elements.cursorOuter.classList.add('cursor--white')
        elements.cursorInner.classList.add('cursor--whiteBg');
    } else {
        elements.cursorOuter.classList.remove('cursor--white')
        elements.cursorInner.classList.remove('cursor--whiteBg');
    }
})

//Expansion of cursor on anchor
const onElExp = {
    anchors: elements.anchors,
    workNavLinks: elements.workNav
}

for (let el in onElExp) {
    onElExp[el].forEach(item => {
        item.addEventListener('mouseover', () => {
            elements.cursorOuter.classList.add('expand');
            elements.cursorInner.classList.add('center');
        })
    })
    onElExp[el].forEach(item => {
        item.addEventListener('mouseout', () => {
            elements.cursorOuter.classList.remove('expand');
            elements.cursorInner.classList.remove('center');
        })
    })
}
//===================================

// ======== Work slider code ========
elements.workNav.forEach(navBtn => {
    navBtn.addEventListener('click', function () {
        const slideNo = this.dataset.workid;
        const slide = elements.workCarousel[slideNo];


        // removing styles from other carousels item.
        elements.workCarousel.forEach(carousel => {
            carousel.querySelector('.work__left').classList.remove('work__left-animate')
            carousel.querySelector('.work__right').classList.remove('work__right-animate')
        })
        // Animating exsisting slide
        slide.querySelector('.work__left').classList.add('work__left-animate');
        slide.querySelector('.work__right').classList.add('work__right-animate');

        // UI for selected btn
        elements.workNav.forEach(navBtn => navBtn.classList.remove('work-navbtn-active'));
        this.classList.add('work-navbtn-active')
    })
})

//===================================

// Hamburger Menu functionality
elements.hamburgerMenu.onclick = function () {
    this.classList.toggle('open');
    elements.menu.classList.toggle('mobile-menu');
}

elements.navItem.forEach(function (item) {
    item.addEventListener('click', function () {
        const isDisplay = getComputedStyle(elements.hamburgerMenu).display
        if (isDisplay === 'block') {
            elements.hamburgerMenu.onclick();
        }
    })
})


//Loader
$(window).on('load', () => {
    $('.loader').fadeOut('slow', () => {
        $('.overlay').css({
            'opacity': '0',
            'zIndex': '-10'
        })
        $('body').css('height', 'initial');
        $('.footer').css('display', 'flex');
    });
})



// Contact Form
elements.contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();


    //catching form data
    const formData = new FormData(this);
    const name = formData.get('name'),
        email = formData.get('email'),
        message = formData.get('message');

    const data = {
        name,
        email,
        message
    }

    //making contact form light as user clicks on submit
    $('.contact-left__heading').css('opacity', '0.5');
    $(this).css('opacity', '0.5');

    fetch(`${API_URL}/contact/new`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.errors) {
                for (let error in data.errors) {
                    $(`#${error} i`).css('opacity', '1');
                }
                $('.contact-left__heading').css('opacity', '1');
                $(this).css('opacity', '1');
            } else {
                $('.contact-overlay').css('display', 'flex');
                $('.contact-overlay h3').css('opacity', '1');

                setTimeout(() => {
                    $('.contact-overlay').css('display', 'none');
                    $('.contact-left__heading').css('opacity', '1');
                    $(this).css('opacity', '1');
                    this.reset();
                }, 4000);
            }
        })
        .catch(err => {
            console.log(err);
        })

})


