import style from '../styles/main.scss';
import { throttle, elements } from './view/base';
import baffle from 'baffle';
import 'jquery';

const state = {
    pageIdx: 0,
    pageBtnTextArr: ['work', 'about', 'contact', 'top'],
}

const showPage = () => {
    // if pageidx is not equal to length of section then add 1;
    state.pageIdx !== elements.sections.length - 1 ? state.pageIdx++ : state.pageIdx = 0;
    // if pageidx is equal to length of section then add class rotate to pagination btn
    state.pageIdx === elements.sections.length - 1 ? elements.paginationBtnIcon.classList.add('rotateTop') : elements.paginationBtnIcon.classList.remove('rotateTop');

    // For navbar shadow
    if (state.pageIdx > 0) {
        elements.nav.classList.add('nav-shadow');
        elements.navbar.classList.add('navbarBorderRemove');
    } else if (state.pageIdx === 0) {
        setTimeout(() => {
            elements.nav.classList.remove('nav-shadow');
            elements.navbar.classList.remove('navbarBorderRemove');
        }, 400);
    }

    //Changing pagination text
    elements.paginationBtnText.innerHTML = state.pageBtnTextArr[state.pageIdx];
    //Smooth scroll
    elements.sections[state.pageIdx].scrollIntoView({ behavior: 'smooth' });
}

function toSlide() {
    elements.sliderNavigation.forEach(el => el.classList.remove('active'));
    this.classList.add('active');
}

elements.paginationBtn.addEventListener('click', showPage);
elements.sliderNavigation.forEach(el => el.addEventListener('click', toSlide));