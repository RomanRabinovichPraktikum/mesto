import FormValidator from "./FormValidator.js";

export default class Popup {
    constructor(selector) {
        this._popupElement = document.querySelector(selector);
        this._closeBtn = this._popupElement.querySelector('.popup__close-btn');
        this._setupCloseButton();
        this._setupOverlay();

        // заполняем хранилище ссылок
        Popup.popupsArr.push(this);
    }

    //метод применим только к двум из трёх типов попапов, но всё же лучше, чем плодить в дочерних однотипные
    _setupValidation() {
        this._validator = new FormValidator({
            formSelector: '.popup__form',
            inputSelector: '.popup__input',
            submitButtonSelector: '.popup__button',
            inactiveButtonClass: 'popup__button_disabled',
            inputErrorClass: 'popup__input_type_error',
            errorClass: 'popup__error_visible'
        }, this._popupForm);

        this._validator.enableValidation();
    }

    //метод применим только к двум из трёх типов попапов, но всё же лучше, чем плодить в дочерних однотипные
    _setupSubmitHandler() {
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit();
        });
    }

    _setupCloseButton() {
        this._closeBtn.addEventListener('click', () => this._togglePopupVisibility());
    };

    _setupOverlay() {
        this._popupElement.addEventListener('click', evt => {
            if (evt.target === evt.currentTarget|| evt.target.parentNode === evt.currentTarget) {
                this.close();
            }
        }, false);
    };

    _togglePopupVisibility() {
        if (this._popupElement.classList.contains('popup_opened'))
            this.close();
        else
            this.open();
    };

    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener("keyup", Popup.escPressHandler);
    };

    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener("keyup", Popup.escPressHandler);
    };

}

// статический член класса, реализует хранилище ссылок на все 3 экземпляра попапов (заполняется в конструкторе),
// а используется в обработчике клика ESC
Popup.popupsArr = [];

//статический метод. закроет все открытые попапы
Popup.escPressHandler = (evt) => {
    if (evt.key === "Escape") {
        Popup.popupsArr.forEach(item => item.close());
    }
};