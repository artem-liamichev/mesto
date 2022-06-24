/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/components/Api.js":
/*!***************************************!*\
  !*** ./src/scripts/components/Api.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Api)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Api = /*#__PURE__*/function () {
  function Api(url, token) {
    _classCallCheck(this, Api);

    this._url = url;
    this._token = token;
    this._headers = {
      'Content-type': 'application/json',
      'Authorization': this._token
    };
  }

  _createClass(Api, [{
    key: "_checkServerResponse",
    value: function _checkServerResponse(res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject('Возникла ошибка');
    }
  }, {
    key: "getAllNeededData",
    value: function getAllNeededData() {
      return Promise.all([this.getProfile(), this.getInitialCards()]);
    }
  }, {
    key: "getInitialCards",
    value: function getInitialCards() {
      var _this = this;

      return fetch("".concat(this._url, "/cards/"), {
        headers: this._headers
      }).then(function (res) {
        return _this._checkServerResponse(res);
      });
    }
  }, {
    key: "getProfile",
    value: function getProfile() {
      var _this2 = this;

      return fetch("".concat(this._url, "/users/me"), {
        headers: this._headers
      }).then(function (res) {
        return _this2._checkServerResponse(res);
      });
    }
  }, {
    key: "addProfile",
    value: function addProfile(data) {
      var _this3 = this;

      var body = {
        name: data.surname,
        about: data.job
      };
      return fetch("".concat(this._url, "/users/me"), {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(body)
      }).then(function (res) {
        return _this3._checkServerResponse(res);
      });
    }
  }, {
    key: "addCard",
    value: function addCard(data) {
      var _this4 = this;

      var body = {
        name: data.name,
        link: data.link
      };
      return fetch("".concat(this._url, "/cards/"), {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(body)
      }).then(function (res) {
        return _this4._checkServerResponse(res);
      });
    }
  }, {
    key: "deleteCard",
    value: function deleteCard(cardId) {
      var _this5 = this;

      return fetch("".concat(this._url, "/cards/").concat(cardId), {
        method: 'DELETE',
        headers: this._headers
      }).then(function (res) {
        return _this5._checkServerResponse(res);
      });
    }
  }, {
    key: "setLike",
    value: function setLike(cardId) {
      var _this6 = this;

      return fetch("".concat(this._url, "/cards/").concat(cardId, "/likes"), {
        method: 'PUT',
        headers: this._headers
      }).then(function (res) {
        return _this6._checkServerResponse(res);
      });
    }
  }, {
    key: "resetLike",
    value: function resetLike(cardId) {
      var _this7 = this;

      return fetch("".concat(this._url, "/cards/").concat(cardId, "/likes"), {
        method: 'DELETE',
        headers: this._headers
      }).then(function (res) {
        return _this7._checkServerResponse(res);
      });
    }
  }, {
    key: "addAvatar",
    value: function addAvatar(data) {
      var _this8 = this;

      var body = {
        avatar: data.avatar
      };
      return fetch("".concat(this._url, "/users/me/avatar"), {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(body)
      }).then(function (res) {
        return _this8._checkServerResponse(res);
      });
    }
  }]);

  return Api;
}();



/***/ }),

/***/ "./src/scripts/components/Card.js":
/*!****************************************!*\
  !*** ./src/scripts/components/Card.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Card)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Card = /*#__PURE__*/function () {
  function Card(data, userId, cardSelector, _ref, _ref2, _ref3, _ref4) {
    var handleCardClick = _ref.handleCardClick;
    var deleteClickHandler = _ref2.deleteClickHandler;
    var likeClickHandler = _ref3.likeClickHandler;
    var resetLikeClickHandler = _ref4.resetLikeClickHandler;

    _classCallCheck(this, Card);

    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._elementName = this._element.querySelector('.element__name');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._likeCounter = this._element.querySelector('.element__like-number');
    this._numberOfLikes = data.likes;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._deleteClickHandler = deleteClickHandler;
    this._likeClickHandler = likeClickHandler;
    this._resetlikeClickHandler = resetLikeClickHandler;
    this._isLiked = this._data.likes.map(function (el) {
      return el._id;
    }).includes(this._userId);
  }

  _createClass(Card, [{
    key: "_getTemplate",
    value: function _getTemplate() {
      var newItem = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
      return newItem;
    }
  }, {
    key: "createCard",
    value: function createCard() {
      this._addListeners();

      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this._elementName.textContent = this._name;
      this._likeCounter.textContent = this._numberOfLikes.length.toString();

      if (this._isLiked) {
        this._likeButton.classList.add("element__like-button_active");
      }

      if (this._ownerId === this._userId) {
        this._deleteButton.style.display = "grid";
      }

      return this._element;
    }
  }, {
    key: "_getId",
    value: function _getId() {
      return this._data._id;
    }
  }, {
    key: "_addListeners",
    value: function _addListeners() {
      var _this = this;

      this._deleteButton.addEventListener('click', function () {
        _this._deleteClickHandler(_this._getId());
      });

      this._likeButton.addEventListener('click', function () {
        _this._likeHandler(_this._getId());
      });

      this._cardImage.addEventListener('click', function (evt) {
        _this._handleCardClick(evt);
      });
    }
  }, {
    key: "_likeHandler",
    value: function _likeHandler() {
      if (this._isLiked) {
        this._resetlikeClickHandler(this._getId());
      } else {
        this._likeClickHandler(this._getId());
      }
    }
  }, {
    key: "handleElementDelete",
    value: function handleElementDelete() {
      this._element.remove();

      this._element = null;
    }
  }, {
    key: "handleSetLike",
    value: function handleSetLike(data) {
      this._likeCounter.textContent = data.likes.length.toString();

      this._likeButton.classList.add("element__like-button_active");

      this._isLiked = true;
    }
  }, {
    key: "handleResetLike",
    value: function handleResetLike(data) {
      this._likeCounter.textContent = data.likes.length.toString();

      this._likeButton.classList.remove("element__like-button_active");

      this._isLiked = false;
    }
  }]);

  return Card;
}();



/***/ }),

/***/ "./src/scripts/components/FormValidator.js":
/*!*************************************************!*\
  !*** ./src/scripts/components/FormValidator.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormValidator)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var FormValidator = /*#__PURE__*/function () {
  function FormValidator(config, form) {
    _classCallCheck(this, FormValidator);

    this._submitButton = config.submitButton;
    this._popupIsInvalid = config.popupIsInvalid;
    this._input = config.input;
    this._inputError = config.inputError;
    this._error = config.error;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._input));
    this._button = this._form.querySelector(this._submitButton);
  }

  _createClass(FormValidator, [{
    key: "_showInputError",
    value: function _showInputError(input) {
      var error = this._form.querySelector(".".concat(input.id, "-error"));

      input.classList.add(this._inputError);
      error.textContent = input.validationMessage;
      error.classList.add(this._error);
    }
  }, {
    key: "_checkInputValidity",
    value: function _checkInputValidity(input) {
      if (!input.validity.valid) {
        this._showInputError(input, input.validationMessage);
      } else {
        this._hideInputError(input);
      }
    }
  }, {
    key: "_hideInputError",
    value: function _hideInputError(input) {
      var error = this._form.querySelector(".".concat(input.id, "-error"));

      input.classList.remove(this._inputError);
      error.classList.remove(this._error);
      error.textContent = '';
    }
  }, {
    key: "_hasInvalidInput",
    value: function _hasInvalidInput() {
      return this._inputList.some(function (input) {
        return !input.validity.valid;
      });
    }
  }, {
    key: "_disableButton",
    value: function _disableButton() {
      this._button.classList.add(this._popupIsInvalid);

      this._button.setAttribute('disabled', 'disabled');
    }
  }, {
    key: "_enableButton",
    value: function _enableButton() {
      this._button.classList.remove(this._popupIsInvalid);

      this._button.removeAttribute('disabled');
    }
  }, {
    key: "resetInputError",
    value: function resetInputError() {
      var _this = this;

      this._inputList.forEach(function (input) {
        _this._hideInputError(input);
      });
    }
  }, {
    key: "toggleButtonState",
    value: function toggleButtonState() {
      if (this._hasInvalidInput()) {
        this._disableButton();
      } else {
        this._enableButton();
      }
    }
  }, {
    key: "_setEventListeners",
    value: function _setEventListeners() {
      var _this2 = this;

      this.toggleButtonState();

      this._inputList.forEach(function (input) {
        input.addEventListener('input', function () {
          _this2._checkInputValidity(input);

          _this2.toggleButtonState();
        });
      });
    }
  }, {
    key: "enableValidation",
    value: function enableValidation() {
      this._setEventListeners();
    }
  }]);

  return FormValidator;
}();



/***/ }),

