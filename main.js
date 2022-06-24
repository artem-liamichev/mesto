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
  var userId = profileInfo._id;
  var cardList = new _scripts_components_Section_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
    renderer: function renderer(element) {
      cardList.addItem(createCard(element, userId));
    }
  }, '.elements');
  cardList.renderItems(initialCards.reverse());
  var popupAddCard = new _scripts_components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__["default"]('.popup_add', submitAddCardForm);

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

  elementOpenPopupButton.addEventListener('click', function () {
    formValidators[formElement.name].resetInputError();
    formValidators[formElement.name].toggleButtonState();
    popupAddCard.open();
  });
  popupAddCard.setEventListeners();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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REFBRCxDQUFoQixDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL0FwaS5qcyIsIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvQ2FyZC5qcyIsIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvUG9wdXAuanMiLCJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanMiLCJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzIiwid2VicGFjazovL21lc3RvLy4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9Qb3B1cFdpdGhTdWJtaXQuanMiLCJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL1NlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL1VzZXJJbmZvLmpzIiwid2VicGFjazovL21lc3RvLy4vc3JjL3NjcmlwdHMvdXRpbHMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL21lc3RvLy4vc3JjL3BhZ2VzL2luZGV4LmNzcyIsIndlYnBhY2s6Ly9tZXN0by93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tZXN0by93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWVzdG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tZXN0by93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21lc3RvLy4vc3JjL3BhZ2VzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwaSB7XG4gIGNvbnN0cnVjdG9yKHVybCwgdG9rZW4pIHtcbiAgICB0aGlzLl91cmwgPSB1cmw7XG4gICAgdGhpcy5fdG9rZW4gPSB0b2tlbjtcbiAgICB0aGlzLl9oZWFkZXJzID0ge1xuICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICdBdXRob3JpemF0aW9uJzogdGhpcy5fdG9rZW4sXG4gICAgfVxuICB9XG5cbiAgX2NoZWNrU2VydmVyUmVzcG9uc2UocmVzKXtcbiAgICBpZiAocmVzLm9rKSB7XG4gICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCfQktC+0LfQvdC40LrQu9CwINC+0YjQuNCx0LrQsCcpXG4gIH1cblxuICBnZXRBbGxOZWVkZWREYXRhKCkge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChbdGhpcy5nZXRQcm9maWxlKCksIHRoaXMuZ2V0SW5pdGlhbENhcmRzKCldKVxuICB9XG5cbiAgZ2V0SW5pdGlhbENhcmRzKCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLl91cmx9L2NhcmRzL2AsIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnNcbiAgICB9KVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hlY2tTZXJ2ZXJSZXNwb25zZShyZXMpO1xuICAgICAgfSlcbiAgfVxuXG4gIGdldFByb2ZpbGUoKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX3VybH0vdXNlcnMvbWVgLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzXG4gICAgfSlcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoZWNrU2VydmVyUmVzcG9uc2UocmVzKTtcbiAgICAgIH0pXG4gIH1cblxuICBhZGRQcm9maWxlKGRhdGEpIHtcbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgbmFtZTogZGF0YS5zdXJuYW1lLFxuICAgICAgYWJvdXQ6IGRhdGEuam9iXG4gICAgfVxuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLl91cmx9L3VzZXJzL21lYCwge1xuICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpXG59KVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl9jaGVja1NlcnZlclJlc3BvbnNlKHJlcyk7XG4gICAgfSlcbiAgfVxuXG4gIGFkZENhcmQoZGF0YSkge1xuICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICBuYW1lOiBkYXRhLm5hbWUsXG4gICAgICBsaW5rOiBkYXRhLmxpbmtcbiAgICB9XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX3VybH0vY2FyZHMvYCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSlcbn0pXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuX2NoZWNrU2VydmVyUmVzcG9uc2UocmVzKTtcbiAgICB9KVxuICB9XG5cbiAgZGVsZXRlQ2FyZChjYXJkSWQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5fdXJsfS9jYXJkcy8ke2NhcmRJZH1gLCB7XG4gICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl9jaGVja1NlcnZlclJlc3BvbnNlKHJlcyk7XG4gICAgfSlcbiAgfVxuXG4gIHNldExpa2UoY2FyZElkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX3VybH0vY2FyZHMvJHtjYXJkSWR9L2xpa2VzYCwge1xuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fY2hlY2tTZXJ2ZXJSZXNwb25zZShyZXMpO1xuICAgIH0pXG4gIH1cblxuICByZXNldExpa2UoY2FyZElkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX3VybH0vY2FyZHMvJHtjYXJkSWR9L2xpa2VzYCwge1xuICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fY2hlY2tTZXJ2ZXJSZXNwb25zZShyZXMpO1xuICAgIH0pXG4gIH1cblxuICBhZGRBdmF0YXIoZGF0YSkge1xuICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICBhdmF0YXI6IGRhdGEuYXZhdGFyLFxuICAgIH1cbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5fdXJsfS91c2Vycy9tZS9hdmF0YXJgLCB7XG4gICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSlcbn0pXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuX2NoZWNrU2VydmVyUmVzcG9uc2UocmVzKTtcbiAgICB9KVxuICB9XG4gfVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyZCB7XG4gIGNvbnN0cnVjdG9yKGRhdGEsIHVzZXJJZCwgY2FyZFNlbGVjdG9yLCB7aGFuZGxlQ2FyZENsaWNrfSwge2RlbGV0ZUNsaWNrSGFuZGxlcn0sIHtsaWtlQ2xpY2tIYW5kbGVyfSwge3Jlc2V0TGlrZUNsaWNrSGFuZGxlcn0pIHtcbiAgICB0aGlzLl9kYXRhID0gZGF0YTtcbiAgICB0aGlzLl9uYW1lID0gZGF0YS5uYW1lO1xuICAgIHRoaXMuX2xpbmsgPSBkYXRhLmxpbms7XG4gICAgdGhpcy5fY2FyZFNlbGVjdG9yID0gY2FyZFNlbGVjdG9yO1xuICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljayA9IGhhbmRsZUNhcmRDbGljaztcbiAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fZ2V0VGVtcGxhdGUoKTtcbiAgICB0aGlzLl9jYXJkSW1hZ2UgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbGVtZW50X19pbWFnZScpO1xuICAgIHRoaXMuX2xpa2VCdXR0b24gPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbGVtZW50X19saWtlLWJ1dHRvbicpO1xuICAgIHRoaXMuX2VsZW1lbnROYW1lID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZWxlbWVudF9fbmFtZScpO1xuICAgIHRoaXMuX2RlbGV0ZUJ1dHRvbiA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcignLmVsZW1lbnRfX2RlbGV0ZS1idXR0b24nKTtcbiAgICB0aGlzLl9saWtlQ291bnRlciA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcignLmVsZW1lbnRfX2xpa2UtbnVtYmVyJyk7XG4gICAgdGhpcy5fbnVtYmVyT2ZMaWtlcyA9IGRhdGEubGlrZXM7XG4gICAgdGhpcy5fb3duZXJJZCA9IGRhdGEub3duZXIuX2lkO1xuICAgIHRoaXMuX3VzZXJJZCA9IHVzZXJJZDtcbiAgICB0aGlzLl9kZWxldGVDbGlja0hhbmRsZXIgPSBkZWxldGVDbGlja0hhbmRsZXI7XG4gICAgdGhpcy5fbGlrZUNsaWNrSGFuZGxlciA9IGxpa2VDbGlja0hhbmRsZXI7XG4gICAgdGhpcy5fcmVzZXRsaWtlQ2xpY2tIYW5kbGVyID0gcmVzZXRMaWtlQ2xpY2tIYW5kbGVyO1xuICAgIHRoaXMuX2lzTGlrZWQgPSB0aGlzLl9kYXRhLmxpa2VzLm1hcCgoZWwpID0+IGVsLl9pZCkuaW5jbHVkZXModGhpcy5fdXNlcklkKTtcbiAgfVxuICBfZ2V0VGVtcGxhdGUoKSB7XG4gICAgY29uc3QgbmV3SXRlbSA9IGRvY3VtZW50XG4gICAgLnF1ZXJ5U2VsZWN0b3IodGhpcy5fY2FyZFNlbGVjdG9yKVxuICAgIC5jb250ZW50XG4gICAgLnF1ZXJ5U2VsZWN0b3IoJy5lbGVtZW50JylcbiAgICAuY2xvbmVOb2RlKHRydWUpO1xuICAgIHJldHVybiBuZXdJdGVtXG4gIH1cblxuICBjcmVhdGVDYXJkKCkge1xuICAgIHRoaXMuX2FkZExpc3RlbmVycygpO1xuICAgIHRoaXMuX2NhcmRJbWFnZS5zcmMgPSB0aGlzLl9saW5rXG4gICAgdGhpcy5fY2FyZEltYWdlLmFsdCA9IHRoaXMuX25hbWVcbiAgICB0aGlzLl9lbGVtZW50TmFtZS50ZXh0Q29udGVudCA9IHRoaXMuX25hbWVcbiAgICB0aGlzLl9saWtlQ291bnRlci50ZXh0Q29udGVudCA9IHRoaXMuX251bWJlck9mTGlrZXMubGVuZ3RoLnRvU3RyaW5nKClcblxuICAgIGlmICh0aGlzLl9pc0xpa2VkKSB7XG4gICAgICB0aGlzLl9saWtlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJlbGVtZW50X19saWtlLWJ1dHRvbl9hY3RpdmVcIik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX293bmVySWQgPT09IHRoaXMuX3VzZXJJZCkge1xuICAgICAgdGhpcy5fZGVsZXRlQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcImdyaWRcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudDtcbiAgfVxuXG4gIF9nZXRJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YS5faWQ7XG4gIH1cblxuICBfYWRkTGlzdGVuZXJzKCkge1xuICAgIHRoaXMuX2RlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuX2RlbGV0ZUNsaWNrSGFuZGxlcih0aGlzLl9nZXRJZCgpKTtcbiAgICB9KTtcbiAgICB0aGlzLl9saWtlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5fbGlrZUhhbmRsZXIodGhpcy5fZ2V0SWQoKSk7XG4gICAgfSk7XG4gICAgdGhpcy5fY2FyZEltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dCkgPT4ge1xuICAgICAgdGhpcy5faGFuZGxlQ2FyZENsaWNrKGV2dCk7XG4gICAgfSk7XG4gIH07XG5cbiAgX2xpa2VIYW5kbGVyKCl7XG4gICAgaWYgKHRoaXMuX2lzTGlrZWQpIHtcbiAgICAgIHRoaXMuX3Jlc2V0bGlrZUNsaWNrSGFuZGxlcih0aGlzLl9nZXRJZCgpKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9saWtlQ2xpY2tIYW5kbGVyKHRoaXMuX2dldElkKCkpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUVsZW1lbnREZWxldGUoKSB7XG4gICAgdGhpcy5fZWxlbWVudC5yZW1vdmUoKTtcbiAgICB0aGlzLl9lbGVtZW50ID0gbnVsbDtcbiAgfVxuXG4gIGhhbmRsZVNldExpa2UoZGF0YSkge1xuICAgIHRoaXMuX2xpa2VDb3VudGVyLnRleHRDb250ZW50ID0gZGF0YS5saWtlcy5sZW5ndGgudG9TdHJpbmcoKTtcbiAgICB0aGlzLl9saWtlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJlbGVtZW50X19saWtlLWJ1dHRvbl9hY3RpdmVcIik7XG4gICAgdGhpcy5faXNMaWtlZCA9IHRydWU7XG4gIH1cbiAgaGFuZGxlUmVzZXRMaWtlKGRhdGEpIHtcbiAgICB0aGlzLl9saWtlQ291bnRlci50ZXh0Q29udGVudCA9IGRhdGEubGlrZXMubGVuZ3RoLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5fbGlrZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiZWxlbWVudF9fbGlrZS1idXR0b25fYWN0aXZlXCIpO1xuICAgIHRoaXMuX2lzTGlrZWQgPSBmYWxzZTtcblxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtVmFsaWRhdG9yIHtcbiAgY29uc3RydWN0b3IoY29uZmlnLCBmb3JtKSB7XG4gICAgdGhpcy5fc3VibWl0QnV0dG9uID0gY29uZmlnLnN1Ym1pdEJ1dHRvbjtcbiAgICB0aGlzLl9wb3B1cElzSW52YWxpZCA9IGNvbmZpZy5wb3B1cElzSW52YWxpZDtcbiAgICB0aGlzLl9pbnB1dCA9IGNvbmZpZy5pbnB1dDtcbiAgICB0aGlzLl9pbnB1dEVycm9yID0gY29uZmlnLmlucHV0RXJyb3I7XG4gICAgdGhpcy5fZXJyb3IgPSBjb25maWcuZXJyb3I7XG4gICAgdGhpcy5fZm9ybSA9IGZvcm07XG4gICAgdGhpcy5faW5wdXRMaXN0ID0gQXJyYXkuZnJvbSh0aGlzLl9mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5faW5wdXQpKTtcbiAgICB0aGlzLl9idXR0b24gPSB0aGlzLl9mb3JtLnF1ZXJ5U2VsZWN0b3IodGhpcy5fc3VibWl0QnV0dG9uKTtcbiAgfVxuXG4gIF9zaG93SW5wdXRFcnJvcihpbnB1dCkge1xuICAgIGNvbnN0IGVycm9yID0gdGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yKGAuJHtpbnB1dC5pZH0tZXJyb3JgKTtcbiAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKHRoaXMuX2lucHV0RXJyb3IpO1xuICAgIGVycm9yLnRleHRDb250ZW50ID0gaW5wdXQudmFsaWRhdGlvbk1lc3NhZ2U7XG4gICAgZXJyb3IuY2xhc3NMaXN0LmFkZCh0aGlzLl9lcnJvcik7XG4gIH1cblxuICBfY2hlY2tJbnB1dFZhbGlkaXR5IChpbnB1dCkge1xuICAgIGlmICghaW5wdXQudmFsaWRpdHkudmFsaWQpIHtcbiAgICAgIHRoaXMuX3Nob3dJbnB1dEVycm9yKGlucHV0LCBpbnB1dC52YWxpZGF0aW9uTWVzc2FnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKGlucHV0KTtcbiAgICB9XG4gIH07XG5cbiAgX2hpZGVJbnB1dEVycm9yIChpbnB1dCkge1xuICAgIGNvbnN0IGVycm9yID0gdGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yKGAuJHtpbnB1dC5pZH0tZXJyb3JgKTtcbiAgICBpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2lucHV0RXJyb3IpO1xuICAgIGVycm9yLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fZXJyb3IpO1xuICAgIGVycm9yLnRleHRDb250ZW50ID0gJyc7XG4gIH07XG5cblxuICBfaGFzSW52YWxpZElucHV0KCkge1xuICAgIHJldHVybiB0aGlzLl9pbnB1dExpc3Quc29tZSgoaW5wdXQpID0+IHtcbiAgICAgICAgcmV0dXJuICFpbnB1dC52YWxpZGl0eS52YWxpZDtcbiAgICB9KVxuICB9XG5cbiAgX2Rpc2FibGVCdXR0b24oKSB7XG4gICAgdGhpcy5fYnV0dG9uLmNsYXNzTGlzdC5hZGQodGhpcy5fcG9wdXBJc0ludmFsaWQpO1xuICAgIHRoaXMuX2J1dHRvbi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gIH1cblxuICBfZW5hYmxlQnV0dG9uKCkge1xuICAgIHRoaXMuX2J1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX3BvcHVwSXNJbnZhbGlkKTtcbiAgICB0aGlzLl9idXR0b24ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICB9XG5cbiAgcmVzZXRJbnB1dEVycm9yKCl7XG4gICAgdGhpcy5faW5wdXRMaXN0LmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dCk7XG4gICAgfSlcbiAgfVxuXG4gIHRvZ2dsZUJ1dHRvblN0YXRlKCkge1xuICAgIGlmICh0aGlzLl9oYXNJbnZhbGlkSW5wdXQoKSkge1xuICAgICAgdGhpcy5fZGlzYWJsZUJ1dHRvbigpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VuYWJsZUJ1dHRvbigpXG4gICAgICB9XG4gICAgfVxuXG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLnRvZ2dsZUJ1dHRvblN0YXRlKCk7XG4gICAgdGhpcy5faW5wdXRMaXN0LmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dCk7XG4gICAgICAgIHRoaXMudG9nZ2xlQnV0dG9uU3RhdGUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZW5hYmxlVmFsaWRhdGlvbigpIHtcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xuICB9O1xufVxuXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICB0aGlzLl9wb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5fcG9wdXBDbG9zZUJ1dHRvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fY2xvc2UtYnV0dG9uJyk7XG4gICAgdGhpcy5fcG9wdXBDb250YWluZXIgPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2NvbnRhaW5lcicpO1xuICB9XG4gIG9wZW4oKSB7XG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfZmFkZS1vdXQnKTtcbiAgICB0aGlzLl9wb3B1cC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9mYWRlLWluJyk7XG4gICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LmFkZCgncG9wdXBfb3BlbmVkJyk7XG4gICAgICB9LCAxMCk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX2ZhZGUtaW4nKTtcbiAgICB0aGlzLl9wb3B1cC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9mYWRlLW91dCcpO1xuICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX29wZW5lZCcpO1xuICAgICAgfSwgNDAwKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xuICB9XG5cbiAgX2hhbmRsZUVzY0Nsb3NlID0gKGV2dCkgPT4ge1xuICAgIGlmIChldnQua2V5ID09PSAnRXNjYXBlJyl7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxufVxuXG4gIF9jbG9zZU9uQ2xpY2sgPSAoZXZ0KSA9PiB7XG4gIGlmICgoZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3BvcHVwX29wZW5lZCcpKSAmJiAoZXZ0LnRhcmdldC5jbG9zZXN0KCcucG9wdXBfX2NvbnRhaW5lcicpICE9PSB0aGlzLl9wb3B1cENvbnRhaW5lcikgfHwgKGV2dC50YXJnZXQuY2xvc2VzdCgnLnBvcHVwX19jbG9zZS1idXR0b24nKSA9PT0gdGhpcy5fcG9wdXBDbG9zZUJ1dHRvbikpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gIHRoaXMuX3BvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChldnQpID0+IHtcbiAgICB0aGlzLl9jbG9zZU9uQ2xpY2soZXZ0KTtcbiAgfSApO1xufVxufVxuXG5cblxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aEZvcm0gZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IsIHN1Ym1pdEZvcm1IYW5kbGVyKSB7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5fc3VibWl0Rm9ybUhhbmRsZXIgPSBzdWJtaXRGb3JtSGFuZGxlcjtcbiAgICB0aGlzLl9mb3JtID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwX19mb3JtJyk7XG4gICAgdGhpcy5faW5wdXRMaXN0ID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvckFsbCgnLnBvcHVwX19pbnB1dCcpO1xuICB9XG5cbiAgX3N1Ym1pdEZvcm1IYW5kbGVyRnVuY3Rpb24gPSAoZXZ0KSA9PiB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5fc3VibWl0Rm9ybUhhbmRsZXIodGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKSk7XG59XG5cbiAgX2dldElucHV0VmFsdWVzKCl7XG4gICAgdGhpcy5fZm9ybVZhbHVlcyA9IHt9O1xuICAgIHRoaXMuX2lucHV0TGlzdC5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgdGhpcy5fZm9ybVZhbHVlc1sgaW5wdXQubmFtZSBdID0gaW5wdXQudmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuICB0aGlzLl9mb3JtVmFsdWVzXG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVycygpe1xuICAgIHRoaXMuX2Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5fc3VibWl0Rm9ybUhhbmRsZXJGdW5jdGlvbik7XG4gICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIGNsb3NlKCl7XG4gICAgdGhpcy5fZm9ybS5yZXNldCgpO1xuICAgIHN1cGVyLmNsb3NlKCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IFBvcHVwIGZyb20gJy4vUG9wdXAuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhJbWFnZSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX3BvcHVwSW1hZ2UgPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2ltYWdlJyk7XG4gICAgdGhpcy5fcG9wdXBDYXB0aW9uID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwX19jYXB0aW9uJyk7XG5cbiAgfVxuXG4gIG9wZW4oZWxlbWVudCkge1xuICAgIHRoaXMuX3BvcHVwSW1hZ2Uuc3JjID0gZWxlbWVudC5saW5rO1xuICAgIHRoaXMuX3BvcHVwSW1hZ2UuYWx0ID0gZWxlbWVudC5uYW1lO1xuICAgIHRoaXMuX3BvcHVwQ2FwdGlvbi50ZXh0Q29udGVudCA9IGVsZW1lbnQubmFtZTtcbiAgICBzdXBlci5vcGVuKCk7XG4gIH1cbn1cbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cC5qc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aFN1Ym1pdCBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcil7XG4gICAgc3VwZXIocG9wdXBTZWxlY3RvcilcbiAgfVxuXG4gIC8vIF9zdWJtaXREZWxldGlvbkhhbmRsZXJGdW5jdGlvbiA9IChldnQpID0+IHtcbiAgLy8gICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgLy8gICB0aGlzLl9zdWJtaXREZWxldGlvbkhhbmRsZXIoKTtcbiAgLy8gfVxuXG4gIHNldEV2ZW50TGlzdGVuZXJzKCl7XG4gICAgdGhpcy5fcG9wdXAuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2dCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLl9oYW5kbGVTdWJtaXRDYWxsYmFjaygpO1xuICAgIH0pXG4gICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIHNldFN1Ym1pdEFjdGlvbihhY3Rpb24pIHtcbiAgICB0aGlzLl9oYW5kbGVTdWJtaXRDYWxsYmFjayA9IGFjdGlvbjtcbiAgfVxufVxuIiwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIHtcbiAgY29uc3RydWN0b3Ioe3JlbmRlcmVyfSwgY29udGFpbmVyU2VsZWN0b3IpIHtcbiAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xuICAgIHRoaXMuX2NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyU2VsZWN0b3IpO1xuICB9XG5cbiAgICByZW5kZXJJdGVtcyhjYXJkcykge1xuICAgICAgY2FyZHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICB0aGlzLl9yZW5kZXJlcihlbGVtZW50KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGFkZEl0ZW0oZGF0YSl7XG5cbiAgICAgIHRoaXMuX2NvbnRhaW5lci5wcmVwZW5kKGRhdGEpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJJbmZvIHtcbiAgY29uc3RydWN0b3IodXNlck5hbWUsIHVzZXJKb2IsIHVzZXJBdmF0YXIpIHtcbiAgICB0aGlzLl91c2VyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodXNlck5hbWUpO1xuICAgIHRoaXMuX3VzZXJKb2IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHVzZXJKb2IpO1xuICAgIHRoaXMuX3VzZXJBdmF0YXIgPSB1c2VyQXZhdGFyO1xuICB9XG5cbmdldFVzZXJJbmZvID0gKCkgPT4ge1xuICBjb25zdCB1c2VyTmFtZSA9IHRoaXMuX3VzZXJOYW1lLnRleHRDb250ZW50O1xuICBjb25zdCB1c2VySm9iID0gdGhpcy5fdXNlckpvYi50ZXh0Q29udGVudDtcbiAgcmV0dXJuIHt1c2VyTmFtZSwgdXNlckpvYn1cbn1cblxuc2V0VXNlckluZm8gPSAoZGF0YSkgPT4ge1xuICBpZiAoZGF0YS5uYW1lLCBkYXRhLmFib3V0LCBkYXRhLmF2YXRhcilcbiAge1xuICAgIHRoaXMuX3VzZXJOYW1lLnRleHRDb250ZW50ID0gZGF0YS5uYW1lO1xuICAgIHRoaXMuX3VzZXJKb2IudGV4dENvbnRlbnQgPSBkYXRhLmFib3V0O1xuICAgIHRoaXMuX3VzZXJBdmF0YXIuc3JjID0gZGF0YS5hdmF0YXI7XG4gIH1cbn1cbn1cbiIsImV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIHN1Ym1pdEJ1dHRvbjogJy5wb3B1cF9fc2F2ZScsXG4gIHBvcHVwSXNJbnZhbGlkOiAncG9wdXBfX3NhdmVfZGlzYWJsZWQnLFxuICBpbnB1dDogJy5wb3B1cF9faW5wdXQnLFxuICBpbnB1dEVycm9yOiAncG9wdXBfX2lucHV0X3R5cGVfZXJyb3InLFxuICBlcnJvcjogJ2Vycm9yJ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyTG9hZGluZyhmb3JtLCBpc0xvYWRpbmcpIHtcbiAgICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgZm9ybS5xdWVyeVNlbGVjdG9yKGNvbmZpZy5zdWJtaXRCdXR0b24pLnRleHRDb250ZW50ID0gJ9Ch0L7RhdGA0LDQvdC10L3QuNC1Li4uJztcbiAgfSBlbHNlIHtcbiAgICBmb3JtLnF1ZXJ5U2VsZWN0b3IoY29uZmlnLnN1Ym1pdEJ1dHRvbikudGV4dENvbnRlbnQgPSAn0KHQvtGF0YDQsNC90LjRgtGMJztcbiAgfVxufVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4vaW5kZXguY3NzJztcbmltcG9ydCBDYXJkIGZyb20gJy4uL3NjcmlwdHMvY29tcG9uZW50cy9DYXJkLmpzJztcbmltcG9ydCBGb3JtVmFsaWRhdG9yIGZyb20gJy4uL3NjcmlwdHMvY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzJztcbmltcG9ydCBTZWN0aW9uIGZyb20gJy4uL3NjcmlwdHMvY29tcG9uZW50cy9TZWN0aW9uLmpzJztcbmltcG9ydCBQb3B1cFdpdGhJbWFnZSBmcm9tICcuLi9zY3JpcHRzL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanMnO1xuaW1wb3J0IFBvcHVwV2l0aEZvcm0gZnJvbSAnLi4vc2NyaXB0cy9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanMnO1xuaW1wb3J0IFVzZXJJbmZvIGZyb20gJy4uL3NjcmlwdHMvY29tcG9uZW50cy9Vc2VySW5mby5qcyc7XG5pbXBvcnQgQXBpIGZyb20gJy4uL3NjcmlwdHMvY29tcG9uZW50cy9BcGkuanMnO1xuaW1wb3J0IFBvcHVwV2l0aFN1Ym1pdCBmcm9tICcuLi9zY3JpcHRzL2NvbXBvbmVudHMvUG9wdXBXaXRoU3VibWl0JztcbmltcG9ydCB7Y29uZmlnfSBmcm9tICcuLi9zY3JpcHRzL3V0aWxzL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgeyByZW5kZXJMb2FkaW5nIH0gZnJvbSAnLi4vc2NyaXB0cy91dGlscy9jb25zdGFudHMuanMnO1xuY29uc3QgYXBpID0gbmV3IEFwaSgnaHR0cHM6Ly9tZXN0by5ub21vcmVwYXJ0aWVzLmNvL3YxL2NvaG9ydC00MycsICcxM2UwZDAxYS0zNjMxLTQ1YTUtYjNhNi0xYTdmODcyOTUwNDknKVxuY29uc3QgcHJvZmlsZU9wZW5Qb3B1cEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9maWxlX19lZGl0LWJ1dHRvbicpO1xuY29uc3QgZm9ybVByb2ZpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2Zvcm1fcHJvZmlsZScpO1xuY29uc3QgbmFtZUlucHV0ID0gZm9ybVByb2ZpbGUucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cInN1cm5hbWVcIl0nKTtcbmNvbnN0IGpvYklucHV0ID0gZm9ybVByb2ZpbGUucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cImpvYlwiXScpO1xuY29uc3QgZWxlbWVudE9wZW5Qb3B1cEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9maWxlX19hZGQtYnV0dG9uJyk7XG5jb25zdCBmb3JtRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fZm9ybV9hZGQnKTtcbmNvbnN0IHBvcHVwZXJQcm9maWxlV2l0aEZvcm0gPSBuZXcgUG9wdXBXaXRoRm9ybSgnLnBvcHVwX3Byb2ZpbGUnLCBzdWJtaXRGb3JtUHJvZmlsZUhhbmRsZXIpXG5jb25zdCBmb3JtQXZhdGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX19mb3JtX2F2YXRhcicpO1xuY29uc3QgYXZhdGFyT3BlblBvcHVwQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2ZpbGVfX2F2YXRhci1lZGl0LWJ1dHRvbicpO1xuY29uc3QgYXZhdGFySW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZmlsZV9fYXZhdGFyJyk7XG5jb25zdCBwb3B1cGVyQXZhdGFyID0gbmV3IFBvcHVwV2l0aEZvcm0oJy5wb3B1cF9hdmF0YXInLCBzdWJtaXRGb3JtQXZhdGFySGFuZGxlcilcbmNvbnN0IHVzZXJJbmZvID0gbmV3IFVzZXJJbmZvKCcucHJvZmlsZV9fbmFtZScsICcucHJvZmlsZV9fYmlvJywgYXZhdGFySW1hZ2UpXG5jb25zdCBwb3B1cENvbmZpcm0gPSBuZXcgUG9wdXBXaXRoU3VibWl0KCcucG9wdXBfZGVsZXRlJylcbnBvcHVwQ29uZmlybS5zZXRFdmVudExpc3RlbmVycygpO1xuXG5mdW5jdGlvbiBzdWJtaXRGb3JtUHJvZmlsZUhhbmRsZXIoZGF0YSkge1xuICByZW5kZXJMb2FkaW5nKGZvcm1Qcm9maWxlLCB0cnVlKTtcbiAgYXBpLmFkZFByb2ZpbGUoZGF0YSlcbiAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICB1c2VySW5mby5zZXRVc2VySW5mbyhkYXRhKVxuICAgIHBvcHVwZXJQcm9maWxlV2l0aEZvcm0uY2xvc2UoKVxuICB9KVxuICAuY2F0Y2goKGVycikgPT4ge1xuICAgIGNvbnNvbGUubG9nKGVycik7XG4gIH0pXG4gIC5maW5hbGx5KCgpPT57XG4gICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgcmVuZGVyTG9hZGluZyhmb3JtUHJvZmlsZSwgZmFsc2UpO1xuICAgIH0sIDQwMCk7XG4gIH0pXG59XG5cbmZ1bmN0aW9uIHN1Ym1pdEZvcm1BdmF0YXJIYW5kbGVyKGRhdGEpIHtcbiAgcmVuZGVyTG9hZGluZyhmb3JtQXZhdGFyLCB0cnVlKTtcbiAgYXBpLmFkZEF2YXRhcihkYXRhKVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICBhdmF0YXJJbWFnZS5zcmMgPSBkYXRhLmF2YXRhcjtcbiAgICAgIHBvcHVwZXJBdmF0YXIuY2xvc2UoKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pXG4gICAgLmZpbmFsbHkoKCk9PntcbiAgICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgcmVuZGVyTG9hZGluZyhmb3JtQXZhdGFyLCBmYWxzZSk7XG4gICAgICB9LCA0MDApO1xuICAgIH0pXG59XG5cbmF2YXRhckltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcbiAgYXZhdGFyT3BlblBvcHVwQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xufSlcblxuYXZhdGFySW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoKSA9PiB7XG4gIGF2YXRhck9wZW5Qb3B1cEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufSlcblxuYXZhdGFySW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGZvcm1WYWxpZGF0b3JzWyBmb3JtQXZhdGFyLm5hbWUgXS5yZXNldElucHV0RXJyb3IoKTtcbiAgZm9ybVZhbGlkYXRvcnNbIGZvcm1BdmF0YXIubmFtZSBdLnRvZ2dsZUJ1dHRvblN0YXRlKClcbiAgcG9wdXBlckF2YXRhci5vcGVuKCk7XG4gIGZvcm1WYWxpZGF0b3JzWyBmb3JtQXZhdGFyLm5hbWUgXS5lbmFibGVWYWxpZGF0aW9uKCk7XG59KVxuXG5wb3B1cGVyQXZhdGFyLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cblxuXG5hcGkuZ2V0QWxsTmVlZGVkRGF0YSgpXG4gIC50aGVuKGFyZ3VtZW50ID0+IHtcblxuICAgIGNvbnN0IFsgcHJvZmlsZUluZm8sIGluaXRpYWxDYXJkcyBdID0gYXJndW1lbnQ7XG4gICAgdXNlckluZm8uc2V0VXNlckluZm8ocHJvZmlsZUluZm8pO1xuICAgIGNvbnN0IHVzZXJJZCA9IHByb2ZpbGVJbmZvLl9pZFxuICAgIGNvbnN0IGNhcmRMaXN0ID0gbmV3IFNlY3Rpb24oe1xuICAgICAgICByZW5kZXJlcjogKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGNhcmRMaXN0LmFkZEl0ZW0oY3JlYXRlQ2FyZChlbGVtZW50LCB1c2VySWQpKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJy5lbGVtZW50cycpO1xuXG4gICAgY2FyZExpc3QucmVuZGVySXRlbXMoaW5pdGlhbENhcmRzLnJldmVyc2UoKSk7XG5cbiAgICBjb25zdCBwb3B1cEFkZENhcmQgPSBuZXcgUG9wdXBXaXRoRm9ybSgnLnBvcHVwX2FkZCcsIHN1Ym1pdEFkZENhcmRGb3JtKVxuXG4gICAgZnVuY3Rpb24gc3VibWl0QWRkQ2FyZEZvcm0gKGRhdGEpIHtcbiAgICAgIHJlbmRlckxvYWRpbmcoZm9ybUVsZW1lbnQsIHRydWUpO1xuICAgICAgYXBpLmFkZENhcmQoZGF0YSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICBjYXJkTGlzdC5hZGRJdGVtKGNyZWF0ZUNhcmQoZGF0YSwgdXNlcklkKSlcbiAgICAgICAgICBwb3B1cEFkZENhcmQuY2xvc2UoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICB9KVxuICAgICAgICAuZmluYWxseSgoKT0+e1xuICAgICAgICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgICAgIHJlbmRlckxvYWRpbmcoZm9ybUVsZW1lbnQsIGZhbHNlKTtcbiAgICAgICAgICB9LCA0MDApfSl9XG5cbiAgICAgICAgZWxlbWVudE9wZW5Qb3B1cEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBmb3JtVmFsaWRhdG9yc1sgZm9ybUVsZW1lbnQubmFtZSBdLnJlc2V0SW5wdXRFcnJvcigpO1xuICAgICAgICAgIGZvcm1WYWxpZGF0b3JzWyBmb3JtRWxlbWVudC5uYW1lIF0udG9nZ2xlQnV0dG9uU3RhdGUoKVxuICAgICAgICAgIHBvcHVwQWRkQ2FyZC5vcGVuKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHBvcHVwQWRkQ2FyZC5zZXRFdmVudExpc3RlbmVycygpO1xuXG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KVxuXG5wb3B1cGVyUHJvZmlsZVdpdGhGb3JtLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbnByb2ZpbGVPcGVuUG9wdXBCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGZvcm1WYWxpZGF0b3JzWyBmb3JtUHJvZmlsZS5uYW1lIF0udG9nZ2xlQnV0dG9uU3RhdGUoKTtcbiAgZm9ybVZhbGlkYXRvcnNbIGZvcm1Qcm9maWxlLm5hbWUgXS5yZXNldElucHV0RXJyb3IoKTtcbiAgcG9wdXBlclByb2ZpbGVXaXRoRm9ybS5vcGVuKCk7XG4gIGNvbnN0IGluaXRpYWxJbmZvID0gdXNlckluZm8uZ2V0VXNlckluZm8oKTtcbiAgbmFtZUlucHV0LnZhbHVlID0gaW5pdGlhbEluZm8udXNlck5hbWU7XG4gIGpvYklucHV0LnZhbHVlID0gaW5pdGlhbEluZm8udXNlckpvYjtcbn0pO1xuXG5jb25zdCBwb3B1cGVyWm9vbSA9IG5ldyBQb3B1cFdpdGhJbWFnZSgnLnBvcHVwX3pvb20nKVxucG9wdXBlclpvb20uc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuZnVuY3Rpb24gY3JlYXRlQ2FyZChlbGVtZW50LCB1c2VySWQpe1xuICBjb25zdCBjYXJkID0gbmV3IENhcmQoZWxlbWVudCwgdXNlcklkLFxuICAgICcuaXRlbS10ZW1wbGF0ZScsXG4gICAge2hhbmRsZUNhcmRDbGljazogKCkgPT4ge1xuICAgIHBvcHVwZXJab29tLm9wZW4oZWxlbWVudCl9fSxcbiAgICB7ZGVsZXRlQ2xpY2tIYW5kbGVyOiAoY2FyZElkKSA9PiB7XG4gICAgICBwb3B1cENvbmZpcm0ub3BlbigpO1xuICAgICAgcG9wdXBDb25maXJtLnNldFN1Ym1pdEFjdGlvbigoKSA9PiB7XG4gICAgICAgIGFwaS5kZWxldGVDYXJkKGNhcmRJZClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHBvcHVwQ29uZmlybS5jbG9zZSgpO1xuICAgICAgICAgIGNhcmQuaGFuZGxlRWxlbWVudERlbGV0ZSgpXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgfSlcbiAgICB9KVxuICAgIH19LFxuICAgIHtsaWtlQ2xpY2tIYW5kbGVyOiAoY2FyZElkKSA9PiB7XG4gICAgICBhcGkuc2V0TGlrZShjYXJkSWQpXG4gICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICBjYXJkLmhhbmRsZVNldExpa2UoZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgfSlcbiAgICB9fSxcbiAgICB7cmVzZXRMaWtlQ2xpY2tIYW5kbGVyOiAoY2FyZElkKSA9PiB7XG4gICAgICBhcGkucmVzZXRMaWtlKGNhcmRJZClcbiAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgIGNhcmQuaGFuZGxlUmVzZXRMaWtlKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pXG4gICAgfX1cbiAgICApXG5cbiAgICByZXR1cm4gY2FyZC5jcmVhdGVDYXJkKCk7XG59XG5cblxuY29uc3QgZm9ybVZhbGlkYXRvcnMgPSB7fVxuXG5jb25zdCBlbmFibGVWYWxpZGF0aW9uID0gKGNvbmZpZykgPT4ge1xuICBjb25zdCBmb3JtTGlzdCA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBvcHVwX19mb3JtJykpO1xuICBmb3JtTGlzdC5mb3JFYWNoKChmb3JtKSA9PiB7XG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihldnQpIHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pXG4gICAgY29uc3QgZm9ybVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKGNvbmZpZywgZm9ybSk7XG4gICAgZm9ybVZhbGlkYXRvcnNbIGZvcm0ubmFtZSBdID0gZm9ybVZhbGlkYXRvcjtcbiAgICBmb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKTtcbiAgfSk7XG59O1xuXG5lbmFibGVWYWxpZGF0aW9uKGNvbmZpZyk7XG5cblxuXG4iXSwibmFtZXMiOlsiQXBpIiwidXJsIiwidG9rZW4iLCJfdXJsIiwiX3Rva2VuIiwiX2hlYWRlcnMiLCJyZXMiLCJvayIsImpzb24iLCJQcm9taXNlIiwicmVqZWN0IiwiYWxsIiwiZ2V0UHJvZmlsZSIsImdldEluaXRpYWxDYXJkcyIsImZldGNoIiwiaGVhZGVycyIsInRoZW4iLCJfY2hlY2tTZXJ2ZXJSZXNwb25zZSIsImRhdGEiLCJib2R5IiwibmFtZSIsInN1cm5hbWUiLCJhYm91dCIsImpvYiIsIm1ldGhvZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJsaW5rIiwiY2FyZElkIiwiYXZhdGFyIiwiQ2FyZCIsInVzZXJJZCIsImNhcmRTZWxlY3RvciIsImhhbmRsZUNhcmRDbGljayIsImRlbGV0ZUNsaWNrSGFuZGxlciIsImxpa2VDbGlja0hhbmRsZXIiLCJyZXNldExpa2VDbGlja0hhbmRsZXIiLCJfZGF0YSIsIl9uYW1lIiwiX2xpbmsiLCJfY2FyZFNlbGVjdG9yIiwiX2hhbmRsZUNhcmRDbGljayIsIl9lbGVtZW50IiwiX2dldFRlbXBsYXRlIiwiX2NhcmRJbWFnZSIsInF1ZXJ5U2VsZWN0b3IiLCJfbGlrZUJ1dHRvbiIsIl9lbGVtZW50TmFtZSIsIl9kZWxldGVCdXR0b24iLCJfbGlrZUNvdW50ZXIiLCJfbnVtYmVyT2ZMaWtlcyIsImxpa2VzIiwiX293bmVySWQiLCJvd25lciIsIl9pZCIsIl91c2VySWQiLCJfZGVsZXRlQ2xpY2tIYW5kbGVyIiwiX2xpa2VDbGlja0hhbmRsZXIiLCJfcmVzZXRsaWtlQ2xpY2tIYW5kbGVyIiwiX2lzTGlrZWQiLCJtYXAiLCJlbCIsImluY2x1ZGVzIiwibmV3SXRlbSIsImRvY3VtZW50IiwiY29udGVudCIsImNsb25lTm9kZSIsIl9hZGRMaXN0ZW5lcnMiLCJzcmMiLCJhbHQiLCJ0ZXh0Q29udGVudCIsImxlbmd0aCIsInRvU3RyaW5nIiwiY2xhc3NMaXN0IiwiYWRkIiwic3R5bGUiLCJkaXNwbGF5IiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9nZXRJZCIsIl9saWtlSGFuZGxlciIsImV2dCIsInJlbW92ZSIsIkZvcm1WYWxpZGF0b3IiLCJjb25maWciLCJmb3JtIiwiX3N1Ym1pdEJ1dHRvbiIsInN1Ym1pdEJ1dHRvbiIsIl9wb3B1cElzSW52YWxpZCIsInBvcHVwSXNJbnZhbGlkIiwiX2lucHV0IiwiaW5wdXQiLCJfaW5wdXRFcnJvciIsImlucHV0RXJyb3IiLCJfZXJyb3IiLCJlcnJvciIsIl9mb3JtIiwiX2lucHV0TGlzdCIsIkFycmF5IiwiZnJvbSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJfYnV0dG9uIiwiaWQiLCJ2YWxpZGF0aW9uTWVzc2FnZSIsInZhbGlkaXR5IiwidmFsaWQiLCJfc2hvd0lucHV0RXJyb3IiLCJfaGlkZUlucHV0RXJyb3IiLCJzb21lIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiZm9yRWFjaCIsIl9oYXNJbnZhbGlkSW5wdXQiLCJfZGlzYWJsZUJ1dHRvbiIsIl9lbmFibGVCdXR0b24iLCJ0b2dnbGVCdXR0b25TdGF0ZSIsIl9jaGVja0lucHV0VmFsaWRpdHkiLCJfc2V0RXZlbnRMaXN0ZW5lcnMiLCJQb3B1cCIsInBvcHVwU2VsZWN0b3IiLCJrZXkiLCJjbG9zZSIsInRhcmdldCIsImNvbnRhaW5zIiwiY2xvc2VzdCIsIl9wb3B1cENvbnRhaW5lciIsIl9wb3B1cENsb3NlQnV0dG9uIiwiX3BvcHVwIiwic2V0VGltZW91dCIsIl9oYW5kbGVFc2NDbG9zZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJfY2xvc2VPbkNsaWNrIiwiUG9wdXBXaXRoRm9ybSIsInN1Ym1pdEZvcm1IYW5kbGVyIiwicHJldmVudERlZmF1bHQiLCJfc3VibWl0Rm9ybUhhbmRsZXIiLCJfZ2V0SW5wdXRWYWx1ZXMiLCJfZm9ybVZhbHVlcyIsInZhbHVlIiwiX3N1Ym1pdEZvcm1IYW5kbGVyRnVuY3Rpb24iLCJyZXNldCIsIlBvcHVwV2l0aEltYWdlIiwiX3BvcHVwSW1hZ2UiLCJfcG9wdXBDYXB0aW9uIiwiZWxlbWVudCIsIlBvcHVwV2l0aFN1Ym1pdCIsIl9oYW5kbGVTdWJtaXRDYWxsYmFjayIsImFjdGlvbiIsIlNlY3Rpb24iLCJjb250YWluZXJTZWxlY3RvciIsInJlbmRlcmVyIiwiX3JlbmRlcmVyIiwiX2NvbnRhaW5lciIsImNhcmRzIiwicHJlcGVuZCIsIlVzZXJJbmZvIiwidXNlck5hbWUiLCJ1c2VySm9iIiwidXNlckF2YXRhciIsIl91c2VyTmFtZSIsIl91c2VySm9iIiwiX3VzZXJBdmF0YXIiLCJyZW5kZXJMb2FkaW5nIiwiaXNMb2FkaW5nIiwiYXBpIiwicHJvZmlsZU9wZW5Qb3B1cEJ1dHRvbiIsImZvcm1Qcm9maWxlIiwibmFtZUlucHV0Iiwiam9iSW5wdXQiLCJlbGVtZW50T3BlblBvcHVwQnV0dG9uIiwiZm9ybUVsZW1lbnQiLCJwb3B1cGVyUHJvZmlsZVdpdGhGb3JtIiwic3VibWl0Rm9ybVByb2ZpbGVIYW5kbGVyIiwiZm9ybUF2YXRhciIsImF2YXRhck9wZW5Qb3B1cEJ1dHRvbiIsImF2YXRhckltYWdlIiwicG9wdXBlckF2YXRhciIsInN1Ym1pdEZvcm1BdmF0YXJIYW5kbGVyIiwidXNlckluZm8iLCJwb3B1cENvbmZpcm0iLCJzZXRFdmVudExpc3RlbmVycyIsImFkZFByb2ZpbGUiLCJzZXRVc2VySW5mbyIsImNhdGNoIiwiZXJyIiwiY29uc29sZSIsImxvZyIsImZpbmFsbHkiLCJhZGRBdmF0YXIiLCJmb3JtVmFsaWRhdG9ycyIsInJlc2V0SW5wdXRFcnJvciIsIm9wZW4iLCJlbmFibGVWYWxpZGF0aW9uIiwiZ2V0QWxsTmVlZGVkRGF0YSIsImFyZ3VtZW50IiwicHJvZmlsZUluZm8iLCJpbml0aWFsQ2FyZHMiLCJjYXJkTGlzdCIsImFkZEl0ZW0iLCJjcmVhdGVDYXJkIiwicmVuZGVySXRlbXMiLCJyZXZlcnNlIiwicG9wdXBBZGRDYXJkIiwic3VibWl0QWRkQ2FyZEZvcm0iLCJhZGRDYXJkIiwiaW5pdGlhbEluZm8iLCJnZXRVc2VySW5mbyIsInBvcHVwZXJab29tIiwiY2FyZCIsInNldFN1Ym1pdEFjdGlvbiIsImRlbGV0ZUNhcmQiLCJoYW5kbGVFbGVtZW50RGVsZXRlIiwic2V0TGlrZSIsImhhbmRsZVNldExpa2UiLCJyZXNldExpa2UiLCJoYW5kbGVSZXNldExpa2UiLCJmb3JtTGlzdCIsImZvcm1WYWxpZGF0b3IiXSwic291cmNlUm9vdCI6IiJ9