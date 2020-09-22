window.onload = function() {
    let editBtn = document.querySelector('.profile__edit-button');

    let profileTitle = document.querySelector('.profile__title');
    let profileSubTitle = document.querySelector('.profile__subtitle');
    
    let popup = document.querySelector('.popup');
    let popupFirstNameField = popup.querySelector('.popup__first-name');
    let popupPersonPosition = popup.querySelector('.popup__person-position');
    let closeBtn = popup.querySelector('.popup__close-btn');
    let submitBtn = popup.querySelector('.popup__submit-button');


    closeBtn.addEventListener('click', () => {
        popup.classList.remove('popup_opened');
    });

    submitBtn.addEventListener('click', () => {        
        profileTitle.textContent = popupFirstNameField.value;
        profileSubTitle.textContent = popupPersonPosition.value;
        popup.classList.remove('popup_opened');
    });


    editBtn.addEventListener('click', () => {
        let profileTitleText = profileTitle.textContent;
        let profileSubTitleText = profileSubTitle.textContent;
                
        popupFirstNameField.value = profileTitleText;
        popupPersonPosition.value = profileSubTitleText;

        popup.classList.add('popup_opened');
    });

};