/***/ "./src/scripts/components/Popup.js":
/*!*****************************************!*\
  !*** ./src/scripts/components/Popup.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Popup)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Popup = /*#__PURE__*/function () {
  function Popup(popupSelector) {
    var _this = this;

    _classCallCheck(this, Popup);

    _defineProperty(this, "_handleEscClose", function (evt) {
      if (evt.key === 'Escape') {
        _this.close();
      }
    });

    _defineProperty(this, "_closeOnClick", function (evt) {
      if (evt.target.classList.contains('popup_opened') && evt.target.closest('.popup__container') !== _this._popupContainer || evt.target.closest('.popup__close-button') === _this._popupCloseButton) {
        _this.close();
      }
    });

    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__close-button');
    this._popupContainer = this._popup.querySelector('.popup__container');
  }

  _createClass(Popup, [{
    key: "open",
    value: function open() {
      var _this2 = this;

      this._popup.classList.remove('popup_fade-out');

      this._popup.classList.add('popup_fade-in');

      setTimeout(function () {
        _this2._popup.classList.add('popup_opened');
      }, 10);
      document.addEventListener('keydown', this._handleEscClose);
    }
  }, {
    key: "close",
    value: function close() {
      var _this3 = this;

      this._popup.classList.remove('popup_fade-in');

      this._popup.classList.add('popup_fade-out');

      setTimeout(function () {
        _this3._popup.classList.remove('popup_opened');
      }, 400);
      document.removeEventListener('keydown', this._handleEscClose);
    }
  }, {
    key: "setEventListeners",
    value: function setEventListeners() {
      var _this4 = this;

      this._popup.addEventListener('mousedown', function (evt) {
        _this4._closeOnClick(evt);
      });
    }
  }]);

  return Popup;
}();



/***/ }),

/***/ "./src/scripts/components/PopupWithForm.js":
/*!*************************************************!*\
  !*** ./src/scripts/components/PopupWithForm.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PopupWithForm)
/* harmony export */ });
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ "./src/scripts/components/Popup.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var PopupWithForm = /*#__PURE__*/function (_Popup) {
  _inherits(PopupWithForm, _Popup);

  var _super = _createSuper(PopupWithForm);

  function PopupWithForm(popupSelector, submitFormHandler) {
    var _this;

    _classCallCheck(this, PopupWithForm);

    _this = _super.call(this, popupSelector);

    _defineProperty(_assertThisInitialized(_this), "_submitFormHandlerFunction", function (evt) {
      evt.preventDefault();

      _this._submitFormHandler(_this._getInputValues());
    });

    _this._submitFormHandler = submitFormHandler;
    _this._form = _this._popup.querySelector('.popup__form');
    _this._inputList = _this._popup.querySelectorAll('.popup__input');
    return _this;
  }

  _createClass(PopupWithForm, [{
    key: "_getInputValues",
    value: function _getInputValues() {
      var _this2 = this;

      this._formValues = {};

      this._inputList.forEach(function (input) {
        _this2._formValues[input.name] = input.value;
      });

      return this._formValues;
    }
  }, {
    key: "setEventListeners",
    value: function setEventListeners() {
      this._form.addEventListener('submit', this._submitFormHandlerFunction);

      _get(_getPrototypeOf(PopupWithForm.prototype), "setEventListeners", this).call(this);
    }
  }, {
    key: "close",
    value: function close() {
      this._form.reset();

      _get(_getPrototypeOf(PopupWithForm.prototype), "close", this).call(this);
    }
  }]);

  return PopupWithForm;
}(_Popup_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/scripts/components/PopupWithImage.js":
/*!**************************************************!*\
  !*** ./src/scripts/components/PopupWithImage.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PopupWithImage)
/* harmony export */ });
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ "./src/scripts/components/Popup.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var PopupWithImage = /*#__PURE__*/function (_Popup) {
  _inherits(PopupWithImage, _Popup);

  var _super = _createSuper(PopupWithImage);

  function PopupWithImage(popupSelector) {
    var _this;

    _classCallCheck(this, PopupWithImage);

    _this = _super.call(this, popupSelector);
    _this._popupImage = _this._popup.querySelector('.popup__image');
    _this._popupCaption = _this._popup.querySelector('.popup__caption');
    return _this;
  }

  _createClass(PopupWithImage, [{
    key: "open",
    value: function open(element) {
      this._popupImage.src = element.link;
      this._popupImage.alt = element.name;
      this._popupCaption.textContent = element.name;

      _get(_getPrototypeOf(PopupWithImage.prototype), "open", this).call(this);
    }
  }]);

  return PopupWithImage;
}(_Popup_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/scripts/components/PopupWithSubmit.js":
/*!***************************************************!*\
  !*** ./src/scripts/components/PopupWithSubmit.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PopupWithSubmit)
/* harmony export */ });
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ "./src/scripts/components/Popup.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var PopupWithSubmit = /*#__PURE__*/function (_Popup) {
  _inherits(PopupWithSubmit, _Popup);

  var _super = _createSuper(PopupWithSubmit);

  function PopupWithSubmit(popupSelector) {
    _classCallCheck(this, PopupWithSubmit);

    return _super.call(this, popupSelector);
  } // _submitDeletionHandlerFunction = (evt) => {
  //   evt.preventDefault();
  //   this._submitDeletionHandler();
  // }


  _createClass(PopupWithSubmit, [{
    key: "setEventListeners",
    value: function setEventListeners() {
      var _this = this;

      this._popup.addEventListener('submit', function (evt) {
        evt.preventDefault();

        _this._handleSubmitCallback();
      });

      _get(_getPrototypeOf(PopupWithSubmit.prototype), "setEventListeners", this).call(this);
    }
  }, {
    key: "setSubmitAction",
    value: function setSubmitAction(action) {
      this._handleSubmitCallback = action;
    }
  }]);

  return PopupWithSubmit;
}(_Popup_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/scripts/components/Section.js":
/*!*******************************************!*\
  !*** ./src/scripts/components/Section.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Section)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Section = /*#__PURE__*/function () {
  function Section(_ref, containerSelector) {
    var renderer = _ref.renderer;

    _classCallCheck(this, Section);

    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  _createClass(Section, [{
    key: "renderItems",
    value: function renderItems(cards) {
      var _this = this;

      cards.forEach(function (element) {
        _this._renderer(element);
      });
    }
  }, {
    key: "addItem",
    value: function addItem(data) {
      this._container.prepend(data);
    }
  }]);

  return Section;
}();



/***/ }),

/***/ "./src/scripts/components/UserInfo.js":
/*!********************************************!*\
  !*** ./src/scripts/components/UserInfo.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserInfo)
/* harmony export */ });
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UserInfo = /*#__PURE__*/_createClass(function UserInfo(_userName, _userJob, userAvatar) {
  var _this = this;

  _classCallCheck(this, UserInfo);

  _defineProperty(this, "getUserInfo", function () {
    var userName = _this._userName.textContent;
    var userJob = _this._userJob.textContent;
    return {
      userName: userName,
      userJob: userJob
    };
  });

  _defineProperty(this, "setUserInfo", function (data) {
    if (data.name, data.about, data.avatar) {
      _this._userName.textContent = data.name;
      _this._userJob.textContent = data.about;
      _this._userAvatar.src = data.avatar;
    }
  });

  this._userName = document.querySelector(_userName);
  this._userJob = document.querySelector(_userJob);
  this._userAvatar = userAvatar;
});



/***/ }),

/***/ "./src/scripts/utils/constants.js":
/*!****************************************!*\
  !*** ./src/scripts/utils/constants.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config),
/* harmony export */   "renderLoading": () => (/* binding */ renderLoading)
/* harmony export */ });
var config = {
  submitButton: '.popup__save',
  popupIsInvalid: 'popup__save_disabled',
  input: '.popup__input',
  inputError: 'popup__input_type_error',
  error: 'error'
};
function renderLoading(form, isLoading) {
  if (isLoading) {
    form.querySelector(config.submitButton).textContent = 'Сохранение...';
  } else {
    form.querySelector(config.submitButton).textContent = 'Сохранить';
  }
}

/***/ }),

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ "./src/pages/index.css");
/* harmony import */ var _scripts_components_Card_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scripts/components/Card.js */ "./src/scripts/components/Card.js");
/* harmony import */ var _scripts_components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scripts/components/FormValidator.js */ "./src/scripts/components/FormValidator.js");
/* harmony import */ var _scripts_components_Section_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../scripts/components/Section.js */ "./src/scripts/components/Section.js");
/* harmony import */ var _scripts_components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../scripts/components/PopupWithImage.js */ "./src/scripts/components/PopupWithImage.js");
/* harmony import */ var _scripts_components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../scripts/components/PopupWithForm.js */ "./src/scripts/components/PopupWithForm.js");
/* harmony import */ var _scripts_components_UserInfo_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../scripts/components/UserInfo.js */ "./src/scripts/components/UserInfo.js");
/* harmony import */ var _scripts_components_Api_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../scripts/components/Api.js */ "./src/scripts/components/Api.js");
/* harmony import */ var _scripts_components_PopupWithSubmit__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../scripts/components/PopupWithSubmit */ "./src/scripts/components/PopupWithSubmit.js");
/* harmony import */ var _scripts_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../scripts/utils/constants.js */ "./src/scripts/utils/constants.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }












