import * as Cards from './cards.js';

export const initialize = () => {
    const popups = Array.from(document.querySelectorAll('.popup'));

    popups.forEach(popup => {
        setOpenHandler(popup);

        if (isFormPopup(popup)) {
            setFormSubmitHandler(popup);
        }

        setupCloseButton(popup);
    });
};

const isPersonForm = popup => popup.classList.contains('popup_type_person-form');
const isPlaceForm = popup => popup.classList.contains('popup_type_place-form');
const isFormPopup = popup => isPersonForm(popup) || isPlaceForm(popup);
const isPlacePopup = popup => popup.classList.contains('popup_type_place');

const setOpenHandler = popup => {
    popup.handleOpen = (data) => {
        if (isFormPopup(popup)) {
            fillPopupForm(popup);
        }
        else if (isPlacePopup(popup)) {
            const popupImg = popup.querySelector('.popup__place-img');
            const popupLabel = popup.querySelector('.popup__place-label');

            popupImg.src = data.link;
            popupLabel.textContent = data.name;
        }

        togglePopupVisibility(popup);
    }
};

const fillPopupForm = popup => {
    const textFields = popup.querySelectorAll('.popup__text-field');

    if (isPersonForm(popup)) {
        const profileTitle = document.querySelector('.profile__title');
        const profileSubTitle = document.querySelector('.profile__subtitle');

        textFields[0].value = profileTitle.textContent;
        textFields[1].value = profileSubTitle.textContent;
    }
    else if (isPlaceForm(popup)) {
        popup.querySelector('form').reset();
    }
};

const setFormSubmitHandler = popup => {
    const form = popup.querySelector('form');

    if (form === null)
        return;

    const textFields = popup.querySelectorAll('.popup__text-field');

    form.addEventListener('submit', e => {
        e.preventDefault();

        if (isPersonForm(popup)) {
            const profileTitle = document.querySelector('.profile__title');
            const profileSubTitle = document.querySelector('.profile__subtitle');

            profileTitle.textContent = textFields[0].value;
            profileSubTitle.textContent = textFields[1].value;
        }
        else if (isPlaceForm(popup)) {
            const cardData = {
                name: textFields[0].value,
                link: textFields[1].value
            };

            Cards.addCard(cardData, 'head');
        }

        togglePopupVisibility(popup);
    });
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
