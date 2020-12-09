import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);

        this._popupImg   = this._element.querySelector('.popup__place-img');
        this._popupLabel = this._element.querySelector('.popup__place-label');
    }

    open({link, name}) {
        super.open();

        this._popupImg.src = link;
        this._popupImg.alt = name;
        this._popupLabel.textContent = name;
    }
}