var api = new _scripts_components_Api_js__WEBPACK_IMPORTED_MODULE_7__["default"]('https://mesto.nomoreparties.co/v1/cohort-43', '13e0d01a-3631-45a5-b3a6-1a7f87295049');
var profileOpenPopupButton = document.querySelector('.profile__edit-button');
var formProfile = document.querySelector('.popup__form_profile');
var nameInput = formProfile.querySelector('input[name="surname"]');
var jobInput = formProfile.querySelector('input[name="job"]');
var elementOpenPopupButton = document.querySelector('.profile__add-button');
var formElement = document.querySelector('.popup__form_add');
var popuperProfileWithForm = new _scripts_components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__["default"]('.popup_profile', submitFormProfileHandler);
var formAvatar = document.querySelector('.popup__form_avatar');
var avatarOpenPopupButton = document.querySelector('.profile__avatar-edit-button');
var avatarImage = document.querySelector('.profile__avatar');
var popuperAvatar = new _scripts_components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__["default"]('.popup_avatar', submitFormAvatarHandler);
var userInfo = new _scripts_components_UserInfo_js__WEBPACK_IMPORTED_MODULE_6__["default"]('.profile__name', '.profile__bio', avatarImage);
var popupConfirm = new _scripts_components_PopupWithSubmit__WEBPACK_IMPORTED_MODULE_8__["default"]('.popup_delete');
var cardList = new _scripts_components_Section_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
  renderer: function renderer(element) {
    cardList.addItem(createCard(element, userId));
  }
}, '.elements');
var popupAddCard = new _scripts_components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__["default"]('.popup_add', submitAddCardForm);
var userId = "";

function submitAddCardForm(data) {
  (0,_scripts_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.renderLoading)(formElement, true);
  api.addCard(data).then(function (data) {
    cardList.addItem(createCard(data, userId));
    popupAddCard.close();
  }).catch(function (err) {
    console.log(err);
  }).finally(function () {
    setTimeout(function () {
      (0,_scripts_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.renderLoading)(formElement, false);
    }, 400);
  });
}

popupConfirm.setEventListeners();

function submitFormProfileHandler(data) {
  (0,_scripts_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.renderLoading)(formProfile, true);
  api.addProfile(data).then(function (data) {
    userInfo.setUserInfo(data);
    popuperProfileWithForm.close();
  }).catch(function (err) {
    console.log(err);
  }).finally(function () {
    setTimeout(function () {
      (0,_scripts_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.renderLoading)(formProfile, false);
    }, 400);
  });
}

function submitFormAvatarHandler(data) {
  (0,_scripts_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.renderLoading)(formAvatar, true);
  api.addAvatar(data).then(function (data) {
    avatarImage.src = data.avatar;
    popuperAvatar.close();
  }).catch(function (err) {
    console.log(err);
  }).finally(function () {
    setTimeout(function () {
      (0,_scripts_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.renderLoading)(formAvatar, false);
    }, 400);
  });
}

elementOpenPopupButton.addEventListener('click', function () {
  formValidators[formElement.name].resetInputError();
  formValidators[formElement.name].toggleButtonState();
  popupAddCard.open();
});
popupAddCard.setEventListeners();
avatarImage.addEventListener('mouseover', function () {
  avatarOpenPopupButton.style.display = 'block';
});
avatarImage.addEventListener('mouseout', function () {
  avatarOpenPopupButton.style.display = 'none';
});
avatarImage.addEventListener('click', function () {
  formValidators[formAvatar.name].resetInputError();
  formValidators[formAvatar.name].toggleButtonState();
  popuperAvatar.open();
  formValidators[formAvatar.name].enableValidation();
});
popuperAvatar.setEventListeners();
api.getAllNeededData().then(function (argument) {
  var _argument = _slicedToArray(argument, 2),
      profileInfo = _argument[0],
      initialCards = _argument[1];

  userInfo.setUserInfo(profileInfo);
  userId = profileInfo._id;
  cardList.renderItems(initialCards.reverse());
}).catch(function (err) {
  console.log(err);
});
popuperProfileWithForm.setEventListeners();
profileOpenPopupButton.addEventListener('click', function () {
  formValidators[formProfile.name].toggleButtonState();
  formValidators[formProfile.name].resetInputError();
  popuperProfileWithForm.open();
  var initialInfo = userInfo.getUserInfo();
  nameInput.value = initialInfo.userName;
  jobInput.value = initialInfo.userJob;
});
var popuperZoom = new _scripts_components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_4__["default"]('.popup_zoom');
popuperZoom.setEventListeners();

