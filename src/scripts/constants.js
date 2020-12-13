export const cardTemplateSelector = "#card-template";
export const profileTitleSelector = ".profile__title";
export const profileDescriptionSelector = ".profile__subtitle";
export const profileAvatarSelector = ".profile__avatar";
export const personInputSelector = ".popup__input-person";
export const positionInputSelector = ".popup__input-position";
export const avatarInputSelector = ".popup__input-avatar";
export const avatarFormPopupSelector = ".popup_type_avatar-form";
export const personFormPopupSelector = ".popup_type_person-form";
export const placeFormPopupSelector = ".popup_type_place-form";
export const confirmFormPopupSelector = ".popup_type_confirm-form";
export const placePopupSelector = ".popup_type_place";
export const submitButtonSelector = ".popup__button";
export const avatarFormSelector = ".popup__form-avatar";
export const profileFormSelector = ".popup__form-profile";
export const placeFormSelector = ".popup__form-place";
export const profileEditButtonSelector = ".profile__edit-button";
export const profileAvatarEditButtonSelector = ".profile__avatar-edit-button";
export const addCardButtonSelector = ".profile__add-button";

export const cardsContainer = document.querySelector(".grid");
export const profileAvatarElement = document.querySelector(profileAvatarSelector);
export const personInputElement = document.querySelector(personInputSelector);
export const positionInputElement = document.querySelector(positionInputSelector);
export const avatarInputElement = document.querySelector(avatarInputSelector);
export const avatarFormElement = document.querySelector(avatarFormSelector);
export const profileFormElement = document.querySelector(profileFormSelector);
export const placeFormElement = document.querySelector(placeFormSelector);

export const profileEditButtonElement = document.querySelector(profileEditButtonSelector);
export const profileAvatarEditButtonElement = document.querySelector(profileAvatarEditButtonSelector);
export const addCardButtonElement = document.querySelector(addCardButtonSelector);

export const validationParams = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};
