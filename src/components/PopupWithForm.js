import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
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

        this._element.addEventListener('submit', e => {
            e.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close();
        this._element.reset();
    }
}