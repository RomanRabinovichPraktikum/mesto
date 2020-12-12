import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._formElement = this._element.querySelector('form');
        this._submitButton = this._formElement.querySelector('.popup__button');
        this._initialSubmitButtonStateText = this._submitButton.textContent;
    }

    _getInputValues() {
        const inputValues = {};
        this._element.querySelectorAll(".popup__input").forEach(element => {
            inputValues[element.name] = element.value;
        });
        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();

        this._formElement.addEventListener('submit', e => {
            e.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        this._formElement.reset();
        super.close();
    }

    updateSubmitButtonText(isSaveMode) {
        const dynamicSubmitButtonStateText = "Сохранение...";

        this._submitButton.textContent = (isSaveMode) ?
             dynamicSubmitButtonStateText : this._initialSubmitButtonStateText;
    }
}