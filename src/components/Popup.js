export default class Popup {
    constructor(selector) {
        this._element = document.querySelector(selector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this.setEventListeners = this.setEventListeners.bind(this);
    }

    open() {
        this._element.classList.add('popup_opened');
        document.addEventListener("keyup", this._handleEscClose);
    }

    close() {
        this._element.classList.remove('popup_opened');
        document.removeEventListener("keyup", this._handleEscClose);
    }

    _handleEscClose(e) {
        e.preventDefault();
        if (e.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        this._element.addEventListener("click", (e) => {
            if (e.target.classList.contains("popup__close-btn")) {
                this.close();
            }
        });

        this._element.addEventListener('click', e => {
            if (e.target === e.currentTarget || e.target.parentNode === e.currentTarget) {
                this.close();
            }
        }, false);
    }
}