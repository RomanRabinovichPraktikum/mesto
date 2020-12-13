export default class UserInfo {
    constructor(profileTitleSelector, profileDescriptionSelector, profileAvatarSelector) {
        this._profileTitleElement = document.querySelector(profileTitleSelector);
        this._profileDescriptionElement = document.querySelector(profileDescriptionSelector);
        this._profileAvatarElement = document.querySelector(profileAvatarSelector);
    }

    getUserInfo() {
        return {
            title: this._profileTitleElement.textContent,
            description: this._profileDescriptionElement.textContent,
            avatar: this._profileAvatarElement.src
        };
    }

    setUserInfo({name, about, avatar}) {
        this._profileTitleElement.textContent = name;
        this._profileDescriptionElement.textContent = about;
        this.setAvatar({name, avatar});
    }

    setAvatar({name, avatar}) {
        this._profileAvatarElement.src = avatar;
        this._profileAvatarElement.alt = `Аватар ${name}`;
        this._profileAvatarElement.title = `Аватар ${name}`;
    }
}