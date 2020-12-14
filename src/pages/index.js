import '../pages/index.css';
import Api from "../components/Api";
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';

import {
    cardsContainer,
    personInputElement,
    positionInputElement,
    avatarInputElement,
    profileEditButtonElement,
    profileAvatarEditButtonElement,
    addCardButtonElement,
    cardTemplateSelector,
    profileTitleSelector,
    profileDescriptionSelector,
    profileAvatarSelector,
    avatarFormPopupSelector,
    personFormPopupSelector,
    placeFormPopupSelector,
    placePopupSelector,
    submitButtonSelector,
    avatarFormElement,
    profileFormElement,
    placeFormElement,
    validationParams
} from '../scripts/constants.js';
import {confirmFormPopupSelector} from "../scripts/constants";

const cardsList = new Section((card) => {
        const element = createCard(card);
        cardsList.addItem(element);
}, cardsContainer);

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
    headers: {
        authorization: 'df22a34d-0827-4604-b3c3-15999daac8f2',
        'Content-Type': 'application/json'
    }
});

let currentUserId = null;
const userInfo = new UserInfo(profileTitleSelector, profileDescriptionSelector, profileAvatarSelector);

api.getUserInfo()
    .then(data => {
        currentUserId = data._id;
        userInfo.setUserInfo(data)
    })
    .catch(err => console.log(err));

api.getInitialCards()
    .then(data => {
        cardsList.renderItems(data)
    })
    .catch(err => console.log(err));

const personFormPopup = new PopupWithForm(personFormPopupSelector, handlePersonFormSubmit);
const editProfileFormValidator = new FormValidator(validationParams, profileFormElement);
personFormPopup.setEventListeners();
editProfileFormValidator.enableValidation();

const avatarFormPopup = new PopupWithForm(avatarFormPopupSelector, handleAvatarFormSubmit);
const editAvatarFormValidator = new FormValidator(validationParams, avatarFormElement);
avatarFormPopup.setEventListeners();
editAvatarFormValidator.enableValidation();

const placeFormPopup = new PopupWithForm(placeFormPopupSelector, handlePlaceFormSubmit);
const placeFormValidator = new FormValidator(validationParams, placeFormElement);
placeFormPopup.setEventListeners();
placeFormValidator.enableValidation();

const confirmPopup = new PopupWithConfirm(confirmFormPopupSelector, handleConfirmFormSubmit);
confirmPopup.setEventListeners();

const placePopup = new PopupWithImage(placePopupSelector);
placePopup.setEventListeners();

profileEditButtonElement.addEventListener('click', () => {
    const profileDataFromPage = userInfo.getUserInfo();
    personInputElement.value = profileDataFromPage.title;
    positionInputElement.value = profileDataFromPage.description;
    editProfileFormValidator.checkInputList();
    personFormPopup.open();
});

profileAvatarEditButtonElement.addEventListener('click', () => {
    const profileDataFromPage = userInfo.getUserInfo();
    avatarInputElement.value = profileDataFromPage.avatar;
    editProfileFormValidator.checkInputList();
    avatarFormPopup.open();
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
            personFormPopup.close();
        })
        .catch(err => console.log(err))
        .finally(() => {
            personFormPopup.updateSubmitButtonText(false);
        });
}

function handleAvatarFormSubmit(data) {
    this.updateSubmitButtonText(true);

    api.updateUserAvatar(data)
        .then((res) => {
            userInfo.setUserInfo(res);
            avatarFormPopup.close();
        })
        .catch(err => console.log(err))
        .finally(() => {
            avatarFormPopup.updateSubmitButtonText(false);
        });
}

function handlePlaceFormSubmit(cardData) {
    this.updateSubmitButtonText(true);

    api.addNewCard({name: cardData.placename, link: cardData.placepic})
        .then((res) => {
            const newCard = createCard(res);
            const submitButtonElement = this._element.querySelector(submitButtonSelector);
            submitButtonElement.classList.add(validationParams.inactiveButtonClass);
            cardsContainer.prepend(newCard);
            placeFormPopup.close();
        })
        .catch(err => console.log(err))
        .finally(() => {
            placeFormPopup.updateSubmitButtonText(false);
        });

}

function handleConfirmFormSubmit(cardData) {
    api.deleteCard(cardData)
        .then((res) => {
            document.getElementById(cardData._id).remove();
            confirmPopup.close();
        })
        .catch(err => console.log(err));
}

function createCard(data) {
    const card = new Card(data, cardTemplateSelector, currentUserId,
        {handleCardClick, handleTrashButtonClick, handleLike, handleDislike});
    const cardElement = card.getCard();
    return cardElement;
}

function handleCardClick(data){
    placePopup.open(data);
}

function handleTrashButtonClick(data) {
    confirmPopup.open(data);
}

function handleLike(data) {
    const card = this;

    api.likeCard(data)
        .then((data) => {
            card.updateData(data);
        })
        .catch(err => console.log(err));
}

function handleDislike(data) {
    const card = this;

    api.dislikeCard(data)
        .then((data) => {
            card.updateData(data);
        })
        .catch(err => console.log(err));
}
