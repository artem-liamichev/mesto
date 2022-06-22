import Popup from "./Popup.js"

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, {submitDeletionHandler}){
    super(popupSelector);
    this._submitDeletionHandler = submitDeletionHandler
  }

  _submitDeletionHandlerFunction = (evt) => {
    evt.preventDefault();
    this._submitDeletionHandler();
  }

  setEventListeners(){
    this._popup.addEventListener('submit', this._submitDeletionHandlerFunction)
    super.setEventListeners();
  }
}
