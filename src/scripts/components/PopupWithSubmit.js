import Popup from "./Popup.js"

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector){
    super(popupSelector)
  }

  // _submitDeletionHandlerFunction = (evt) => {
  //   evt.preventDefault();
  //   this._submitDeletionHandler();
  // }

  setEventListeners(){
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    })
    super.setEventListeners();
  }

  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }
}
