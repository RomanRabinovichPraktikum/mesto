import * as Cards from './cards.js'

window.onload = function() {
    Cards.initializeCards();

    let editBtn = document.querySelector('.profile__edit-button');

    let profileTitle = document.querySelector('.profile__title');
    let profileSubTitle = document.querySelector('.profile__subtitle');
    
    let popup = document.querySelector('.popup');
    let popupPersonField = popup.querySelector('.popup__text-field_role_person');
    let popupPersonPositionField = popup.querySelector('.popup__text-field_role_position');
    let closeBtn = popup.querySelector('.popup__close-btn');
    let popupForm = popup.querySelector('.popup__form');

    const togglePopupVisibility = () => {
        if (popup.classList.contains('popup_opened'))
            popup.classList.remove('popup_opened');
        else
            popup.classList.add('popup_opened');
    };

    closeBtn.addEventListener('click', () => {
        togglePopupVisibility();
    });

    popupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        profileTitle.textContent = popupPersonField.value;
        profileSubTitle.textContent = popupPersonPositionField.value;
        togglePopupVisibility();
    });


    editBtn.addEventListener('click', () => {
        popupPersonField.value = profileTitle.textContent;
        popupPersonPositionField.value = profileSubTitle.textContent;
        togglePopupVisibility();
    });

};