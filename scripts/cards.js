export const initialize = () => {
    const initialCards = [
        {
            name: 'Архыз',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
        },
        {
            name: 'Челябинская область',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
        },
        {
            name: 'Иваново',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
        },
        {
            name: 'Камчатка',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
        },
        {
            name: 'Холмогорский район',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
        },
        {
            name: 'Байкал',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
        }
    ];

    initialCards.forEach(elem => createNewCard(elem));
};

/*
@param {strong} position - new card placement rule, can accept values 'head' or 'tail'.
 */
export const createNewCard = (cardData, position = 'tail') => {
    const cardsGrid = document.querySelector('.grid');

    const cardTemplate = document.getElementById('card-template').content;
    const cardObj = cardTemplate.cloneNode(true);
    const cardImg = cardObj.querySelector('.grid-item__photo');
    const cardTitle = cardObj.querySelector('.grid-item__title');
    const likeButton = cardObj.querySelector('.grid-item__like-btn');

    cardImg.src = cardData.link;
    cardImg.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    position === 'tail' ? cardsGrid.append(cardObj) : cardsGrid.prepend(cardObj);

    likeButton.addEventListener('click', e => {
        const currentButton = e.currentTarget;
        currentButton.classList.add('grid-item__like-btn_liked');
    });
};

