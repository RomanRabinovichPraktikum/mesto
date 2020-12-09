import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import initialCards from '../scripts/initialCards.js';
import {
    cardsContainer,
    personInputElement,
    positionInputElement,
    profileEditButtonElement,
    addCardButtonElement,
    cardTemplateSelector,
    profileTitleSelector,
    profileDescriptionSelector,
    personFormPopupSelector,
    placeFormPopupSelector,
    placePopupSelector,
    submitButtonSelector,
    profileFormElement,
    placeFormElement,
    validationParams
} from '../scripts/constants.js';

const userInfo = new UserInfo(profileTitleSelector, profileDescriptionSelector);

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

function handlePersonFormSubmit() {
    userInfo.setUserInfo(personInputElement, positionInputElement);
    this.close();
}

function handlePlaceFormSubmit (cardData) {
    const newCard = createCard({name: cardData.placename, link: cardData.placepic});
    const submitButtonElement = this._element.querySelector(submitButtonSelector);
    submitButtonElement.classList.add(validationParams.inactiveButtonClass);
    cardsContainer.prepend(newCard);
}

function createCard(data){
    const card = new Card(data, cardTemplateSelector, handleCardClick);
    const cardElement = card.getCard();
    return cardElement;
}

function handleCardClick(link, name){
    placePopup.open(link, name);
}

const cardsList = new Section({
    items: initialCards,
    renderer: (card) => {
        const element = createCard(card)
        cardsList.addItem(element);
    },
}, cardsContainer);

cardsList.renderItems();