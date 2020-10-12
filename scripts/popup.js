import * as Cards from './cards.js';

export const initialize = () => {
    const initializers = [
        {
            'selector' : '.popup_type_person-form',
            'submitHandler' : handlePersonFormSubmit,
            'openHandler' : openPersonFormPopup
        },
        {
            'selector' : '.popup_type_place-form',
            'submitHandler' : handlePlaceFormSubmit,
            'openHandler' : openPlaceFormPopup
        },
        {
            'selector' : '.popup_type_place',
            'openHandler' : openPlacePopup
        }
    ];

    initializers.forEach(initializer => {
        const popup = document.querySelector(initializer.selector);
        popup.handleOpen = data => initializer.openHandler(popup, data);

        if (initializer.submitHandler)
            popup.querySelector('form').addEventListener('submit', initializer.submitHandler);

        setupCloseButton(popup);
    });
};

const openPlacePopup = (popup, data) => {
    const popupImg = popup.querySelector('.popup__place-img');
    const popupLabel = popup.querySelector('.popup__place-label');

    popupImg.src = data.link;
    popupLabel.textContent = data.name;

    togglePopupVisibility(popup);
};

const openPersonFormPopup = popup => {
    const textFields = popup.querySelectorAll('.popup__text-field');

    const profileTitle = document.querySelector('.profile__title');
    const profileSubTitle = document.querySelector('.profile__subtitle');

    textFields[0].value = profileTitle.textContent;
    textFields[1].value = profileSubTitle.textContent;

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
    const profileTitle = document.querySelector('.profile__title');
    const profileSubTitle = document.querySelector('.profile__subtitle');

    profileTitle.textContent = textFields[0].value;
    profileSubTitle.textContent = textFields[1].value;

    togglePopupVisibility(popup);
};

const handlePlaceFormSubmit = (evt) => {
    evt.preventDefault();

    const form = evt.currentTarget;
    const popup = form.parentNode.parentNode;
    const textFields = form.querySelectorAll('.popup__text-field');

    const cardData = {
        name: textFields[0].value,
        link: textFields[1].value
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
};

const closePopup = popup => {
    popup.classList.add('popup_closed');
    popup.classList.remove('popup_opened');
};
