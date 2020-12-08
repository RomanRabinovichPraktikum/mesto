import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
    open({link, name}) {
        super.open();

        const popupImg   = this._element.querySelector('.popup__place-img');
        const popupLabel = this._element.querySelector('.popup__place-label');

        popupImg.src = link;
        popupImg.alt = name;
        popupLabel.textContent = name;
    }
}