window.onload = function() {
    let editBtn = document.querySelector('.profile__edit-button');

    let profileTitle = document.querySelector('.profile__title');
    let profileSubTitle = document.querySelector('.profile__subtitle');
    
    let popup = document.querySelector('.popup');
    let popupFirstNameField = popup.querySelector('.popup__first-name');
    let popupPersonPosition = popup.querySelector('.popup__person-position');
    let closeBtn = popup.querySelector('.popup__close-btn');
    let popupForm = popup.querySelector('.popup__form');

    const togglePopupVisibility = () => {
        if (popup.classList.contains('popup_opened'))
            popup.classList.remove('popup_opened');
        else
            popup.classList.add('popup_opened');
    };

    closeBtn.addEventListener('click', (e) => {
        togglePopupVisibility();
    });

    popupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        profileTitle.textContent = popupFirstNameField.value;
        profileSubTitle.textContent = popupPersonPosition.value;
        togglePopupVisibility();
    });


    editBtn.addEventListener('click', (e) => {
        popupFirstNameField.value = profileTitle.textContent;
        popupPersonPosition.value = profileSubTitle.textContent;
        togglePopupVisibility();
    });

};