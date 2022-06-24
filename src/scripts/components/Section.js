
export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

    renderItems(cards) {
      cards.forEach((element) => {
        this._renderer(element);
      });
    }

    addItem(data){

      this._container.prepend(data);
    }
}
