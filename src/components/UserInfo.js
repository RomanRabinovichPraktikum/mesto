export default class UserInfo {
    constructor(profileTitleSelector, profileDescriptionSelector) {
        this._profileTitleElement = document.querySelector(profileTitleSelector);
        this._profileDescriptionElement = document.querySelector(profileDescriptionSelector);
    }

    getUserInfo() {
        return {
            title: this._profileTitleElement.textContent,
            description: this._profileDescriptionElement.textContent
        };
    }

    setUserInfo(profileInputSelector, positionInputSelector) {
        this._profileTitleElement.textContent = profileInputSelector.value;
        this._profileDescriptionElement.textContent = positionInputSelector.value;
    }
}