function createCard(element, userId) {
  var card = new _scripts_components_Card_js__WEBPACK_IMPORTED_MODULE_1__["default"](element, userId, '.item-template', {
    handleCardClick: function handleCardClick() {
      popuperZoom.open(element);
    }
  }, {
    deleteClickHandler: function deleteClickHandler(cardId) {
      popupConfirm.open();
      popupConfirm.setSubmitAction(function () {
        api.deleteCard(cardId).then(function () {
          popupConfirm.close();
          card.handleElementDelete();
        }).catch(function (err) {
          console.log(err);
        });
      });
    }
  }, {
    likeClickHandler: function likeClickHandler(cardId) {
      api.setLike(cardId).then(function (data) {
        card.handleSetLike(data);
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, {
    resetLikeClickHandler: function resetLikeClickHandler(cardId) {
      api.resetLike(cardId).then(function (data) {
        card.handleResetLike(data);
      }).catch(function (err) {
        console.log(err);
      });
    }
  });
  return card.createCard();
}

var formValidators = {};

var enableValidation = function enableValidation(config) {
  var formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach(function (form) {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    var formValidator = new _scripts_components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__["default"](config, form);
    formValidators[form.name] = formValidator;
    formValidator.enableValidation();
  });
};

enableValidation(_scripts_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.config);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBVkQ7O0FBWUFBLGdCQUFnQixDQUFDbEgsK0RBQUQsQ0FBaEIsQyIsInNvdXJjZXMiOlsid2VicGFjazovL21lc3RvLy4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9BcGkuanMiLCJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL0NhcmQuanMiLCJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL1BvcHVwLmpzIiwid2VicGFjazovL21lc3RvLy4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzIiwid2VicGFjazovL21lc3RvLy4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qcyIsIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvUG9wdXBXaXRoU3VibWl0LmpzIiwid2VicGFjazovL21lc3RvLy4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9TZWN0aW9uLmpzIiwid2VicGFjazovL21lc3RvLy4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9Vc2VySW5mby5qcyIsIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9zY3JpcHRzL3V0aWxzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9wYWdlcy9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vbWVzdG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWVzdG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21lc3RvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWVzdG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9wYWdlcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBBcGkge1xuICBjb25zdHJ1Y3Rvcih1cmwsIHRva2VuKSB7XG4gICAgdGhpcy5fdXJsID0gdXJsO1xuICAgIHRoaXMuX3Rva2VuID0gdG9rZW47XG4gICAgdGhpcy5faGVhZGVycyA9IHtcbiAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAnQXV0aG9yaXphdGlvbic6IHRoaXMuX3Rva2VuLFxuICAgIH1cbiAgfVxuXG4gIF9jaGVja1NlcnZlclJlc3BvbnNlKHJlcyl7XG4gICAgaWYgKHJlcy5vaykge1xuICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgn0JLQvtC30L3QuNC60LvQsCDQvtGI0LjQsdC60LAnKVxuICB9XG5cbiAgZ2V0QWxsTmVlZGVkRGF0YSgpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3RoaXMuZ2V0UHJvZmlsZSgpLCB0aGlzLmdldEluaXRpYWxDYXJkcygpXSlcbiAgfVxuXG4gIGdldEluaXRpYWxDYXJkcygpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5fdXJsfS9jYXJkcy9gLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzXG4gICAgfSlcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoZWNrU2VydmVyUmVzcG9uc2UocmVzKTtcbiAgICAgIH0pXG4gIH1cblxuICBnZXRQcm9maWxlKCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLl91cmx9L3VzZXJzL21lYCwge1xuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVyc1xuICAgIH0pXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGVja1NlcnZlclJlc3BvbnNlKHJlcyk7XG4gICAgICB9KVxuICB9XG5cbiAgYWRkUHJvZmlsZShkYXRhKSB7XG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgIG5hbWU6IGRhdGEuc3VybmFtZSxcbiAgICAgIGFib3V0OiBkYXRhLmpvYlxuICAgIH1cbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5fdXJsfS91c2Vycy9tZWAsIHtcbiAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KVxufSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fY2hlY2tTZXJ2ZXJSZXNwb25zZShyZXMpO1xuICAgIH0pXG4gIH1cblxuICBhZGRDYXJkKGRhdGEpIHtcbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgbmFtZTogZGF0YS5uYW1lLFxuICAgICAgbGluazogZGF0YS5saW5rXG4gICAgfVxuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLl91cmx9L2NhcmRzL2AsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpXG59KVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl9jaGVja1NlcnZlclJlc3BvbnNlKHJlcyk7XG4gICAgfSlcbiAgfVxuXG4gIGRlbGV0ZUNhcmQoY2FyZElkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX3VybH0vY2FyZHMvJHtjYXJkSWR9YCwge1xuICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fY2hlY2tTZXJ2ZXJSZXNwb25zZShyZXMpO1xuICAgIH0pXG4gIH1cblxuICBzZXRMaWtlKGNhcmRJZCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLl91cmx9L2NhcmRzLyR7Y2FyZElkfS9saWtlc2AsIHtcbiAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuX2NoZWNrU2VydmVyUmVzcG9uc2UocmVzKTtcbiAgICB9KVxuICB9XG5cbiAgcmVzZXRMaWtlKGNhcmRJZCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLl91cmx9L2NhcmRzLyR7Y2FyZElkfS9saWtlc2AsIHtcbiAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuX2NoZWNrU2VydmVyUmVzcG9uc2UocmVzKTtcbiAgICB9KVxuICB9XG5cbiAgYWRkQXZhdGFyKGRhdGEpIHtcbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgYXZhdGFyOiBkYXRhLmF2YXRhcixcbiAgICB9XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX3VybH0vdXNlcnMvbWUvYXZhdGFyYCwge1xuICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpXG59KVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl9jaGVja1NlcnZlclJlc3BvbnNlKHJlcyk7XG4gICAgfSlcbiAgfVxuIH1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcmQge1xuICBjb25zdHJ1Y3RvcihkYXRhLCB1c2VySWQsIGNhcmRTZWxlY3Rvciwge2hhbmRsZUNhcmRDbGlja30sIHtkZWxldGVDbGlja0hhbmRsZXJ9LCB7bGlrZUNsaWNrSGFuZGxlcn0sIHtyZXNldExpa2VDbGlja0hhbmRsZXJ9KSB7XG4gICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gICAgdGhpcy5fbmFtZSA9IGRhdGEubmFtZTtcbiAgICB0aGlzLl9saW5rID0gZGF0YS5saW5rO1xuICAgIHRoaXMuX2NhcmRTZWxlY3RvciA9IGNhcmRTZWxlY3RvcjtcbiAgICB0aGlzLl9oYW5kbGVDYXJkQ2xpY2sgPSBoYW5kbGVDYXJkQ2xpY2s7XG4gICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX2dldFRlbXBsYXRlKCk7XG4gICAgdGhpcy5fY2FyZEltYWdlID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZWxlbWVudF9faW1hZ2UnKTtcbiAgICB0aGlzLl9saWtlQnV0dG9uID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZWxlbWVudF9fbGlrZS1idXR0b24nKTtcbiAgICB0aGlzLl9lbGVtZW50TmFtZSA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcignLmVsZW1lbnRfX25hbWUnKTtcbiAgICB0aGlzLl9kZWxldGVCdXR0b24gPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbGVtZW50X19kZWxldGUtYnV0dG9uJyk7XG4gICAgdGhpcy5fbGlrZUNvdW50ZXIgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbGVtZW50X19saWtlLW51bWJlcicpO1xuICAgIHRoaXMuX251bWJlck9mTGlrZXMgPSBkYXRhLmxpa2VzO1xuICAgIHRoaXMuX293bmVySWQgPSBkYXRhLm93bmVyLl9pZDtcbiAgICB0aGlzLl91c2VySWQgPSB1c2VySWQ7XG4gICAgdGhpcy5fZGVsZXRlQ2xpY2tIYW5kbGVyID0gZGVsZXRlQ2xpY2tIYW5kbGVyO1xuICAgIHRoaXMuX2xpa2VDbGlja0hhbmRsZXIgPSBsaWtlQ2xpY2tIYW5kbGVyO1xuICAgIHRoaXMuX3Jlc2V0bGlrZUNsaWNrSGFuZGxlciA9IHJlc2V0TGlrZUNsaWNrSGFuZGxlcjtcbiAgICB0aGlzLl9pc0xpa2VkID0gdGhpcy5fZGF0YS5saWtlcy5tYXAoKGVsKSA9PiBlbC5faWQpLmluY2x1ZGVzKHRoaXMuX3VzZXJJZCk7XG4gIH1cbiAgX2dldFRlbXBsYXRlKCkge1xuICAgIGNvbnN0IG5ld0l0ZW0gPSBkb2N1bWVudFxuICAgIC5xdWVyeVNlbGVjdG9yKHRoaXMuX2NhcmRTZWxlY3RvcilcbiAgICAuY29udGVudFxuICAgIC5xdWVyeVNlbGVjdG9yKCcuZWxlbWVudCcpXG4gICAgLmNsb25lTm9kZSh0cnVlKTtcbiAgICByZXR1cm4gbmV3SXRlbVxuICB9XG5cbiAgY3JlYXRlQ2FyZCgpIHtcbiAgICB0aGlzLl9hZGRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLl9jYXJkSW1hZ2Uuc3JjID0gdGhpcy5fbGlua1xuICAgIHRoaXMuX2NhcmRJbWFnZS5hbHQgPSB0aGlzLl9uYW1lXG4gICAgdGhpcy5fZWxlbWVudE5hbWUudGV4dENvbnRlbnQgPSB0aGlzLl9uYW1lXG4gICAgdGhpcy5fbGlrZUNvdW50ZXIudGV4dENvbnRlbnQgPSB0aGlzLl9udW1iZXJPZkxpa2VzLmxlbmd0aC50b1N0cmluZygpXG5cbiAgICBpZiAodGhpcy5faXNMaWtlZCkge1xuICAgICAgdGhpcy5fbGlrZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZWxlbWVudF9fbGlrZS1idXR0b25fYWN0aXZlXCIpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9vd25lcklkID09PSB0aGlzLl91c2VySWQpIHtcbiAgICAgIHRoaXMuX2RlbGV0ZUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJncmlkXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQ7XG4gIH1cblxuICBfZ2V0SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGEuX2lkO1xuICB9XG5cbiAgX2FkZExpc3RlbmVycygpIHtcbiAgICB0aGlzLl9kZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLl9kZWxldGVDbGlja0hhbmRsZXIodGhpcy5fZ2V0SWQoKSk7XG4gICAgfSk7XG4gICAgdGhpcy5fbGlrZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuX2xpa2VIYW5kbGVyKHRoaXMuX2dldElkKCkpO1xuICAgIH0pO1xuICAgIHRoaXMuX2NhcmRJbWFnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldnQpID0+IHtcbiAgICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljayhldnQpO1xuICAgIH0pO1xuICB9O1xuXG4gIF9saWtlSGFuZGxlcigpe1xuICAgIGlmICh0aGlzLl9pc0xpa2VkKSB7XG4gICAgICB0aGlzLl9yZXNldGxpa2VDbGlja0hhbmRsZXIodGhpcy5fZ2V0SWQoKSk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbGlrZUNsaWNrSGFuZGxlcih0aGlzLl9nZXRJZCgpKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVFbGVtZW50RGVsZXRlKCkge1xuICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlKCk7XG4gICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gIH1cblxuICBoYW5kbGVTZXRMaWtlKGRhdGEpIHtcbiAgICB0aGlzLl9saWtlQ291bnRlci50ZXh0Q29udGVudCA9IGRhdGEubGlrZXMubGVuZ3RoLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5fbGlrZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZWxlbWVudF9fbGlrZS1idXR0b25fYWN0aXZlXCIpO1xuICAgIHRoaXMuX2lzTGlrZWQgPSB0cnVlO1xuICB9XG4gIGhhbmRsZVJlc2V0TGlrZShkYXRhKSB7XG4gICAgdGhpcy5fbGlrZUNvdW50ZXIudGV4dENvbnRlbnQgPSBkYXRhLmxpa2VzLmxlbmd0aC50b1N0cmluZygpO1xuICAgIHRoaXMuX2xpa2VCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImVsZW1lbnRfX2xpa2UtYnV0dG9uX2FjdGl2ZVwiKTtcbiAgICB0aGlzLl9pc0xpa2VkID0gZmFsc2U7XG5cbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybVZhbGlkYXRvciB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZywgZm9ybSkge1xuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbiA9IGNvbmZpZy5zdWJtaXRCdXR0b247XG4gICAgdGhpcy5fcG9wdXBJc0ludmFsaWQgPSBjb25maWcucG9wdXBJc0ludmFsaWQ7XG4gICAgdGhpcy5faW5wdXQgPSBjb25maWcuaW5wdXQ7XG4gICAgdGhpcy5faW5wdXRFcnJvciA9IGNvbmZpZy5pbnB1dEVycm9yO1xuICAgIHRoaXMuX2Vycm9yID0gY29uZmlnLmVycm9yO1xuICAgIHRoaXMuX2Zvcm0gPSBmb3JtO1xuICAgIHRoaXMuX2lucHV0TGlzdCA9IEFycmF5LmZyb20odGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX2lucHV0KSk7XG4gICAgdGhpcy5fYnV0dG9uID0gdGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yKHRoaXMuX3N1Ym1pdEJ1dHRvbik7XG4gIH1cblxuICBfc2hvd0lucHV0RXJyb3IoaW5wdXQpIHtcbiAgICBjb25zdCBlcnJvciA9IHRoaXMuX2Zvcm0ucXVlcnlTZWxlY3RvcihgLiR7aW5wdXQuaWR9LWVycm9yYCk7XG4gICAgaW5wdXQuY2xhc3NMaXN0LmFkZCh0aGlzLl9pbnB1dEVycm9yKTtcbiAgICBlcnJvci50ZXh0Q29udGVudCA9IGlucHV0LnZhbGlkYXRpb25NZXNzYWdlO1xuICAgIGVycm9yLmNsYXNzTGlzdC5hZGQodGhpcy5fZXJyb3IpO1xuICB9XG5cbiAgX2NoZWNrSW5wdXRWYWxpZGl0eSAoaW5wdXQpIHtcbiAgICBpZiAoIWlucHV0LnZhbGlkaXR5LnZhbGlkKSB7XG4gICAgICB0aGlzLl9zaG93SW5wdXRFcnJvcihpbnB1dCwgaW5wdXQudmFsaWRhdGlvbk1lc3NhZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dCk7XG4gICAgfVxuICB9O1xuXG4gIF9oaWRlSW5wdXRFcnJvciAoaW5wdXQpIHtcbiAgICBjb25zdCBlcnJvciA9IHRoaXMuX2Zvcm0ucXVlcnlTZWxlY3RvcihgLiR7aW5wdXQuaWR9LWVycm9yYCk7XG4gICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9pbnB1dEVycm9yKTtcbiAgICBlcnJvci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2Vycm9yKTtcbiAgICBlcnJvci50ZXh0Q29udGVudCA9ICcnO1xuICB9O1xuXG5cbiAgX2hhc0ludmFsaWRJbnB1dCgpIHtcbiAgICByZXR1cm4gdGhpcy5faW5wdXRMaXN0LnNvbWUoKGlucHV0KSA9PiB7XG4gICAgICAgIHJldHVybiAhaW5wdXQudmFsaWRpdHkudmFsaWQ7XG4gICAgfSlcbiAgfVxuXG4gIF9kaXNhYmxlQnV0dG9uKCkge1xuICAgIHRoaXMuX2J1dHRvbi5jbGFzc0xpc3QuYWRkKHRoaXMuX3BvcHVwSXNJbnZhbGlkKTtcbiAgICB0aGlzLl9idXR0b24uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICB9XG5cbiAgX2VuYWJsZUJ1dHRvbigpIHtcbiAgICB0aGlzLl9idXR0b24uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9wb3B1cElzSW52YWxpZCk7XG4gICAgdGhpcy5fYnV0dG9uLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgfVxuXG4gIHJlc2V0SW5wdXRFcnJvcigpe1xuICAgIHRoaXMuX2lucHV0TGlzdC5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXQpO1xuICAgIH0pXG4gIH1cblxuICB0b2dnbGVCdXR0b25TdGF0ZSgpIHtcbiAgICBpZiAodGhpcy5faGFzSW52YWxpZElucHV0KCkpIHtcbiAgICAgIHRoaXMuX2Rpc2FibGVCdXR0b24oKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9lbmFibGVCdXR0b24oKVxuICAgICAgfVxuICAgIH1cblxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy50b2dnbGVCdXR0b25TdGF0ZSgpO1xuICAgIHRoaXMuX2lucHV0TGlzdC5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAgKCkgPT4ge1xuICAgICAgICB0aGlzLl9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXQpO1xuICAgICAgICB0aGlzLnRvZ2dsZUJ1dHRvblN0YXRlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGVuYWJsZVZhbGlkYXRpb24oKSB7XG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgfTtcbn1cblxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XG4gICAgdGhpcy5fcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX3BvcHVwQ2xvc2VCdXR0b24gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2Nsb3NlLWJ1dHRvbicpO1xuICAgIHRoaXMuX3BvcHVwQ29udGFpbmVyID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwX19jb250YWluZXInKTtcbiAgfVxuICBvcGVuKCkge1xuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX2ZhZGUtb3V0Jyk7XG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LmFkZCgncG9wdXBfZmFkZS1pbicpO1xuICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX29wZW5lZCcpO1xuICAgICAgfSwgMTApO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9oYW5kbGVFc2NDbG9zZSk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLl9wb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9mYWRlLWluJyk7XG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LmFkZCgncG9wdXBfZmFkZS1vdXQnKTtcbiAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICB0aGlzLl9wb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9vcGVuZWQnKTtcbiAgICAgIH0sIDQwMCk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgfVxuXG4gIF9oYW5kbGVFc2NDbG9zZSA9IChldnQpID0+IHtcbiAgICBpZiAoZXZ0LmtleSA9PT0gJ0VzY2FwZScpe1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbn1cblxuICBfY2xvc2VPbkNsaWNrID0gKGV2dCkgPT4ge1xuICBpZiAoKGV2dC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwb3B1cF9vcGVuZWQnKSkgJiYgKGV2dC50YXJnZXQuY2xvc2VzdCgnLnBvcHVwX19jb250YWluZXInKSAhPT0gdGhpcy5fcG9wdXBDb250YWluZXIpIHx8IChldnQudGFyZ2V0LmNsb3Nlc3QoJy5wb3B1cF9fY2xvc2UtYnV0dG9uJykgPT09IHRoaXMuX3BvcHVwQ2xvc2VCdXR0b24pKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbnNldEV2ZW50TGlzdGVuZXJzKCkge1xuICB0aGlzLl9wb3B1cC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZXZ0KSA9PiB7XG4gICAgdGhpcy5fY2xvc2VPbkNsaWNrKGV2dCk7XG4gIH0gKTtcbn1cbn1cblxuXG5cbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhGb3JtIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yLCBzdWJtaXRGb3JtSGFuZGxlcikge1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX3N1Ym1pdEZvcm1IYW5kbGVyID0gc3VibWl0Rm9ybUhhbmRsZXI7XG4gICAgdGhpcy5fZm9ybSA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fZm9ybScpO1xuICAgIHRoaXMuX2lucHV0TGlzdCA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb3B1cF9faW5wdXQnKTtcbiAgfVxuXG4gIF9zdWJtaXRGb3JtSGFuZGxlckZ1bmN0aW9uID0gKGV2dCkgPT4ge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuX3N1Ym1pdEZvcm1IYW5kbGVyKHRoaXMuX2dldElucHV0VmFsdWVzKCkpO1xufVxuXG4gIF9nZXRJbnB1dFZhbHVlcygpe1xuICAgIHRoaXMuX2Zvcm1WYWx1ZXMgPSB7fTtcbiAgICB0aGlzLl9pbnB1dExpc3QuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgIHRoaXMuX2Zvcm1WYWx1ZXNbIGlucHV0Lm5hbWUgXSA9IGlucHV0LnZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiAgdGhpcy5fZm9ybVZhbHVlc1xuICB9XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKXtcbiAgICB0aGlzLl9mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuX3N1Ym1pdEZvcm1IYW5kbGVyRnVuY3Rpb24pO1xuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cblxuICBjbG9zZSgpe1xuICAgIHRoaXMuX2Zvcm0ucmVzZXQoKTtcbiAgICBzdXBlci5jbG9zZSgpO1xuICB9XG5cbn1cbiIsImltcG9ydCBQb3B1cCBmcm9tICcuL1BvcHVwLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9wb3B1cEltYWdlID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwX19pbWFnZScpO1xuICAgIHRoaXMuX3BvcHVwQ2FwdGlvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fY2FwdGlvbicpO1xuXG4gIH1cblxuICBvcGVuKGVsZW1lbnQpIHtcbiAgICB0aGlzLl9wb3B1cEltYWdlLnNyYyA9IGVsZW1lbnQubGluaztcbiAgICB0aGlzLl9wb3B1cEltYWdlLmFsdCA9IGVsZW1lbnQubmFtZTtcbiAgICB0aGlzLl9wb3B1cENhcHRpb24udGV4dENvbnRlbnQgPSBlbGVtZW50Lm5hbWU7XG4gICAgc3VwZXIub3BlbigpO1xuICB9XG59XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXAuanNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhTdWJtaXQgZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3Ipe1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpXG4gIH1cblxuICAvLyBfc3VibWl0RGVsZXRpb25IYW5kbGVyRnVuY3Rpb24gPSAoZXZ0KSA9PiB7XG4gIC8vICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gIC8vICAgdGhpcy5fc3VibWl0RGVsZXRpb25IYW5kbGVyKCk7XG4gIC8vIH1cblxuICBzZXRFdmVudExpc3RlbmVycygpe1xuICAgIHRoaXMuX3BvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5faGFuZGxlU3VibWl0Q2FsbGJhY2soKTtcbiAgICB9KVxuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cblxuICBzZXRTdWJtaXRBY3Rpb24oYWN0aW9uKSB7XG4gICAgdGhpcy5faGFuZGxlU3VibWl0Q2FsbGJhY2sgPSBhY3Rpb247XG4gIH1cbn1cbiIsIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHtyZW5kZXJlcn0sIGNvbnRhaW5lclNlbGVjdG9yKSB7XG4gICAgdGhpcy5fcmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICB0aGlzLl9jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lclNlbGVjdG9yKTtcbiAgfVxuXG4gICAgcmVuZGVySXRlbXMoY2FyZHMpIHtcbiAgICAgIGNhcmRzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIoZWxlbWVudCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRJdGVtKGRhdGEpe1xuXG4gICAgICB0aGlzLl9jb250YWluZXIucHJlcGVuZChkYXRhKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VySW5mbyB7XG4gIGNvbnN0cnVjdG9yKHVzZXJOYW1lLCB1c2VySm9iLCB1c2VyQXZhdGFyKSB7XG4gICAgdGhpcy5fdXNlck5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHVzZXJOYW1lKTtcbiAgICB0aGlzLl91c2VySm9iID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih1c2VySm9iKTtcbiAgICB0aGlzLl91c2VyQXZhdGFyID0gdXNlckF2YXRhcjtcbiAgfVxuXG5nZXRVc2VySW5mbyA9ICgpID0+IHtcbiAgY29uc3QgdXNlck5hbWUgPSB0aGlzLl91c2VyTmFtZS50ZXh0Q29udGVudDtcbiAgY29uc3QgdXNlckpvYiA9IHRoaXMuX3VzZXJKb2IudGV4dENvbnRlbnQ7XG4gIHJldHVybiB7dXNlck5hbWUsIHVzZXJKb2J9XG59XG5cbnNldFVzZXJJbmZvID0gKGRhdGEpID0+IHtcbiAgaWYgKGRhdGEubmFtZSwgZGF0YS5hYm91dCwgZGF0YS5hdmF0YXIpXG4gIHtcbiAgICB0aGlzLl91c2VyTmFtZS50ZXh0Q29udGVudCA9IGRhdGEubmFtZTtcbiAgICB0aGlzLl91c2VySm9iLnRleHRDb250ZW50ID0gZGF0YS5hYm91dDtcbiAgICB0aGlzLl91c2VyQXZhdGFyLnNyYyA9IGRhdGEuYXZhdGFyO1xuICB9XG59XG59XG4iLCJleHBvcnQgY29uc3QgY29uZmlnID0ge1xuICBzdWJtaXRCdXR0b246ICcucG9wdXBfX3NhdmUnLFxuICBwb3B1cElzSW52YWxpZDogJ3BvcHVwX19zYXZlX2Rpc2FibGVkJyxcbiAgaW5wdXQ6ICcucG9wdXBfX2lucHV0JyxcbiAgaW5wdXRFcnJvcjogJ3BvcHVwX19pbnB1dF90eXBlX2Vycm9yJyxcbiAgZXJyb3I6ICdlcnJvcidcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckxvYWRpbmcoZm9ybSwgaXNMb2FkaW5nKSB7XG4gICAgaWYgKGlzTG9hZGluZykge1xuICAgIGZvcm0ucXVlcnlTZWxlY3Rvcihjb25maWcuc3VibWl0QnV0dG9uKS50ZXh0Q29udGVudCA9ICfQodC+0YXRgNCw0L3QtdC90LjQtS4uLic7XG4gIH0gZWxzZSB7XG4gICAgZm9ybS5xdWVyeVNlbGVjdG9yKGNvbmZpZy5zdWJtaXRCdXR0b24pLnRleHRDb250ZW50ID0gJ9Ch0L7RhdGA0LDQvdC40YLRjCc7XG4gIH1cbn1cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL2luZGV4LmNzcyc7XG5pbXBvcnQgQ2FyZCBmcm9tICcuLi9zY3JpcHRzL2NvbXBvbmVudHMvQ2FyZC5qcyc7XG5pbXBvcnQgRm9ybVZhbGlkYXRvciBmcm9tICcuLi9zY3JpcHRzL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qcyc7XG5pbXBvcnQgU2VjdGlvbiBmcm9tICcuLi9zY3JpcHRzL2NvbXBvbmVudHMvU2VjdGlvbi5qcyc7XG5pbXBvcnQgUG9wdXBXaXRoSW1hZ2UgZnJvbSAnLi4vc2NyaXB0cy9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzJztcbmltcG9ydCBQb3B1cFdpdGhGb3JtIGZyb20gJy4uL3NjcmlwdHMvY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzJztcbmltcG9ydCBVc2VySW5mbyBmcm9tICcuLi9zY3JpcHRzL2NvbXBvbmVudHMvVXNlckluZm8uanMnO1xuaW1wb3J0IEFwaSBmcm9tICcuLi9zY3JpcHRzL2NvbXBvbmVudHMvQXBpLmpzJztcbmltcG9ydCBQb3B1cFdpdGhTdWJtaXQgZnJvbSAnLi4vc2NyaXB0cy9jb21wb25lbnRzL1BvcHVwV2l0aFN1Ym1pdCc7XG5pbXBvcnQge2NvbmZpZ30gZnJvbSAnLi4vc2NyaXB0cy91dGlscy9jb25zdGFudHMuanMnO1xuaW1wb3J0IHsgcmVuZGVyTG9hZGluZyB9IGZyb20gJy4uL3NjcmlwdHMvdXRpbHMvY29uc3RhbnRzLmpzJztcbmNvbnN0IGFwaSA9IG5ldyBBcGkoJ2h0dHBzOi8vbWVzdG8ubm9tb3JlcGFydGllcy5jby92MS9jb2hvcnQtNDMnLCAnMTNlMGQwMWEtMzYzMS00NWE1LWIzYTYtMWE3Zjg3Mjk1MDQ5JylcbmNvbnN0IHByb2ZpbGVPcGVuUG9wdXBCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZmlsZV9fZWRpdC1idXR0b24nKTtcbmNvbnN0IGZvcm1Qcm9maWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX19mb3JtX3Byb2ZpbGUnKTtcbmNvbnN0IG5hbWVJbnB1dCA9IGZvcm1Qcm9maWxlLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJzdXJuYW1lXCJdJyk7XG5jb25zdCBqb2JJbnB1dCA9IGZvcm1Qcm9maWxlLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJqb2JcIl0nKTtcbmNvbnN0IGVsZW1lbnRPcGVuUG9wdXBCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZmlsZV9fYWRkLWJ1dHRvbicpO1xuY29uc3QgZm9ybUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2Zvcm1fYWRkJyk7XG5jb25zdCBwb3B1cGVyUHJvZmlsZVdpdGhGb3JtID0gbmV3IFBvcHVwV2l0aEZvcm0oJy5wb3B1cF9wcm9maWxlJywgc3VibWl0Rm9ybVByb2ZpbGVIYW5kbGVyKVxuY29uc3QgZm9ybUF2YXRhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fZm9ybV9hdmF0YXInKTtcbmNvbnN0IGF2YXRhck9wZW5Qb3B1cEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9maWxlX19hdmF0YXItZWRpdC1idXR0b24nKTtcbmNvbnN0IGF2YXRhckltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2ZpbGVfX2F2YXRhcicpO1xuY29uc3QgcG9wdXBlckF2YXRhciA9IG5ldyBQb3B1cFdpdGhGb3JtKCcucG9wdXBfYXZhdGFyJywgc3VibWl0Rm9ybUF2YXRhckhhbmRsZXIpXG5jb25zdCB1c2VySW5mbyA9IG5ldyBVc2VySW5mbygnLnByb2ZpbGVfX25hbWUnLCAnLnByb2ZpbGVfX2JpbycsIGF2YXRhckltYWdlKVxuY29uc3QgcG9wdXBDb25maXJtID0gbmV3IFBvcHVwV2l0aFN1Ym1pdCgnLnBvcHVwX2RlbGV0ZScpXG5cbmNvbnN0IGNhcmRMaXN0ID0gbmV3IFNlY3Rpb24oe1xuICByZW5kZXJlcjogKGVsZW1lbnQpID0+IHtcbiAgICAgIGNhcmRMaXN0LmFkZEl0ZW0oY3JlYXRlQ2FyZChlbGVtZW50LCB1c2VySWQpKVxuICB9XG59LFxuJy5lbGVtZW50cycpO1xuXG5jb25zdCBwb3B1cEFkZENhcmQgPSBuZXcgUG9wdXBXaXRoRm9ybSgnLnBvcHVwX2FkZCcsIHN1Ym1pdEFkZENhcmRGb3JtKVxuXG5cbmxldCB1c2VySWQgPSBcIlwiO1xuXG5mdW5jdGlvbiBzdWJtaXRBZGRDYXJkRm9ybSAoZGF0YSkge1xuICByZW5kZXJMb2FkaW5nKGZvcm1FbGVtZW50LCB0cnVlKTtcbiAgYXBpLmFkZENhcmQoZGF0YSlcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgY2FyZExpc3QuYWRkSXRlbShjcmVhdGVDYXJkKGRhdGEsIHVzZXJJZCkpXG4gICAgICBwb3B1cEFkZENhcmQuY2xvc2UoKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pXG4gICAgLmZpbmFsbHkoKCk9PntcbiAgICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgcmVuZGVyTG9hZGluZyhmb3JtRWxlbWVudCwgZmFsc2UpO1xuICAgICAgfSwgNDAwKX0pfVxuXG5wb3B1cENvbmZpcm0uc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuZnVuY3Rpb24gc3VibWl0Rm9ybVByb2ZpbGVIYW5kbGVyKGRhdGEpIHtcbiAgcmVuZGVyTG9hZGluZyhmb3JtUHJvZmlsZSwgdHJ1ZSk7XG4gIGFwaS5hZGRQcm9maWxlKGRhdGEpXG4gIC50aGVuKChkYXRhKSA9PiB7XG4gICAgdXNlckluZm8uc2V0VXNlckluZm8oZGF0YSlcbiAgICBwb3B1cGVyUHJvZmlsZVdpdGhGb3JtLmNsb3NlKClcbiAgfSlcbiAgLmNhdGNoKChlcnIpID0+IHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9KVxuICAuZmluYWxseSgoKT0+e1xuICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgIHJlbmRlckxvYWRpbmcoZm9ybVByb2ZpbGUsIGZhbHNlKTtcbiAgICB9LCA0MDApO1xuICB9KVxufVxuXG5mdW5jdGlvbiBzdWJtaXRGb3JtQXZhdGFySGFuZGxlcihkYXRhKSB7XG4gIHJlbmRlckxvYWRpbmcoZm9ybUF2YXRhciwgdHJ1ZSk7XG4gIGFwaS5hZGRBdmF0YXIoZGF0YSlcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgYXZhdGFySW1hZ2Uuc3JjID0gZGF0YS5hdmF0YXI7XG4gICAgICBwb3B1cGVyQXZhdGFyLmNsb3NlKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KVxuICAgIC5maW5hbGx5KCgpPT57XG4gICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgIHJlbmRlckxvYWRpbmcoZm9ybUF2YXRhciwgZmFsc2UpO1xuICAgICAgfSwgNDAwKTtcbiAgICB9KVxufVxuXG5lbGVtZW50T3BlblBvcHVwQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBmb3JtVmFsaWRhdG9yc1sgZm9ybUVsZW1lbnQubmFtZSBdLnJlc2V0SW5wdXRFcnJvcigpO1xuICBmb3JtVmFsaWRhdG9yc1sgZm9ybUVsZW1lbnQubmFtZSBdLnRvZ2dsZUJ1dHRvblN0YXRlKClcbiAgcG9wdXBBZGRDYXJkLm9wZW4oKTtcbn0pO1xuXG5wb3B1cEFkZENhcmQuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuYXZhdGFySW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xuICBhdmF0YXJPcGVuUG9wdXBCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG59KVxuXG5hdmF0YXJJbWFnZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsICgpID0+IHtcbiAgYXZhdGFyT3BlblBvcHVwQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59KVxuXG5hdmF0YXJJbWFnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgZm9ybVZhbGlkYXRvcnNbIGZvcm1BdmF0YXIubmFtZSBdLnJlc2V0SW5wdXRFcnJvcigpO1xuICBmb3JtVmFsaWRhdG9yc1sgZm9ybUF2YXRhci5uYW1lIF0udG9nZ2xlQnV0dG9uU3RhdGUoKVxuICBwb3B1cGVyQXZhdGFyLm9wZW4oKTtcbiAgZm9ybVZhbGlkYXRvcnNbIGZvcm1BdmF0YXIubmFtZSBdLmVuYWJsZVZhbGlkYXRpb24oKTtcbn0pXG5cbnBvcHVwZXJBdmF0YXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuXG5cbmFwaS5nZXRBbGxOZWVkZWREYXRhKClcbiAgLnRoZW4oYXJndW1lbnQgPT4ge1xuICAgIGNvbnN0IFsgcHJvZmlsZUluZm8sIGluaXRpYWxDYXJkcyBdID0gYXJndW1lbnQ7XG4gICAgdXNlckluZm8uc2V0VXNlckluZm8ocHJvZmlsZUluZm8pO1xuICAgIHVzZXJJZCA9IHByb2ZpbGVJbmZvLl9pZDtcbiAgICBjYXJkTGlzdC5yZW5kZXJJdGVtcyhpbml0aWFsQ2FyZHMucmV2ZXJzZSgpKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pXG5cbnBvcHVwZXJQcm9maWxlV2l0aEZvcm0uc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxucHJvZmlsZU9wZW5Qb3B1cEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgZm9ybVZhbGlkYXRvcnNbIGZvcm1Qcm9maWxlLm5hbWUgXS50b2dnbGVCdXR0b25TdGF0ZSgpO1xuICBmb3JtVmFsaWRhdG9yc1sgZm9ybVByb2ZpbGUubmFtZSBdLnJlc2V0SW5wdXRFcnJvcigpO1xuICBwb3B1cGVyUHJvZmlsZVdpdGhGb3JtLm9wZW4oKTtcbiAgY29uc3QgaW5pdGlhbEluZm8gPSB1c2VySW5mby5nZXRVc2VySW5mbygpO1xuICBuYW1lSW5wdXQudmFsdWUgPSBpbml0aWFsSW5mby51c2VyTmFtZTtcbiAgam9iSW5wdXQudmFsdWUgPSBpbml0aWFsSW5mby51c2VySm9iO1xufSk7XG5cbmNvbnN0IHBvcHVwZXJab29tID0gbmV3IFBvcHVwV2l0aEltYWdlKCcucG9wdXBfem9vbScpXG5wb3B1cGVyWm9vbS5zZXRFdmVudExpc3RlbmVycygpO1xuXG5mdW5jdGlvbiBjcmVhdGVDYXJkKGVsZW1lbnQsIHVzZXJJZCl7XG4gIGNvbnN0IGNhcmQgPSBuZXcgQ2FyZChlbGVtZW50LCB1c2VySWQsXG4gICAgJy5pdGVtLXRlbXBsYXRlJyxcbiAgICB7aGFuZGxlQ2FyZENsaWNrOiAoKSA9PiB7XG4gICAgcG9wdXBlclpvb20ub3BlbihlbGVtZW50KX19LFxuICAgIHtkZWxldGVDbGlja0hhbmRsZXI6IChjYXJkSWQpID0+IHtcbiAgICAgIHBvcHVwQ29uZmlybS5vcGVuKCk7XG4gICAgICBwb3B1cENvbmZpcm0uc2V0U3VibWl0QWN0aW9uKCgpID0+IHtcbiAgICAgICAgYXBpLmRlbGV0ZUNhcmQoY2FyZElkKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgcG9wdXBDb25maXJtLmNsb3NlKCk7XG4gICAgICAgICAgY2FyZC5oYW5kbGVFbGVtZW50RGVsZXRlKClcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICB9KVxuICAgIH0pXG4gICAgfX0sXG4gICAge2xpa2VDbGlja0hhbmRsZXI6IChjYXJkSWQpID0+IHtcbiAgICAgIGFwaS5zZXRMaWtlKGNhcmRJZClcbiAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgIGNhcmQuaGFuZGxlU2V0TGlrZShkYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICB9KVxuICAgIH19LFxuICAgIHtyZXNldExpa2VDbGlja0hhbmRsZXI6IChjYXJkSWQpID0+IHtcbiAgICAgIGFwaS5yZXNldExpa2UoY2FyZElkKVxuICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgY2FyZC5oYW5kbGVSZXNldExpa2UoZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgfSlcbiAgICB9fVxuICAgIClcblxuICAgIHJldHVybiBjYXJkLmNyZWF0ZUNhcmQoKTtcbn1cblxuXG5jb25zdCBmb3JtVmFsaWRhdG9ycyA9IHt9XG5cbmNvbnN0IGVuYWJsZVZhbGlkYXRpb24gPSAoY29uZmlnKSA9PiB7XG4gIGNvbnN0IGZvcm1MaXN0ID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG9wdXBfX2Zvcm0nKSk7XG4gIGZvcm1MaXN0LmZvckVhY2goKGZvcm0pID0+IHtcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGV2dCkge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSlcbiAgICBjb25zdCBmb3JtVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IoY29uZmlnLCBmb3JtKTtcbiAgICBmb3JtVmFsaWRhdG9yc1sgZm9ybS5uYW1lIF0gPSBmb3JtVmFsaWRhdG9yO1xuICAgIGZvcm1WYWxpZGF0b3IuZW5hYmxlVmFsaWRhdGlvbigpO1xuICB9KTtcbn07XG5cbmVuYWJsZVZhbGlkYXRpb24oY29uZmlnKTtcblxuXG5cbiJdLCJuYW1lcyI6WyJBcGkiLCJ1cmwiLCJ0b2tlbiIsIl91cmwiLCJfdG9rZW4iLCJfaGVhZGVycyIsInJlcyIsIm9rIiwianNvbiIsIlByb21pc2UiLCJyZWplY3QiLCJhbGwiLCJnZXRQcm9maWxlIiwiZ2V0SW5pdGlhbENhcmRzIiwiZmV0Y2giLCJoZWFkZXJzIiwidGhlbiIsIl9jaGVja1NlcnZlclJlc3BvbnNlIiwiZGF0YSIsImJvZHkiLCJuYW1lIiwic3VybmFtZSIsImFib3V0Iiwiam9iIiwibWV0aG9kIiwiSlNPTiIsInN0cmluZ2lmeSIsImxpbmsiLCJjYXJkSWQiLCJhdmF0YXIiLCJDYXJkIiwidXNlcklkIiwiY2FyZFNlbGVjdG9yIiwiaGFuZGxlQ2FyZENsaWNrIiwiZGVsZXRlQ2xpY2tIYW5kbGVyIiwibGlrZUNsaWNrSGFuZGxlciIsInJlc2V0TGlrZUNsaWNrSGFuZGxlciIsIl9kYXRhIiwiX25hbWUiLCJfbGluayIsIl9jYXJkU2VsZWN0b3IiLCJfaGFuZGxlQ2FyZENsaWNrIiwiX2VsZW1lbnQiLCJfZ2V0VGVtcGxhdGUiLCJfY2FyZEltYWdlIiwicXVlcnlTZWxlY3RvciIsIl9saWtlQnV0dG9uIiwiX2VsZW1lbnROYW1lIiwiX2RlbGV0ZUJ1dHRvbiIsIl9saWtlQ291bnRlciIsIl9udW1iZXJPZkxpa2VzIiwibGlrZXMiLCJfb3duZXJJZCIsIm93bmVyIiwiX2lkIiwiX3VzZXJJZCIsIl9kZWxldGVDbGlja0hhbmRsZXIiLCJfbGlrZUNsaWNrSGFuZGxlciIsIl9yZXNldGxpa2VDbGlja0hhbmRsZXIiLCJfaXNMaWtlZCIsIm1hcCIsImVsIiwiaW5jbHVkZXMiLCJuZXdJdGVtIiwiZG9jdW1lbnQiLCJjb250ZW50IiwiY2xvbmVOb2RlIiwiX2FkZExpc3RlbmVycyIsInNyYyIsImFsdCIsInRleHRDb250ZW50IiwibGVuZ3RoIiwidG9TdHJpbmciLCJjbGFzc0xpc3QiLCJhZGQiLCJzdHlsZSIsImRpc3BsYXkiLCJhZGRFdmVudExpc3RlbmVyIiwiX2dldElkIiwiX2xpa2VIYW5kbGVyIiwiZXZ0IiwicmVtb3ZlIiwiRm9ybVZhbGlkYXRvciIsImNvbmZpZyIsImZvcm0iLCJfc3VibWl0QnV0dG9uIiwic3VibWl0QnV0dG9uIiwiX3BvcHVwSXNJbnZhbGlkIiwicG9wdXBJc0ludmFsaWQiLCJfaW5wdXQiLCJpbnB1dCIsIl9pbnB1dEVycm9yIiwiaW5wdXRFcnJvciIsIl9lcnJvciIsImVycm9yIiwiX2Zvcm0iLCJfaW5wdXRMaXN0IiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsIl9idXR0b24iLCJpZCIsInZhbGlkYXRpb25NZXNzYWdlIiwidmFsaWRpdHkiLCJ2YWxpZCIsIl9zaG93SW5wdXRFcnJvciIsIl9oaWRlSW5wdXRFcnJvciIsInNvbWUiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJmb3JFYWNoIiwiX2hhc0ludmFsaWRJbnB1dCIsIl9kaXNhYmxlQnV0dG9uIiwiX2VuYWJsZUJ1dHRvbiIsInRvZ2dsZUJ1dHRvblN0YXRlIiwiX2NoZWNrSW5wdXRWYWxpZGl0eSIsIl9zZXRFdmVudExpc3RlbmVycyIsIlBvcHVwIiwicG9wdXBTZWxlY3RvciIsImtleSIsImNsb3NlIiwidGFyZ2V0IiwiY29udGFpbnMiLCJjbG9zZXN0IiwiX3BvcHVwQ29udGFpbmVyIiwiX3BvcHVwQ2xvc2VCdXR0b24iLCJfcG9wdXAiLCJzZXRUaW1lb3V0IiwiX2hhbmRsZUVzY0Nsb3NlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIl9jbG9zZU9uQ2xpY2siLCJQb3B1cFdpdGhGb3JtIiwic3VibWl0Rm9ybUhhbmRsZXIiLCJwcmV2ZW50RGVmYXVsdCIsIl9zdWJtaXRGb3JtSGFuZGxlciIsIl9nZXRJbnB1dFZhbHVlcyIsIl9mb3JtVmFsdWVzIiwidmFsdWUiLCJfc3VibWl0Rm9ybUhhbmRsZXJGdW5jdGlvbiIsInJlc2V0IiwiUG9wdXBXaXRoSW1hZ2UiLCJfcG9wdXBJbWFnZSIsIl9wb3B1cENhcHRpb24iLCJlbGVtZW50IiwiUG9wdXBXaXRoU3VibWl0IiwiX2hhbmRsZVN1Ym1pdENhbGxiYWNrIiwiYWN0aW9uIiwiU2VjdGlvbiIsImNvbnRhaW5lclNlbGVjdG9yIiwicmVuZGVyZXIiLCJfcmVuZGVyZXIiLCJfY29udGFpbmVyIiwiY2FyZHMiLCJwcmVwZW5kIiwiVXNlckluZm8iLCJ1c2VyTmFtZSIsInVzZXJKb2IiLCJ1c2VyQXZhdGFyIiwiX3VzZXJOYW1lIiwiX3VzZXJKb2IiLCJfdXNlckF2YXRhciIsInJlbmRlckxvYWRpbmciLCJpc0xvYWRpbmciLCJhcGkiLCJwcm9maWxlT3BlblBvcHVwQnV0dG9uIiwiZm9ybVByb2ZpbGUiLCJuYW1lSW5wdXQiLCJqb2JJbnB1dCIsImVsZW1lbnRPcGVuUG9wdXBCdXR0b24iLCJmb3JtRWxlbWVudCIsInBvcHVwZXJQcm9maWxlV2l0aEZvcm0iLCJzdWJtaXRGb3JtUHJvZmlsZUhhbmRsZXIiLCJmb3JtQXZhdGFyIiwiYXZhdGFyT3BlblBvcHVwQnV0dG9uIiwiYXZhdGFySW1hZ2UiLCJwb3B1cGVyQXZhdGFyIiwic3VibWl0Rm9ybUF2YXRhckhhbmRsZXIiLCJ1c2VySW5mbyIsInBvcHVwQ29uZmlybSIsImNhcmRMaXN0IiwiYWRkSXRlbSIsImNyZWF0ZUNhcmQiLCJwb3B1cEFkZENhcmQiLCJzdWJtaXRBZGRDYXJkRm9ybSIsImFkZENhcmQiLCJjYXRjaCIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJmaW5hbGx5Iiwic2V0RXZlbnRMaXN0ZW5lcnMiLCJhZGRQcm9maWxlIiwic2V0VXNlckluZm8iLCJhZGRBdmF0YXIiLCJmb3JtVmFsaWRhdG9ycyIsInJlc2V0SW5wdXRFcnJvciIsIm9wZW4iLCJlbmFibGVWYWxpZGF0aW9uIiwiZ2V0QWxsTmVlZGVkRGF0YSIsImFyZ3VtZW50IiwicHJvZmlsZUluZm8iLCJpbml0aWFsQ2FyZHMiLCJyZW5kZXJJdGVtcyIsInJldmVyc2UiLCJpbml0aWFsSW5mbyIsImdldFVzZXJJbmZvIiwicG9wdXBlclpvb20iLCJjYXJkIiwic2V0U3VibWl0QWN0aW9uIiwiZGVsZXRlQ2FyZCIsImhhbmRsZUVsZW1lbnREZWxldGUiLCJzZXRMaWtlIiwiaGFuZGxlU2V0TGlrZSIsInJlc2V0TGlrZSIsImhhbmRsZVJlc2V0TGlrZSIsImZvcm1MaXN0IiwiZm9ybVZhbGlkYXRvciJdLCJzb3VyY2VSb290IjoiIn0=