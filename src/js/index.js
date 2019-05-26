import style from '../styles/main.scss';
import { elements } from './view/base';
import baffle from 'baffle';
import 'jquery';

const showDevText = () => {
    const text = baffle(elements.devText);
    text.set({
        characters:'█▓█ ▒░/▒░ █░▒▓/ █▒▒ ▓▒▓/█ ░█▒/ ▒▓░ █<░▒ ▓/░>',
        speed:120,
    });
    text.start();
    text.reveal(4000);
}


window.addEventListener('load', showDevText);