import * as Cards from './cards.js';
import * as Popups from './popup.js';

window.onload = function() {
    Cards.initialize();
    Popups.initialize();

    const editBtn = document.querySelector('.profile__edit-button');
    const addCardBtn = document.querySelector('.profile__add-button');

    const personPopup = document.querySelector('.popup_type_person-form');
    const newPlacePopup = document.querySelector('.popup_type_place-form');

    editBtn.addEventListener('click', () => {
        personPopup.handleOpen();
    });

    addCardBtn.addEventListener('click', () => {
        newPlacePopup.handleOpen();
    });


};