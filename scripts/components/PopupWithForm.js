import Popup from "./Popup.js";
// import {formElement} from '../../pages/index.js'
// import {placeInput} from '../../pages/index.js'
// const datafromFrom = "console log yes";

// const formElement = document.querySelectorAll('.popup__form');


export default class PopupWithForm extends Popup {
  constructor(popupSelector, {submitFormHandler}) {
    super(popupSelector);
    this._submitFormHandler = submitFormHandler;
    this._formElement = this._popup.querySelector('.popup__form');
    this._formValues = {};
    this._inputList = this._popup.querySelectorAll('.popup__input');
    // this._placeInput = placeInput;
    // this._datafromFrom = datafromFrom
  }

  //собирает данные всех полей формы
  //В качестве идеи - попробуйте совместить функцию коллбека
  // при сабмите формы добавления карточки с аргументом renderer у класса Section
  _getInputValues(){
        // достаём все элементы полей


    // создаём пустой объект

    // добавляем в этот объект значения всех полей
    this._inputList.forEach((input) => {
      this._formValues[ input.name ] = input.value;
      console.log(input.name, input.value)

    });
    return  this._formValues
  }


  setEventListeners(){

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormHandler(this._getInputValues());
    });

    super.setEventListeners();

    this._formElement.reset();

    console.log( "I have been called ");

  }



  close(){;
    super.close();
    this._formElement.reset();
    this._formElement.removeEventListener('submit', () => {
      this._submitFormHandler(this._getInputValues());
    });  }

}
