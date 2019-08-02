import style from '../styles/main.scss';
import { elements } from './view/base';
import 'jquery';

const state = {
    pageIdx: 0,
    pageBtnTextArr: ['work', 'about', 'contact', 'top'],
    animationDuration: 1000,
    lastTime: 0
}

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
elements.anchors.forEach(anchor => {
    anchor.addEventListener('mouseover', () => {
        elements.cursorOuter.classList.add('expand');
        elements.cursorInner.classList.add('center');
    })
    anchor.addEventListener('mouseout', () => {
        elements.cursorOuter.classList.remove('expand');
        elements.cursorInner.classList.remove('center');
    })
})

//UI of cursor on click



//===================================












