import FormValidator from "./FormValidator.js";
import {appendCardToDOM} from "./index.js";

//откатил по рекомендации ревьювера к прежней "бесклассовой" версии
export const popupPersonWithForm = document.querySelector('.popup_type_person-form');
export const popupPlaceWithForm = document.querySelector('.popup_type_place-form');
export const popupPlace = document.querySelector('.popup_type_place');
const formPerson = document.querySelector('.popup__form-profile');
const formPlace = document.querySelector('.popup__form-place');
const popupImg   = document.querySelector('.popup__place-img');
const popupLabel = document.querySelector('.popup__place-label');
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const personInputField =  document.querySelector('.popup__input-person');
const positionInputField =  document.querySelector('.popup__input-position');
const placenameInputField = document.querySelector('.popup__input-placename');
const placepicInputField = document.querySelector('.popup__input-placepic');

export const initialize = () => {
    setupCloseButtons();
    setupOverlays();

    const validationParams = {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    };

    formPerson.addEventListener('submit', handlePersonFormSubmit);
    formPerson.validator = new FormValidator(validationParams, formPerson);
    formPerson.validator.enableValidation();

    formPlace.addEventListener('submit', handlePlaceFormSubmit);
    formPlace.validator = new FormValidator(validationParams, formPlace);
    formPlace.validator.enableValidation();

};


export const popupPlaceOpener = (data) => {
    popupImg.src = data.link;
    popupLabel.textContent = data.name;
    togglePopupVisibility(popupPlace);
};

export const popupPersonWithFormOpener = () => {
    formPerson.reset();
    personInputField.value = profileTitle.textContent;
    positionInputField.value = profileSubTitle.textContent;
    formPerson.validator.checkInputList([personInputField, positionInputField]);

    togglePopupVisibility(popupPersonWithForm);
};

export const popupPlaceWithFormOpener = () => {
    formPlace.reset();
    formPlace.validator.checkInputList([placenameInputField, placepicInputField], true);
    togglePopupVisibility(popupPlaceWithForm);
};

const handlePersonFormSubmit = (evt) => {
    evt.preventDefault();

    profileTitle.textContent = personInputField.value;
    profileSubTitle.textContent = positionInputField.value;

    togglePopupVisibility(popupPersonWithForm);
};

const handlePlaceFormSubmit = (evt) => {
    evt.preventDefault();

    const cardData = {
        name: placenameInputField.value,
        link: placepicInputField.value
    };

    appendCardToDOM(cardData, 'head');

    togglePopupVisibility(popupPlaceWithForm);
};


const setupCloseButtons = () => {
    const closeButtons = document.querySelectorAll('.popup__close-btn');

    closeButtons.forEach(btn => {
        const popup = btn.parentNode.parentNode.parentNode;
        btn.addEventListener('click', () => togglePopupVisibility(popup));
    });
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