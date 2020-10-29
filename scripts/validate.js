const showInputError = (formElement, inputElement, errorMessage, params) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(params.inputErrorClass);
    errorElement.classList.add(params.errorClass);
    errorElement.textContent = errorMessage;
};

export const hideInputError = (formElement, inputElement, params) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(params.inputErrorClass);
    errorElement.classList.remove(params.errorClass);
    errorElement.textContent = '';
};

export const checkInputValidity = (formElement, inputElement, params) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, params);
    } else {
        hideInputError(formElement, inputElement, params);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    });
};

export const toggleButtonState = (inputList, buttonElement, params) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(params.inactiveButtonClass);
        buttonElement.setAttribute("disabled", true);
    }
    else {
        buttonElement.classList.remove(params.inactiveButtonClass);
        buttonElement.removeAttribute("disabled");
    }
};

const setEventListeners = (formElement, params) => {
    const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
    const buttonElement = formElement.querySelector(params.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            toggleButtonState(inputList, buttonElement, params);
            checkInputValidity(formElement, inputElement, params);
        });
    });
};

const enableValidation = (params) => {
    const formList = Array.from(document.querySelectorAll(params.formSelector));

    formList.forEach((formElement) => {
        formElement.params = params;
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, params);
    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});

