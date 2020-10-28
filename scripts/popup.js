import * as Cards from './cards.js';

//что ж, в прошлом спринте рекомендовано вынести на глобальный уровень ряд DOM-элементов. Прислушался...
const popupImg   = document.querySelector('.popup__place-img');
const popupLabel = document.querySelector('.popup__place-label');
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const personTextField =  document.querySelector('.popup__text-field-person');
const positionTextField =  document.querySelector('.popup__text-field-position');
const placenameTextField = document.querySelector('.popup__text-field-placename');
const placepicTextField = document.querySelector('.popup__text-field-placepic');

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
};

const openPlacePopup = (popup, data) => {

    popupImg.src = data.link;
    popupLabel.textContent = data.name;

    togglePopupVisibility(popup);
};

const openPersonFormPopup = popup => {
    personTextField.value = profileTitle.textContent;
    positionTextField.value = profileSubTitle.textContent;

    togglePopupVisibility(popup);
};

const openPlaceFormPopup = popup => {
    const form = popup.querySelector('form');
    form.reset();

    togglePopupVisibility(popup);
};

const handlePersonFormSubmit = (evt) => {
    evt.preventDefault();

    const form = evt.currentTarget;
    const popup = form.parentNode.parentNode;
    const textFields = form.querySelectorAll('.popup__text-field');

    profileTitle.textContent = textFields[0].value;
    profileSubTitle.textContent = textFields[1].value;

    togglePopupVisibility(popup);
};

const handlePlaceFormSubmit = (evt) => {
    evt.preventDefault();

    const form = evt.currentTarget;
    const popup = form.parentNode.parentNode;

    const cardData = {
        name: placenameTextField.value,
        link: placepicTextField.value
    };

    Cards.addCard(cardData, 'head');

    togglePopupVisibility(popup);
};


const setupCloseButton = popup => {
    const closeBtn = popup.querySelector('.popup__close-btn');

    closeBtn.addEventListener('click', () => togglePopupVisibility(popup));
};

const togglePopupVisibility = popup => {
    if (popup.classList.contains('popup_opened'))
        closePopup(popup);
    else
        openPopup(popup);
};

const openPopup = popup => {
    popup.classList.add('popup_opened');
    popup.classList.remove('popup_closed');
    document.addEventListener("keyup", function(event) {
        escPressHandler(event, popup)
    });
};

const closePopup = popup => {
    popup.classList.add('popup_closed');
    popup.classList.remove('popup_opened');

    document.removeEventListener("keyup", function(event) {
        escPressHandler(event, popup)
    });
};

function escPressHandler(event, popup) {
    if (event.key === "Escape") {
        closePopup(popup);
    }
}