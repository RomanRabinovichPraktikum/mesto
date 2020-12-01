import '../pages/index.css';

import Card from './Card.js';
import * as popupFuncs from './popups.js';

const cardsGrid = document.querySelector('.grid');

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

    initialCards.forEach(elem => addCardToDOM(elem, 'tail'));

    popupFuncs.initialize();

    const editBtn = document.querySelector('.profile__edit-button');
    const addCardBtn = document.querySelector('.profile__add-button');

    editBtn.addEventListener('click', () => {
        popupFuncs.popupPersonWithFormOpener();
    });

    addCardBtn.addEventListener('click', () => {
        popupFuncs.popupPlaceWithFormOpener();
    });



};

/*
@param {strong} position - new card placement rule, can accept values 'head' or 'tail'.
 */
export const addCardToDOM = (cardData, position = 'tail') => {
    const card = new Card(cardData, '#card-template').getCard();
    position === 'tail' ? cardsGrid.append(card) : cardsGrid.prepend(card);
};