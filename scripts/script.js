import * as Cards from './cards.js';
import * as PopupForms from './popup-form.js';
import * as PopupPlace from './popup-place.js';

window.onload = function() {
    Cards.initialize();
    PopupForms.initialize();
    PopupPlace.initialize();

    const editBtn = document.querySelector('.profile__edit-button');
    const addCardBtn = document.querySelector('.profile__add-button');

    const personPopup = document.querySelector('#personPopup');
    const newPlacePopup = document.querySelector('#newPlacePopup');

    editBtn.addEventListener('click', () => {
        personPopup.handleOpen();
    });

    addCardBtn.addEventListener('click', () => {
        newPlacePopup.handleOpen();
    });


};