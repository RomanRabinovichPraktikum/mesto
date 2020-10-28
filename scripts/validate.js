const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_visible');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';
};

export const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const setEventListeners = (formElement, params) => {
    const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
    const buttonElement = formElement.querySelector(params.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            toggleButtonState(inputList, buttonElement);
            checkInputValidity(formElement, inputElement);
        });
    });
};

const enableValidation = (params) => {
    const formList = Array.from(document.querySelectorAll(params.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, params);
    });
};

const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    });
};

export const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__button_disabled');
        buttonElement.setAttribute("disabled", true);
    }
    else {
        buttonElement.classList.remove('popup__button_disabled');
        buttonElement.removeAttribute("disabled");
    }
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});
