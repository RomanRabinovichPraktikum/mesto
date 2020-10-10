import * as Cards from './cards.js';

export const initialize = () => {
    const popupTemplate = document.getElementById('popup-template').content;

    const personPopup = popupTemplate.cloneNode(true);
    personPopup.title = 'Редактировать профиль';
    personPopup.submitButtonText = 'Сохранить';

    personPopup.textFieldsData = {
        placeholders: ['Исследователь', 'Дополнительно'],
        classes: ['popup__text-field_role_person', 'popup__text-field_role_position'],
        names: ['person', 'position']
    };

    personPopup.rootElement = personPopup.querySelector('.popup');
    personPopup.rootElement.id = 'personPopup';

    const newPlacePopup = popupTemplate.cloneNode(true);
    newPlacePopup.title = 'Новое место';
    newPlacePopup.submitButtonText = 'Создать';
    newPlacePopup.textFieldsData = {
        placeholders: ['Название места', 'Ссылка на картинку'],
        classes: ['popup__text-field_role_placename', 'popup__text-field_role_placepic'],
        names: ['placename', 'placepic']
    };

    newPlacePopup.rootElement = newPlacePopup.querySelector('.popup');
    newPlacePopup.rootElement.id = 'newPlacePopup';

    const popupsArr = [personPopup , newPlacePopup];

    const pageBody = document.querySelector('body');

    popupsArr.forEach(popup => {
        setupPopup(popup);
        pageBody.append(popup);
    });
};

const setupPopup = popup => {
    setupOpenHandler(popup);
    setupTitle(popup);
    setupTextFields(popup);
    setupFormSubmission(popup);
    setupSubmitButton(popup);
    setupCloseButton(popup);
};

const setupOpenHandler = popup => {
    if (popup.rootElement.id === 'personPopup') {
        popup.rootElement.handleOpen = function() {
            const profileTitle = document.querySelector('.profile__title');
            const profileSubTitle = document.querySelector('.profile__subtitle');
            const textFields = this.querySelectorAll('.popup__text-field')

            textFields[0].value = profileTitle.textContent;
            textFields[1].value = profileSubTitle.textContent;
            togglePopupVisibility(this);
        };
    }
    else if (popup.rootElement.id === 'newPlacePopup') {
        popup.rootElement.handleOpen = function() {
            const textFields = this.querySelectorAll('.popup__text-field')

            textFields[0].value = '';
            textFields[1].value = '';
            togglePopupVisibility(this);
        };
    }
};

const setupTitle = popup => {
    const popupTitle = popup.querySelector('.popup__title');
    popupTitle.textContent = popup.title;
};

const setupTextFields = popup => {
    const textFields = popup.querySelectorAll('.popup__text-field')

    for (let i = 0; i < textFields.length; i++) {
        textFields[i].classList.add(popup.textFieldsData.classes[i]);
        textFields[i].setAttribute('name', popup.textFieldsData.names[i]);
        textFields[i].placeholder = popup.textFieldsData.placeholders[i];
    }
};

const setupFormSubmission = popup => {
    const rootElement = popup.rootElement;
    const form = popup.querySelector('form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const textFields = rootElement.querySelectorAll('.popup__text-field')

        if (rootElement.id === 'personPopup') {
            const profileTitle = document.querySelector('.profile__title');
            const profileSubTitle = document.querySelector('.profile__subtitle');

            profileTitle.textContent = textFields[0].value;
            profileSubTitle.textContent = textFields[1].value;
        }
        else if (rootElement.id === 'newPlacePopup') {
            const cardData = {
                name: textFields[0].value,
                link: textFields[1].value
            };

            Cards.createNewCard(cardData, 'head');
        }

        togglePopupVisibility(popup.rootElement);
    });

}

const setupSubmitButton = popup => {
    const submitButton = popup.querySelector('.popup__submit-button');
    submitButton.textContent = popup.submitButtonText;
};

const setupCloseButton = popup => {
    const closeBtn = popup.querySelector('.popup__close-btn');

    closeBtn.addEventListener('click', () => {
        togglePopupVisibility(popup.rootElement);
    });
};

const togglePopupVisibility = rootElement => {
    if (rootElement.classList.contains('popup_opened'))
        rootElement.classList.remove('popup_opened');
    else
        rootElement.classList.add('popup_opened');
};