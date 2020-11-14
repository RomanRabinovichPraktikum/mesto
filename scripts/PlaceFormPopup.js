import Popup from "./Popup.js";
import {appendCardToDom} from "./Card.js";

class PlaceFormPopup extends Popup {
    constructor() {
        super('.popup_type_place-form');

        this._popupForm = document.querySelector('.popup__form-place');
        this._placenameInputField = document.querySelector('.popup__input-placename');
        this._placepicInputField = document.querySelector('.popup__input-placepic');

        super._setupValidation();
        super._setupSubmitHandler();
    }

    _handleFormSubmit() {
        const cardData = {
            name: this._placenameInputField.value,
            link: this._placepicInputField.value
        };

        appendCardToDom(cardData, 'head');

        this.close();
    }

    open() {
        this._popupForm.reset();
        this._validator.checkInputList([this._placenameInputField, this._placepicInputField], true);
        super.open();
    }
}

// раз попап перманентно присутствует в разметке,
// однократно создадим его объект и передадим наружу
export default new PlaceFormPopup();