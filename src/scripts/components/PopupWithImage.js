// import {placeInput} from '../../pages/index.js'
import {popupImage} from '../../pages/index.js'
import {popupCaption} from '../../pages/index.js'
import Card from './Card.js';

import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // this._popup = popupSelector;
    // this._name = data.name;
    // this._link = data.link;

  }

  //перезаписать open используя логику полиморфизма
  open(element) {

    popupImage.src = element.link;
    popupImage.alt = element.name;
    popupCaption.textContent = element.name;

    super.open();

    // popupImage.src = element.link;
    // popupImage.alt = element.name;


    // super.classList.remove('popup_fade-out');
    // super.classList.add('popup_fade-in');
    // var that = this;
    // setTimeout(function(){
    //   that._popup.classList.add('popup_opened');
    //   }, 10);
    //   this.setEventListeners();


  }

  //здесь вставлять в popup картинку с src и подписью


}
