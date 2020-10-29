import * as Cards from './cards.js';
import {checkInputValidity, toggleButtonState, hideInputError} from './validate.js';

//что ж, в прошлом спринте рекомендовано вынести на глобальный уровень ряд DOM-элементов. Прислушался...
const popupFormPerson = document.querySelector('.popup__form-profile');
const popupFormPlace = document.querySelector('.popup__form-place');
const popupImg   = document.querySelector('.popup__place-img');
const popupLabel = document.querySelector('.popup__place-label');
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const personInputField =  document.querySelector('.popup__input-person');
const positionInputField =  document.querySelector('.popup__input-position');
const placenameInputField = document.querySelector('.popup__input-placename');
const placepicInputField = document.querySelector('.popup__input-placepic');

export const initialize = () => {
    const initializers = [
        {
            'popup' : document.querySelector('.popup_type_person-form'),
            'submitHandler' : handlePersonFormSubmit,
            'openHandler' : openPersonFormPopup
        },
        {
            'popup' : document.querySelector('.popup_type_place-form'),
            'submitHandler' : handlePlaceFormSubmit,
            'openHandler' : openPlaceFormPopup
        },
        {
            'popup' : document.querySelector('.popup_type_place'),
            'openHandler' : openPlacePopup
        }
    ];

    initializers.forEach(initializer => {
        const popup = initializer.popup;

        popup.handleOpen = data => initializer.openHandler(popup, data);

        if (initializer.submitHandler)
            popup.querySelector('form').addEventListener('submit', initializer.submitHandler);

        setupCloseButton(popup);
    });

    setupOverlays();
};

const openPlacePopup = (popup, data) => {
    popupImg.src = data.link;
    popupLabel.textContent = data.name;

    togglePopupVisibility(popup);
};

const openPersonFormPopup = popup => {
    popupFormPerson.reset();
    personInputField.value = profileTitle.textContent;
    positionInputField.value = profileSubTitle.textContent;

    [personInputField, positionInputField].forEach(inputElement =>
        checkInputValidity(popupFormPerson, inputElement, popupFormPerson.params));

    toggleButtonState([personInputField, positionInputField],
        popupFormPerson.querySelector(popupFormPerson.params.submitButtonSelector), popupFormPerson.params);

    togglePopupVisibility(popup);
};

const openPlaceFormPopup = popup => {
    popupFormPlace.reset();

    [placenameInputField, placepicInputField].forEach(inputElement =>
        hideInputError(popupFormPlace, inputElement, popupFormPlace.params));

    toggleButtonState([placenameInputField, placepicInputField],
        popupFormPlace.querySelector(popupFormPlace.params.submitButtonSelector), popupFormPlace.params);

    togglePopupVisibility(popup);
};

const handlePersonFormSubmit = (evt) => {
    evt.preventDefault();

    const form = evt.currentTarget;
    const popup = form.parentNode.parentNode;

    profileTitle.textContent = personInputField.value;
    profileSubTitle.textContent = positionInputField.value;

    togglePopupVisibility(popup);
};

const handlePlaceFormSubmit = (evt) => {
    evt.preventDefault();

    const form = evt.currentTarget;
    const popup = form.parentNode.parentNode;

    const cardData = {
        name: placenameInputField.value,
        link: placepicInputField.value
    };

    Cards.addCard(cardData, 'head');

    togglePopupVisibility(popup);
};


const setupCloseButton = popup => {
    const closeBtn = popup.querySelector('.popup__close-btn');

    closeBtn.addEventListener('click', () => togglePopupVisibility(popup));
};

const setupOverlays = () => {
    const overlays = Array.from(document.querySelectorAll(".popup"));
    overlays.forEach(overlay => {
        overlay.addEventListener('click', evt => {
            if (evt.target === evt.currentTarget|| evt.target.parentNode === evt.currentTarget) {
                const popup = document.querySelector(".popup_opened");
                closePopup(popup);
            }
        }, false);
    });
};

const togglePopupVisibility = popup => {
    if (popup.classList.contains('popup_opened'))
        closePopup(popup);
    else
        openPopup(popup);
};

const openPopup = popup => {
    popup.classList.add('popup_opened');
    document.addEventListener("keyup", escPressHandler);
};

const closePopup = popup => {
    popup.classList.remove('popup_opened');
    document.removeEventListener("keyup", escPressHandler);
};

function escPressHandler(event) {
    if (event.key === "Escape") {
        const popup = document.querySelector('.popup_opened');
        if (popup !== null)
            closePopup(popup);
    }
}