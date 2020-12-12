export default class Section {
    constructor(renderer, containerSelector) {
        this._renderer = renderer;
        this._containerSelector = containerSelector;
    }

    renderItems(items) {
        items.forEach((element) => {
            this._renderer(element);
        });
    }

    addItem(element) {
        this._containerSelector.append(element);
    }
}