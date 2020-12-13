export default class Card {
    constructor(data, selector, currentUserId, {handleCardClick, handleTrashButtonClick}) {
        this._data = data;
        this._selector = selector;
        this._currentUserId = currentUserId;
        this._handleCardClick = handleCardClick;
        this._handleTrashButtonClick = handleTrashButtonClick;
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
        this._card.setAttribute('id', this._data._id);
        this._cardImg = this._card.querySelector('.grid-item__photo');
        this._nameElement = this._card.querySelector('.grid-item__title');
        this._likeButton = this._card.querySelector('.grid-item__like-btn');
        this._trashButton = this._card.querySelector('.grid-item__trash-btn');

        this._cardImg.src = this._data.link;
        this._cardImg.alt = this._data.name;
        this._nameElement.textContent = this._data.name;

        this._setTrashButtonVisibility();

        return this._card;
    }

    _setTrashButtonVisibility() {
        if (!this._checkIsOwnCard()) {
            this._trashButton.remove();
        }
    }

    _checkIsOwnCard() {
        return this._data.owner._id === this._currentUserId;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', this._handleLikeButtonClick);
        this._trashButton.addEventListener('click',
            () => this._handleTrashButtonClick(this._data));
        this._cardImg.addEventListener('click',
            () => this._handleCardClick(this._data));
    }

    _handleLikeButtonClick(e) {
        const currentButton = e.currentTarget;
        currentButton.classList.toggle('grid-item__like-btn_liked');
    };

    getCard() {
        this._generateCard();
        this._setEventListeners();
        return this._card;
    }
}
