import Popup from "./Popup.js";
class PopupWithForm extends Popup {
  constructor({ popupSelector, formSubmitCallback }) {
    super({ popupSelector });
  }
}
export default PopupWithForm;
