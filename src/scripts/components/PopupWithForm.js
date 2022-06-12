import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {submitFormHandler}) {
    super(popupSelector);
    this._submitFormHandler = submitFormHandler;
    this._formElement = this._popup.querySelector('.popup__form');
    this._placeNameInput = this._formElement.querySelector('input[name="place"]');
    this._placeLinkInput = this._formElement.querySelector('input[name="link"]');
  }

  _submitFormHandlerFunction = (evt) => {
    evt.preventDefault();
    this._submitFormHandler(this._getInputValues());
}

  _getInputValues(){
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[ input.name ] = input.value;
    });
    return  this._formValues
  }


  setEventListeners(){
    this._formElement.addEventListener('submit', this._submitFormHandlerFunction);
    super.setEventListeners();
  }

  close(){;
    this._formElement.reset();
    super.close();
  }

}
