import placePopupObj from "./PlacePopup.js";

export default class Card {
    constructor(data, selector) {
        this._selector = selector;
        this._name = data.name;
        this._link = data.link;
    }

    _getTemplate() {
        const template = document
            .querySelector(this._selector);

        return template;
    }

    _generateCard() {

        this._card = this._getTemplate().content
            .querySelector('.grid-item')
            .cloneNode(true);

        this._cardImg = this._card.querySelector('.grid-item__photo');
        this._cardTitle = this._card.querySelector('.grid-item__title');
        this._likeButton = this._card.querySelector('.grid-item__like-btn');
        this._trashButton = this._card.querySelector('.grid-item__trash-btn');

        this._cardImg.src = this._link;
        this._cardImg.alt = this._name;
        this._cardTitle.textContent = this._name;

        return this._card;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', this._handleLikeButtonClick);
        this._trashButton.addEventListener('click', this._handleTrashButtonClick);
        this._cardImg.addEventListener('click', () => this._handleCardImgClick({name: this._name, link: this._link}));
    }

    _handleLikeButtonClick(e) {
        const currentButton = e.currentTarget;
        currentButton.classList.toggle('grid-item__like-btn_liked');
    };

    _handleTrashButtonClick(e) {
        const currentButton = e.currentTarget;
        currentButton.parentNode.remove();
    }

    _handleCardImgClick(data) {
        placePopupObj.setData(data);
        placePopupObj.open();
    };


    getCard() {
        this._generateCard();
        this._setEventListeners();
        return this._card;
    }
}

/*
@param {strong} position - new card placement rule, can accept values 'head' or 'tail'.
 */
export const appendCardToDom = (cardData, position = 'tail') => {
    const cardsGrid = document.querySelector('.grid');
    const card = new Card(cardData, '#card-template').getCard();
    position === 'tail' ? cardsGrid.append(card) : cardsGrid.prepend(card);
};
