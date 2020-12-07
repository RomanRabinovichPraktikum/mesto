import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._formElement = this._element.querySelector('form');
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
            this.close();
        });
    }

    close() {
        this._formElement.reset();
        super.close();
    }
}