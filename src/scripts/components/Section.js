
//при организации кода Классы должны оставаться независимыми,только тогда их можно
//будет использовать в других местах\проектах

//класс отвечает за вставку элементов в разметку
//items - массив данных для добавления на страницу - список initialCards.js из name и link
//renderer -  функция - создает карточку (initializeCard) и вставляет на страницу (locateNewCardAhead).
//renderer - Создание экземпляров карточек (new Card) и их вставку в разметку будем передавать в конструктор класса
// import {newElement} from '../../pages/index.js'

// import {placeInput} from '../../pages/index.js'


export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

    renderItems(cards) {
      cards.forEach((element) => {
        this._renderer(element);
        // this.locateNewCardAhead(newElement)
      });
    }

    locateNewCardAhead(data){
      this._container.prepend(data);
    }

    // renderSingleItem() {
    //   this._renderer();
    //   this.locateNewCardAhead()
    // }

}
