window.onload = function() {
    let editBtn = document.querySelector('.profile__edit-button');

    let profileTitle = document.querySelector('.profile__title');
    let profileSubTitle = document.querySelector('.profile__subtitle');
    
    let popup = document.querySelector('.popup');
    let popupPersonField = popup.querySelector('.popup__text-field_role_person');
    let popupPersonPositionField = popup.querySelector('.popup__text-field_role_position');
    let closeBtn = popup.querySelector('.popup__close-btn');
    let popupForm = popup.querySelector('.popup__form');

    const checkPopupVisible = () => {
        return popup.classList.contains('popup_opened');
    }

    const togglePopupVisibility = () => {
        if (checkPopupVisible())
            popup.classList.remove('popup_opened');
        else
            popup.classList.add('popup_opened');
    };

    closeBtn.addEventListener('click', (e) => {
        togglePopupVisibility();
    });

    popupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        profileTitle.textContent = popupPersonField.value;
        profileSubTitle.textContent = popupPersonPositionField.value;
        togglePopupVisibility();
    });


    editBtn.addEventListener('click', (e) => {
        popupPersonField.value = profileTitle.textContent;
        popupPersonPositionField.value = profileSubTitle.textContent;
        togglePopupVisibility();
    });

    //закрываем заодно и по ESC (удобно же ж)
    document.addEventListener("keydown", (e) => {
        e = e || window.event;
        let isEscape = false;

        if ("key" in e) {
            isEscape = (e.key === "Escape" || e.key === "Esc");
        } else {
            isEscape = (e.keyCode === 27);
        }
        
        if (isEscape && checkPopupVisible()) {
            togglePopupVisibility();
        }
    });
};