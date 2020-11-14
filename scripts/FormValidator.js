export default class FormValidator {
    constructor(params, formElement) {
        this._formElement = formElement;
        this._params = params;
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

    _hasInvalidInput(inputList) {
        return inputList.some(inputElement => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState (inputList) {
        const buttonElement = this._formElement.querySelector(this._params.submitButtonSelector);

        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._params.inactiveButtonClass);
            buttonElement.setAttribute("disabled", true);
        }
        else {
            buttonElement.classList.remove(this._params.inactiveButtonClass);
            buttonElement.removeAttribute("disabled");
        }
    }

    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._params.inputSelector));

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._toggleButtonState(inputList, this._params);
                this._checkInputValidity(inputElement, this._params);
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

    checkInputList(inputList, hideErrors = false) {
        inputList.forEach(inputElement => {
            if (!hideErrors)
                this._checkInputValidity(inputElement);
            else
                this._hideInputError(inputElement);
        });


        this._toggleButtonState(inputList);
    }

    enableValidation() {
        this._formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners();
    };
}










