import * as PopupPlace from './popup-place.js';

const createCard = (cardData) => {
    const cardTemplate = document.getElementById('card-template').content;
    const card = cardTemplate.cloneNode(true);
    const cardImg = card.querySelector('.grid-item__photo');
    const cardTitle = card.querySelector('.grid-item__title');
    const likeButton = card.querySelector('.grid-item__like-btn');
    const trashButton = card.querySelector('.grid-item__trash-btn');

    cardImg.src = cardData.link;
    cardImg.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    likeButton.addEventListener('click', handleLikeButtonClick);

    trashButton.addEventListener('click', handleTrashButtonClick);

    cardImg.addEventListener('click', handleCardImgClick.bind(null, cardData));

    return card;
};

const handleLikeButtonClick = e => {
    const currentButton = e.currentTarget;
    currentButton.classList.toggle('grid-item__like-btn_liked');
};

const handleTrashButtonClick = e => {
    const currentButton = e.currentTarget;
    currentButton.parentNode.remove();
};

const handleCardImgClick = (cardData) => {
    const popupPlace = document.getElementById('popupPlace');
    popupPlace.handleOpen(cardData);
};

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

    initialCards.forEach(elem => addCard(elem));
};

/*
@param {strong} position - new card placement rule, can accept values 'head' or 'tail'.
 */
export const addCard = (cardData, position = 'tail') => {
    const cardsGrid = document.querySelector('.grid');
    const card = createCard(cardData);
    position === 'tail' ? cardsGrid.append(card) : cardsGrid.prepend(card);
};