import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._formElement = this._element.querySelector('form');
    }

    setEventListeners() {
        super.setEventListeners();

        this._formElement.addEventListener('submit', e => {
            e.preventDefault();
            this._handleFormSubmit(this._data);
        });
    }

    open(data) {
        this._data = data;
        super.open();
    }
}