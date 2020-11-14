import {appendCardToDom} from './Card.js';
import personFormPopupObj from "./PersonFormPopup.js";
import placeFormPopupObj from "./PlaceFormPopup.js";

window.onload = function() {
    const initialCards = [
        {
            name: 'Архыз',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
        },
        {
            name: 'Челябинская область',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
        },
        {
            name: 'Иваново',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
        },
        {
            name: 'Камчатка',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
        },
        {
            name: 'Холмогорский район',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
        },
        {
            name: 'Байкал',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
        }
    ];

    initialCards.forEach(elem => appendCardToDom(elem, 'tail'));


    const editBtn = document.querySelector('.profile__edit-button');

    editBtn.addEventListener('click', () => {
        personFormPopupObj.open();
    });

    const addCardBtn = document.querySelector('.profile__add-button');

    addCardBtn.addEventListener('click', () => {
        placeFormPopupObj.open();
    });
};

