import Popup from "./Popup.js";

class PersonFormPopup extends Popup {
    constructor() {
        super('.popup_type_person-form');

        this._popupForm = document.querySelector('.popup__form-profile');
        this._personInputField =  document.querySelector('.popup__input-person');
        this._positionInputField =  document.querySelector('.popup__input-position');
        this._profileTitle = document.querySelector('.profile__title');
        this._profileSubTitle = document.querySelector('.profile__subtitle');

        super._setupValidation();
        super._setupSubmitHandler();
    }

    _handleFormSubmit() {
        this._profileTitle.textContent = this._personInputField.value;
        this._profileSubTitle.textContent = this._positionInputField.value;
        this.close();
    }

    open() {
        this._popupForm.reset();
        this._personInputField.value = this._profileTitle.textContent;
        this._positionInputField.value = this._profileSubTitle.textContent;

        this._validator.checkInputList([this._personInputField, this._positionInputField]);

        super.open();
    }
}

// раз попап перманентно присутствует в разметке,
// однократно создадим его объект и передадим наружу
export default new PersonFormPopup();