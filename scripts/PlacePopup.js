import Popup from "./Popup.js";

class PlacePopup extends Popup {
    constructor() {
        super('.popup_type_place');
        this._popupImg  = document.querySelector('.popup__place-img');
        this._popupLabel = document.querySelector('.popup__place-label');
    }

    setData(data) {
        this._popupImg.src = data.link;
        this._popupLabel.textContent = data.name;
    }

}

// раз попап перманентно присутствует в разметке,
// однократно создадим его объект и передадим наружу
export default new PlacePopup();