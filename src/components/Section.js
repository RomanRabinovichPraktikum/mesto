export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = containerSelector;
    }

    renderItems() {
        this._items.forEach((element) => {
            this._renderer(element);
        });
    }

    addItem(element) {
        this._containerSelector.append(element);
    }
}