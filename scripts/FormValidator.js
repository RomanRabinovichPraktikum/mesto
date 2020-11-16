export default class FormValidator {
    constructor(params, formElement) {
        this._formElement = formElement;
        this._params = params;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._params.inputSelector));
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._params.inputErrorClass);
        errorElement.classList.add(this._params.errorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._params.inputErrorClass);
        errorElement.classList.remove(this._params.errorClass);
        errorElement.textContent = '';
    }

    _hasInvalidInput() {
        return this._inputList.some(inputElement => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState () {
        const buttonElement = this._formElement.querySelector(this._params.submitButtonSelector);

        if (this._hasInvalidInput()) {
            buttonElement.classList.add(this._params.inactiveButtonClass);
            buttonElement.setAttribute("disabled", true);
        }
        else {
            buttonElement.classList.remove(this._params.inactiveButtonClass);
            buttonElement.removeAttribute("disabled");
        }
    }

    _setEventListeners() {
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._toggleButtonState();
                this._checkInputValidity(inputElement);
            });
        });
    };

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    checkInputList(hideErrors = false) {
        this._inputList.forEach(inputElement => {
            if (!hideErrors)
                this._checkInputValidity(inputElement);
            else
                this._hideInputError(inputElement);
        });


        this._toggleButtonState();
    }

    enableValidation() {
        this._formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners();
    };
}










