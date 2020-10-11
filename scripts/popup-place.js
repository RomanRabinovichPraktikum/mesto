import * as Cards from './cards.js';

export const initialize = () => {
    const popupTemplate = document.getElementById('popup-place-template').content;

    const popup = popupTemplate.cloneNode(true);
    popup.rootElement = popup.querySelector('.popup');
    popup.rootElement.id = 'popupPlace';

    setupPopup(popup);

    const pageBody = document.querySelector('body');
    pageBody.append(popup);
};

const setupPopup = popup => {
    const popupContainer = popup.querySelector('.popup__container');
    popupContainer.classList.add('popup__container_role_place');

    setupOpenHandler(popup);
    setupCloseButton(popup);
};

const setupOpenHandler = popup => {
    popup.rootElement.handleOpen = function(cardData) {
        const popupImg = this.querySelector('.popup__place-img');
        const popupLabel = this.querySelector('.popup__place-label');

        popupImg.src = cardData.link;
        popupLabel.textContent = cardData.name;

        togglePopupVisibility(this);
    };
};

const setupCloseButton = popup => {
    const closeBtn = popup.querySelector('.popup__close-btn');

    closeBtn.addEventListener('click', () => {
        togglePopupVisibility(popup.rootElement);
    });
};

const togglePopupVisibility = rootElement => {
    if (rootElement.classList.contains('popup_opened')) {
        rootElement.classList.add('popup_closed');
        rootElement.classList.remove('popup_opened');
    }
    else {
        rootElement.classList.add('popup_opened');
        rootElement.classList.remove('popup_closed');
    }
};