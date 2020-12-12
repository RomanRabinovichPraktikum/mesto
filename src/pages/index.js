import '../pages/index.css';
import Api from "../components/Api";
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
    cardsContainer,
    personInputElement,
    positionInputElement,
    profileEditButtonElement,
    addCardButtonElement,
    cardTemplateSelector,
    profileTitleSelector,
    profileDescriptionSelector,
    profileAvatarSelector,
    personFormPopupSelector,
    placeFormPopupSelector,
    placePopupSelector,
    submitButtonSelector,
    profileFormElement,
    placeFormElement,
    validationParams
} from '../scripts/constants.js';

const cardsList = new Section((card) => {
        const element = createCard(card)
        cardsList.addItem(element);
}, cardsContainer);

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
    headers: {
        authorization: 'df22a34d-0827-4604-b3c3-15999daac8f2',
        'Content-Type': 'application/json'
    }
});

const userInfo = new UserInfo(profileTitleSelector, profileDescriptionSelector, profileAvatarSelector);

api.getUserInfo()
    .then(data => userInfo.setUserInfo(data));

api.getInitialCards().then(data => {
    cardsList.renderItems(data)
});

const personFormPopup = new PopupWithForm(personFormPopupSelector, handlePersonFormSubmit);
const editProfileFormValidator = new FormValidator(validationParams, profileFormElement);
personFormPopup.setEventListeners();
editProfileFormValidator.enableValidation();

const placeFormPopup = new PopupWithForm(placeFormPopupSelector, handlePlaceFormSubmit);
const placeFormValidator = new FormValidator(validationParams, placeFormElement);
placeFormPopup.setEventListeners();
placeFormValidator.enableValidation();

const placePopup = new PopupWithImage(placePopupSelector);
placePopup.setEventListeners();

profileEditButtonElement.addEventListener('click', () => {
    const profileDataFromPage = userInfo.getUserInfo();
    personInputElement.value = profileDataFromPage.title;
    positionInputElement.value = profileDataFromPage.description;
    editProfileFormValidator.checkInputList();
    personFormPopup.open();
});

addCardButtonElement.addEventListener('click', () => {
    placeFormPopup.open();
    placeFormValidator.checkInputList(true);
});

function handlePersonFormSubmit(data) {
    this.updateSubmitButtonText(true);

    api.setUserInfo({name: data.person, about: data.position})
        .then((res) => {
            userInfo.setUserInfo(res);
        })
        .finally(() => {
            this.updateSubmitButtonText(false);
            this.close();
        });
}

function handlePlaceFormSubmit(cardData) {
    this.updateSubmitButtonText(true);

    api.addNewCard({name: cardData.placename, link: cardData.placepic})
        .then((res) => {
            const newCard = createCard({name: cardData.placename, link: cardData.placepic});
            const submitButtonElement = this._element.querySelector(submitButtonSelector);
            submitButtonElement.classList.add(validationParams.inactiveButtonClass);
            cardsContainer.prepend(newCard);
        })
        .finally(() => {
            this.updateSubmitButtonText(false);
            this.close();
        });

}

function createCard(data){
    const card = new Card(data, cardTemplateSelector, handleCardClick);
    const cardElement = card.getCard();
    return cardElement;
}

function handleCardClick(link, name){
    placePopup.open(link, name);
}

