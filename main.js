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
    key: "getInitialCards",
    value: function getInitialCards() {
      return fetch("".concat(this._url, "/cards/"), {
        headers: this._headers
      }).then(function (res) {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject('Возникла ошибка');
      });
    }
  }, {
    key: "getProfile",
    value: function getProfile() {
      return fetch("".concat(this._url, "/users/me"), {
        headers: this._headers
      }).then(function (res) {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject('Возникла ошибка');
      });
    }
  }, {
    key: "addProfile",
    value: function addProfile(data) {
      var body = {
        name: data.surname,
        about: data.job
      };
      return fetch("".concat(this._url, "/users/me"), {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(body)
      }).then(function (res) {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject('Возникла ошибка');
      });
    }
  }, {
    key: "addCard",
    value: function addCard(data) {
      var body = {
        name: data.name,
        link: data.link
      };
      return fetch("".concat(this._url, "/cards/"), {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(body)
      }).then(function (res) {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject('Возникла ошибка');
      });
    }
  }, {
    key: "deleteCard",
    value: function deleteCard(cardId) {
      return fetch("".concat(this._url, "/cards/").concat(cardId), {
        method: 'DELETE',
        headers: this._headers
      }).then(function (res) {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject('Возникла ошибка');
      });
    }
  }, {
    key: "setLike",
    value: function setLike(cardId) {
      return fetch("".concat(this._url, "/cards/").concat(cardId, "/likes"), {
        method: 'PUT',
        headers: this._headers
      }).then(function (res) {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject('Возникла ошибка');
      });
    }
  }, {
    key: "resetLike",
    value: function resetLike(cardId) {
      return fetch("".concat(this._url, "/cards/").concat(cardId, "/likes"), {
        method: 'DELETE',
        headers: this._headers
      }).then(function (res) {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject('Возникла ошибка');
      });
    }
  }, {
    key: "addAvatar",
    value: function addAvatar(data) {
      var body = {
        avatar: data.avatar
      };
      return fetch("".concat(this._url, "/users/me/avatar"), {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(body)
      }).then(function (res) {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject('Возникла ошибка');
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
/* harmony import */ var _components_Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/Popup.js */ "./src/scripts/components/Popup.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var Card = /*#__PURE__*/function () {
  //класс создаёт карточку с текстом и ссылкой на изображение
  //принимает в конструктор данные карточки и селектор её template-элемента;
  function Card(data, cardSelector, _ref, _ref2, _ref3, _ref4) {
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
    this._deleteClickHandler = deleteClickHandler;
    this._likeClickHandler = likeClickHandler;
    this._resetlikeClickHandler = resetLikeClickHandler;
    this._isLiked = this._data.likes.map(function (el) {
      return el._id;
    }).includes('11ab6d8f551dd307035c1b67');
  } //содержит приватные методы, которые работают с разметкой


  _createClass(Card, [{
    key: "_getTemplate",
    value: function _getTemplate() {
      var newItem = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
      return newItem;
    }
  }, {
    key: "createCard",
    value: function createCard() {
      //condition - if card created by me (not initial)
      this._addListeners(); // Добавим данные


      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this._elementName.textContent = this._name;
      this._likeCounter.textContent = this._numberOfLikes.length.toString(); // Вернём элемент наружу

      if (this._isLiked) {
        this._likeButton.classList.add("element__like-button_active");
      }

      if (this._ownerId === "11ab6d8f551dd307035c1b67") {
        this._deleteButton.style.display = "grid";
      }

      return this._element;
    } //устанавливаем слушателей событий:
    //здесь нужна стрелочная функция, т.к. она позволяет обратиться к обработчикам через this:

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
      // const deletePopuper = new Popup('.popup_delete');
      // deletePopuper.open();
      this._element.remove();

      this._element = null;
    }
  }, {
    key: "handleSetLike",
    value: function handleSetLike(data) {
      this._likeCounter.textContent = data.likes.length.toString();

      this._likeButton.classList.add("element__like-button_active"); // const liked = data.likes.map((el) => el._id).includes('11ab6d8f551dd307035c1b67');


      this._isLiked = true;
    }
  }, {
    key: "handleResetLike",
    value: function handleResetLike(data) {
      this._likeCounter.textContent = data.likes.length.toString();

      this._likeButton.classList.remove("element__like-button_active"); // const liked = data.likes.map((el) => el._id).includes('11ab6d8f551dd307035c1b67');


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
  //принимает в конструктор объект настроек с селекторами и классами формы:
  //принимает вторым параметром элемент той формы, которая валидируется;
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
  } //приватные методы, которые обрабатывают форму:


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
    } //изменяет состояние кнопки сабмита:

  }, {
    key: "toggleButtonState",
    value: function toggleButtonState() {
      if (this._hasInvalidInput()) {
        this._disableButton();
      } else {
        this._enableButton();
      }
    } //устанавливает обработчики:

  }, {
    key: "_setEventListeners",
    value: function _setEventListeners() {
      var _this = this;

      this.toggleButtonState();

      this._inputList.forEach(function (input) {
        input.addEventListener('input', function () {
          _this._checkInputValidity(input);

          _this.toggleButtonState();
        });
      });
    } //публичный метод, который включает валидацию формы.

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
      if (evt.target.classList.contains('popup_opened') && evt.target.closest('.popup__container') != _this._popupContainer || evt.target.closest('.popup__close-button') == _this._popupCloseButton) {
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
      document.addEventListener('keydown', function (evt) {
        _this2._handleEscClose(evt);
      });
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
      document.removeEventListener('keydown', function (evt) {
        _handleEscClose(evt);
      });
    }
  }, {
    key: "setEventListeners",
    value: //добавляет слушатель иконке закрытия
    function setEventListeners() {
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
      ;

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
  } //перезаписать open используя логику полиморфизма


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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var PopupWithSubmit = /*#__PURE__*/function (_Popup) {
  _inherits(PopupWithSubmit, _Popup);

  var _super = _createSuper(PopupWithSubmit);

  function PopupWithSubmit(popupSelector, _ref) {
    var _this;

    var submitDeletionHandler = _ref.submitDeletionHandler;

    _classCallCheck(this, PopupWithSubmit);

    _this = _super.call(this, popupSelector);

    _defineProperty(_assertThisInitialized(_this), "_submitDeletionHandlerFunction", function (evt) {
      evt.preventDefault();

      _this._submitDeletionHandler();
    });

    _this._submitDeletionHandler = submitDeletionHandler;
    return _this;
  }

  _createClass(PopupWithSubmit, [{
    key: "setEventListeners",
    value: function setEventListeners() {
      this._popup.addEventListener('submit', this._submitDeletionHandlerFunction);

      _get(_getPrototypeOf(PopupWithSubmit.prototype), "setEventListeners", this).call(this);
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

//при организации кода Классы должны оставаться независимыми,только тогда их можно
//будет использовать в других местах\проектах
//класс отвечает за вставку элементов в разметку
//items - массив данных для добавления на страницу - список initialCards.js из name и link
//renderer -  функция - создает карточку (initializeCard) и вставляет на страницу (locateNewCardAhead).
//renderer - Создание экземпляров карточек (new Card) и их вставку в разметку будем передавать в конструктор класса
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

var UserInfo = /*#__PURE__*/_createClass(function UserInfo(_userName, _userJob) {
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
    _this._userName.textContent = data.name;
    _this._userJob.textContent = data.about;
  });

  this._userName = document.querySelector(_userName);
  this._userJob = document.querySelector(_userJob);
} //собрать данные и подставить в форму
);



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
//файл содержит уникальный для страницы код - 1.Создание новых экземпляров классов 2.Взаимодействие между классами 3.Передачу данных в классы
//корневой файл проекта - инициализация необходимых функций и классов
 // добавьте импорт главного файла стилей









var api = new _scripts_components_Api_js__WEBPACK_IMPORTED_MODULE_7__["default"]('https://mesto.nomoreparties.co/v1/cohort-43', '13e0d01a-3631-45a5-b3a6-1a7f87295049');
var config = {
  submitButton: '.popup__save',
  popupIsInvalid: 'popup__save_disabled',
  input: '.popup__input',
  inputError: '.popup__input_type_error',
  error: '.error'
};
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
var userInfo = new _scripts_components_UserInfo_js__WEBPACK_IMPORTED_MODULE_6__["default"]('.profile__name', '.profile__bio');

function submitFormProfileHandler(data) {
  formProfile.querySelector(config.submitButton).textContent = 'Сохранение...';
  api.addProfile(data).then(function (data) {
    userInfo.setUserInfo(data);
    popuperProfileWithForm.close();
  }).catch(function (err) {
    console.log(err);
  }).finally(function () {
    setTimeout(function () {
      formProfile.querySelector(config.submitButton).textContent = 'Сохранить';
    }, 400);
  });
}

formAvatar.querySelector(config.submitButton).textContent = 'Сохранить';

function submitFormAvatarHandler(data) {
  formAvatar.querySelector(config.submitButton).textContent = 'Сохранение...';
  api.addAvatar(data).then(function (data) {
    document.querySelector('.profile__avatar').src = data.avatar;
    popuperAvatar.close();
  }).catch(function (err) {
    console.log(err);
  }).finally(function () {
    setTimeout(function () {
      formAvatar.querySelector(config.submitButton).textContent = 'Сохранить';
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
  formValidators[formAvatar.name].toggleButtonState();
  popuperAvatar.open();
});
popuperAvatar.setEventListeners();
api.getInitialCards().then(function (initialCards) {
  cardList.renderItems(initialCards.reverse());
}).catch(function (err) {
  console.log(err);
});
api.getProfile().then(function (profileInfo) {
  document.querySelector('.profile__name').textContent = profileInfo.name;
  document.querySelector('.profile__bio').textContent = profileInfo.about;
  document.querySelector('.profile__avatar').src = profileInfo.avatar;
}).catch(function (err) {
  console.log(err);
});
popuperProfileWithForm.setEventListeners();
profileOpenPopupButton.addEventListener('click', function () {
  formValidators[formProfile.name].toggleButtonState();
  popuperProfileWithForm.open();
  var initialInfo = userInfo.getUserInfo();
  nameInput.value = initialInfo.userName;
  jobInput.value = initialInfo.userJob;
});
elementOpenPopupButton.addEventListener('click', function () {
  formValidators[formElement.name].toggleButtonState();
  popuperElementWithForm.open();
});
var popuperZoom = new _scripts_components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_4__["default"]('.popup_zoom');
popuperZoom.setEventListeners();

function createCard(element) {
  var card = new _scripts_components_Card_js__WEBPACK_IMPORTED_MODULE_1__["default"](element, '.item-template', {
    handleCardClick: function handleCardClick() {
      popuperZoom.open(element);
    }
  }, {
    deleteClickHandler: function deleteClickHandler(cardId) {
      var deletePopuper = new _scripts_components_PopupWithSubmit__WEBPACK_IMPORTED_MODULE_8__["default"]('.popup_delete', {
        submitDeletionHandler: function submitDeletionHandler() {
          api.deleteCard(cardId).then(function () {
            deletePopuper.close();
            card.handleElementDelete();
          }).catch(function (err) {
            console.log(err);
          });
        }
      });
      deletePopuper.setEventListeners();
      deletePopuper.open();
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

var cardList = new _scripts_components_Section_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
  renderer: function renderer(element) {
    cardList.addItem(createCard(element));
  }
}, '.elements');
var popuperElementWithForm = new _scripts_components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__["default"]('.popup_add', submitFormElementHandler);

function submitFormElementHandler(data) {
  formElement.querySelector(config.submitButton).textContent = 'Сохранение...';
  api.addCard(data).then(function (data) {
    cardList.addItem(createCard(data));
    popuperElementWithForm.close();
  }).catch(function (err) {
    console.log(err);
  }).finally(function () {
    setTimeout(function () {
      formElement.querySelector(config.submitButton).textContent = 'Сохранить';
    }, 400);
  });
}

popuperElementWithForm.setEventListeners();
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

enableValidation(config);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0lBQ0QsQ0FGRDtJQUdBLElBQU04RSxhQUFhLEdBQUcsSUFBSWhJLDRFQUFKLENBQWtCQyxNQUFsQixFQUEwQkMsSUFBMUIsQ0FBdEI7SUFDQWtHLGNBQWMsQ0FBRWxHLElBQUksQ0FBQy9ELElBQVAsQ0FBZCxHQUE4QjZMLGFBQTlCO0lBQ0FBLGFBQWEsQ0FBQ0YsZ0JBQWQ7RUFDRCxDQVBEO0FBUUQsQ0FWRDs7QUFZQUEsZ0JBQWdCLENBQUM3SCxNQUFELENBQWhCLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvQXBpLmpzIiwid2VicGFjazovL21lc3RvLy4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9DYXJkLmpzIiwid2VicGFjazovL21lc3RvLy4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzIiwid2VicGFjazovL21lc3RvLy4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9Qb3B1cC5qcyIsIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybS5qcyIsIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanMiLCJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL1BvcHVwV2l0aFN1Ym1pdC5qcyIsIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvVXNlckluZm8uanMiLCJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvcGFnZXMvaW5kZXguY3NzIiwid2VicGFjazovL21lc3RvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21lc3RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tZXN0by93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21lc3RvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvcGFnZXMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBpIHtcbiAgY29uc3RydWN0b3IodXJsLCB0b2tlbikge1xuICAgIHRoaXMuX3VybCA9IHVybDtcbiAgICB0aGlzLl90b2tlbiA9IHRva2VuO1xuICAgIHRoaXMuX2hlYWRlcnMgPSB7XG4gICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgJ0F1dGhvcml6YXRpb24nOiB0aGlzLl90b2tlbixcbiAgICB9XG4gIH1cblxuICBnZXRJbml0aWFsQ2FyZHMoKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX3VybH0vY2FyZHMvYCwge1xuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVyc1xuICAgIH0pXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ9CS0L7Qt9C90LjQutC70LAg0L7RiNC40LHQutCwJylcbiAgICAgIH0pXG4gIH1cblxuICBnZXRQcm9maWxlKCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLl91cmx9L3VzZXJzL21lYCwge1xuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVyc1xuICAgIH0pXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ9CS0L7Qt9C90LjQutC70LAg0L7RiNC40LHQutCwJylcbiAgICAgIH0pXG4gIH1cblxuICBhZGRQcm9maWxlKGRhdGEpIHtcbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgbmFtZTogZGF0YS5zdXJuYW1lLFxuICAgICAgYWJvdXQ6IGRhdGEuam9iXG4gICAgfVxuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLl91cmx9L3VzZXJzL21lYCwge1xuICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpXG59KVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ9CS0L7Qt9C90LjQutC70LAg0L7RiNC40LHQutCwJylcbiAgICB9KVxuICB9XG5cbiAgYWRkQ2FyZChkYXRhKSB7XG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgIG5hbWU6IGRhdGEubmFtZSxcbiAgICAgIGxpbms6IGRhdGEubGlua1xuICAgIH1cbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5fdXJsfS9jYXJkcy9gLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KVxufSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCfQktC+0LfQvdC40LrQu9CwINC+0YjQuNCx0LrQsCcpXG4gICAgfSlcbiAgfVxuXG4gIGRlbGV0ZUNhcmQoY2FyZElkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX3VybH0vY2FyZHMvJHtjYXJkSWR9YCwge1xuICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCfQktC+0LfQvdC40LrQu9CwINC+0YjQuNCx0LrQsCcpXG4gICAgfSlcbiAgfVxuXG4gIHNldExpa2UoY2FyZElkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX3VybH0vY2FyZHMvJHtjYXJkSWR9L2xpa2VzYCwge1xuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCfQktC+0LfQvdC40LrQu9CwINC+0YjQuNCx0LrQsCcpXG4gICAgfSlcbiAgfVxuXG4gIHJlc2V0TGlrZShjYXJkSWQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5fdXJsfS9jYXJkcy8ke2NhcmRJZH0vbGlrZXNgLCB7XG4gICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ9CS0L7Qt9C90LjQutC70LAg0L7RiNC40LHQutCwJylcbiAgICB9KVxuICB9XG5cbiAgYWRkQXZhdGFyKGRhdGEpIHtcbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgYXZhdGFyOiBkYXRhLmF2YXRhcixcbiAgICB9XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX3VybH0vdXNlcnMvbWUvYXZhdGFyYCwge1xuICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpXG59KVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ9CS0L7Qt9C90LjQutC70LAg0L7RiNC40LHQutCwJylcbiAgICB9KVxuICB9XG5cbiB9XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSAnLi4vY29tcG9uZW50cy9Qb3B1cC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcmQge1xuICAvL9C60LvQsNGB0YEg0YHQvtC30LTQsNGR0YIg0LrQsNGA0YLQvtGH0LrRgyDRgSDRgtC10LrRgdGC0L7QvCDQuCDRgdGB0YvQu9C60L7QuSDQvdCwINC40LfQvtCx0YDQsNC20LXQvdC40LVcbiAgLy/Qv9GA0LjQvdC40LzQsNC10YIg0LIg0LrQvtC90YHRgtGA0YPQutGC0L7RgCDQtNCw0L3QvdGL0LUg0LrQsNGA0YLQvtGH0LrQuCDQuCDRgdC10LvQtdC60YLQvtGAINC10ZEgdGVtcGxhdGUt0Y3Qu9C10LzQtdC90YLQsDtcbiAgY29uc3RydWN0b3IoZGF0YSwgY2FyZFNlbGVjdG9yLCB7aGFuZGxlQ2FyZENsaWNrfSwge2RlbGV0ZUNsaWNrSGFuZGxlcn0sIHtsaWtlQ2xpY2tIYW5kbGVyfSwge3Jlc2V0TGlrZUNsaWNrSGFuZGxlcn0pIHtcbiAgICB0aGlzLl9kYXRhID0gZGF0YTtcbiAgICB0aGlzLl9uYW1lID0gZGF0YS5uYW1lO1xuICAgIHRoaXMuX2xpbmsgPSBkYXRhLmxpbms7XG4gICAgdGhpcy5fY2FyZFNlbGVjdG9yID0gY2FyZFNlbGVjdG9yO1xuICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljayA9IGhhbmRsZUNhcmRDbGljaztcbiAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fZ2V0VGVtcGxhdGUoKTtcbiAgICB0aGlzLl9jYXJkSW1hZ2UgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbGVtZW50X19pbWFnZScpO1xuICAgIHRoaXMuX2xpa2VCdXR0b24gPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbGVtZW50X19saWtlLWJ1dHRvbicpO1xuICAgIHRoaXMuX2VsZW1lbnROYW1lID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZWxlbWVudF9fbmFtZScpO1xuICAgIHRoaXMuX2RlbGV0ZUJ1dHRvbiA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcignLmVsZW1lbnRfX2RlbGV0ZS1idXR0b24nKTtcbiAgICB0aGlzLl9saWtlQ291bnRlciA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcignLmVsZW1lbnRfX2xpa2UtbnVtYmVyJyk7XG4gICAgdGhpcy5fbnVtYmVyT2ZMaWtlcyA9IGRhdGEubGlrZXM7XG4gICAgdGhpcy5fb3duZXJJZCA9IGRhdGEub3duZXIuX2lkO1xuICAgIHRoaXMuX2RlbGV0ZUNsaWNrSGFuZGxlciA9IGRlbGV0ZUNsaWNrSGFuZGxlcjtcbiAgICB0aGlzLl9saWtlQ2xpY2tIYW5kbGVyID0gbGlrZUNsaWNrSGFuZGxlcjtcbiAgICB0aGlzLl9yZXNldGxpa2VDbGlja0hhbmRsZXIgPSByZXNldExpa2VDbGlja0hhbmRsZXJcbiAgICB0aGlzLl9pc0xpa2VkID0gdGhpcy5fZGF0YS5saWtlcy5tYXAoKGVsKSA9PiBlbC5faWQpLmluY2x1ZGVzKCcxMWFiNmQ4ZjU1MWRkMzA3MDM1YzFiNjcnKTtcblxuICB9XG4vL9GB0L7QtNC10YDQttC40YIg0L/RgNC40LLQsNGC0L3Ri9C1INC80LXRgtC+0LTRiywg0LrQvtGC0L7RgNGL0LUg0YDQsNCx0L7RgtCw0Y7RgiDRgSDRgNCw0LfQvNC10YLQutC+0LlcbiAgX2dldFRlbXBsYXRlKCkge1xuICAgIGNvbnN0IG5ld0l0ZW0gPSBkb2N1bWVudFxuICAgIC5xdWVyeVNlbGVjdG9yKHRoaXMuX2NhcmRTZWxlY3RvcilcbiAgICAuY29udGVudFxuICAgIC5xdWVyeVNlbGVjdG9yKCcuZWxlbWVudCcpXG4gICAgLmNsb25lTm9kZSh0cnVlKTtcbiAgICByZXR1cm4gbmV3SXRlbVxuICB9XG5cbiAgY3JlYXRlQ2FyZCgpIHtcbiAgICAvL2NvbmRpdGlvbiAtIGlmIGNhcmQgY3JlYXRlZCBieSBtZSAobm90IGluaXRpYWwpXG4gICAgdGhpcy5fYWRkTGlzdGVuZXJzKCk7XG4gICAgLy8g0JTQvtCx0LDQstC40Lwg0LTQsNC90L3Ri9C1XG4gICAgdGhpcy5fY2FyZEltYWdlLnNyYyA9IHRoaXMuX2xpbmtcbiAgICB0aGlzLl9jYXJkSW1hZ2UuYWx0ID0gdGhpcy5fbmFtZVxuICAgIHRoaXMuX2VsZW1lbnROYW1lLnRleHRDb250ZW50ID0gdGhpcy5fbmFtZVxuICAgIHRoaXMuX2xpa2VDb3VudGVyLnRleHRDb250ZW50ID0gdGhpcy5fbnVtYmVyT2ZMaWtlcy5sZW5ndGgudG9TdHJpbmcoKVxuICAgIC8vINCS0LXRgNC90ZHQvCDRjdC70LXQvNC10L3RgiDQvdCw0YDRg9C20YNcblxuICAgIGlmICh0aGlzLl9pc0xpa2VkKSB7XG4gICAgICB0aGlzLl9saWtlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJlbGVtZW50X19saWtlLWJ1dHRvbl9hY3RpdmVcIik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX293bmVySWQgPT09IFwiMTFhYjZkOGY1NTFkZDMwNzAzNWMxYjY3XCIpIHtcbiAgICAgIHRoaXMuX2RlbGV0ZUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJncmlkXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQ7XG4gIH1cblxuLy/Rg9GB0YLQsNC90LDQstC70LjQstCw0LXQvCDRgdC70YPRiNCw0YLQtdC70LXQuSDRgdC+0LHRi9GC0LjQuTpcbi8v0LfQtNC10YHRjCDQvdGD0LbQvdCwINGB0YLRgNC10LvQvtGH0L3QsNGPINGE0YPQvdC60YbQuNGPLCDRgi7Qui4g0L7QvdCwINC/0L7Qt9Cy0L7Qu9GP0LXRgiDQvtCx0YDQsNGC0LjRgtGM0YHRjyDQuiDQvtCx0YDQsNCx0L7RgtGH0LjQutCw0Lwg0YfQtdGA0LXQtyB0aGlzOlxuXG4gIF9nZXRJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YS5faWQ7XG4gIH1cblxuICBfYWRkTGlzdGVuZXJzKCkge1xuICAgIHRoaXMuX2RlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuX2RlbGV0ZUNsaWNrSGFuZGxlcih0aGlzLl9nZXRJZCgpKTtcbiAgICB9KTtcbiAgICB0aGlzLl9saWtlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5fbGlrZUhhbmRsZXIodGhpcy5fZ2V0SWQoKSk7XG4gICAgfSk7XG4gICAgdGhpcy5fY2FyZEltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dCkgPT4ge1xuICAgICAgdGhpcy5faGFuZGxlQ2FyZENsaWNrKGV2dCk7XG4gICAgfSk7XG4gIH07XG5cbiAgX2xpa2VIYW5kbGVyKCl7XG4gICAgaWYgKHRoaXMuX2lzTGlrZWQpIHtcbiAgICAgIHRoaXMuX3Jlc2V0bGlrZUNsaWNrSGFuZGxlcih0aGlzLl9nZXRJZCgpKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9saWtlQ2xpY2tIYW5kbGVyKHRoaXMuX2dldElkKCkpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUVsZW1lbnREZWxldGUoKSB7XG4gICAgLy8gY29uc3QgZGVsZXRlUG9wdXBlciA9IG5ldyBQb3B1cCgnLnBvcHVwX2RlbGV0ZScpO1xuICAgIC8vIGRlbGV0ZVBvcHVwZXIub3BlbigpO1xuICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlKCk7XG4gICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gIH1cblxuICBoYW5kbGVTZXRMaWtlKGRhdGEpIHtcbiAgICB0aGlzLl9saWtlQ291bnRlci50ZXh0Q29udGVudCA9IGRhdGEubGlrZXMubGVuZ3RoLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5fbGlrZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZWxlbWVudF9fbGlrZS1idXR0b25fYWN0aXZlXCIpO1xuICAgIC8vIGNvbnN0IGxpa2VkID0gZGF0YS5saWtlcy5tYXAoKGVsKSA9PiBlbC5faWQpLmluY2x1ZGVzKCcxMWFiNmQ4ZjU1MWRkMzA3MDM1YzFiNjcnKTtcbiAgICB0aGlzLl9pc0xpa2VkID0gdHJ1ZTtcbiAgfVxuICBoYW5kbGVSZXNldExpa2UoZGF0YSkge1xuICAgIHRoaXMuX2xpa2VDb3VudGVyLnRleHRDb250ZW50ID0gZGF0YS5saWtlcy5sZW5ndGgudG9TdHJpbmcoKTtcbiAgICB0aGlzLl9saWtlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJlbGVtZW50X19saWtlLWJ1dHRvbl9hY3RpdmVcIik7XG4gICAgLy8gY29uc3QgbGlrZWQgPSBkYXRhLmxpa2VzLm1hcCgoZWwpID0+IGVsLl9pZCkuaW5jbHVkZXMoJzExYWI2ZDhmNTUxZGQzMDcwMzVjMWI2NycpO1xuICAgIHRoaXMuX2lzTGlrZWQgPSBmYWxzZTtcblxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtVmFsaWRhdG9yIHtcbiAgLy/Qv9GA0LjQvdC40LzQsNC10YIg0LIg0LrQvtC90YHRgtGA0YPQutGC0L7RgCDQvtCx0YrQtdC60YIg0L3QsNGB0YLRgNC+0LXQuiDRgSDRgdC10LvQtdC60YLQvtGA0LDQvNC4INC4INC60LvQsNGB0YHQsNC80Lgg0YTQvtGA0LzRizpcbiAgLy/Qv9GA0LjQvdC40LzQsNC10YIg0LLRgtC+0YDRi9C8INC/0LDRgNCw0LzQtdGC0YDQvtC8INGN0LvQtdC80LXQvdGCINGC0L7QuSDRhNC+0YDQvNGLLCDQutC+0YLQvtGA0LDRjyDQstCw0LvQuNC00LjRgNGD0LXRgtGB0Y87XG4gIGNvbnN0cnVjdG9yKGNvbmZpZywgZm9ybSkge1xuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbiA9IGNvbmZpZy5zdWJtaXRCdXR0b247XG4gICAgdGhpcy5fcG9wdXBJc0ludmFsaWQgPSBjb25maWcucG9wdXBJc0ludmFsaWQ7XG4gICAgdGhpcy5faW5wdXQgPSBjb25maWcuaW5wdXQ7XG4gICAgdGhpcy5faW5wdXRFcnJvciA9IGNvbmZpZy5pbnB1dEVycm9yO1xuICAgIHRoaXMuX2Vycm9yID0gY29uZmlnLmVycm9yO1xuICAgIHRoaXMuX2Zvcm0gPSBmb3JtO1xuICAgIHRoaXMuX2lucHV0TGlzdCA9IEFycmF5LmZyb20odGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX2lucHV0KSk7XG4gICAgdGhpcy5fYnV0dG9uID0gdGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yKHRoaXMuX3N1Ym1pdEJ1dHRvbik7XG4gIH1cblxuICAvL9C/0YDQuNCy0LDRgtC90YvQtSDQvNC10YLQvtC00YssINC60L7RgtC+0YDRi9C1INC+0LHRgNCw0LHQsNGC0YvQstCw0Y7RgiDRhNC+0YDQvNGDOlxuICBfc2hvd0lucHV0RXJyb3IoaW5wdXQpIHtcbiAgICBjb25zdCBlcnJvciA9IHRoaXMuX2Zvcm0ucXVlcnlTZWxlY3RvcihgLiR7aW5wdXQuaWR9LWVycm9yYCk7XG4gICAgaW5wdXQuY2xhc3NMaXN0LmFkZCh0aGlzLl9pbnB1dEVycm9yKTtcbiAgICBlcnJvci50ZXh0Q29udGVudCA9IGlucHV0LnZhbGlkYXRpb25NZXNzYWdlO1xuICAgIGVycm9yLmNsYXNzTGlzdC5hZGQodGhpcy5fZXJyb3IpO1xuICB9XG5cbiAgX2NoZWNrSW5wdXRWYWxpZGl0eSAoaW5wdXQpIHtcbiAgICBpZiAoIWlucHV0LnZhbGlkaXR5LnZhbGlkKSB7XG4gICAgICB0aGlzLl9zaG93SW5wdXRFcnJvcihpbnB1dCwgaW5wdXQudmFsaWRhdGlvbk1lc3NhZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dCk7XG4gICAgfVxuICB9O1xuXG4gIF9oaWRlSW5wdXRFcnJvciAoaW5wdXQpIHtcbiAgICBjb25zdCBlcnJvciA9IHRoaXMuX2Zvcm0ucXVlcnlTZWxlY3RvcihgLiR7aW5wdXQuaWR9LWVycm9yYCk7XG4gICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9pbnB1dEVycm9yKTtcbiAgICBlcnJvci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2Vycm9yKTtcbiAgICBlcnJvci50ZXh0Q29udGVudCA9ICcnO1xuICB9O1xuXG4gIF9oYXNJbnZhbGlkSW5wdXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lucHV0TGlzdC5zb21lKChpbnB1dCkgPT4ge1xuICAgICAgICByZXR1cm4gIWlucHV0LnZhbGlkaXR5LnZhbGlkO1xuICAgIH0pXG4gIH1cblxuICBfZGlzYWJsZUJ1dHRvbigpIHtcbiAgICB0aGlzLl9idXR0b24uY2xhc3NMaXN0LmFkZCh0aGlzLl9wb3B1cElzSW52YWxpZCk7XG4gICAgdGhpcy5fYnV0dG9uLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgfVxuXG4gIF9lbmFibGVCdXR0b24oKSB7XG4gICAgdGhpcy5fYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fcG9wdXBJc0ludmFsaWQpO1xuICAgIHRoaXMuX2J1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gIH1cblxuICAvL9C40LfQvNC10L3Rj9C10YIg0YHQvtGB0YLQvtGP0L3QuNC1INC60L3QvtC/0LrQuCDRgdCw0LHQvNC40YLQsDpcbiAgdG9nZ2xlQnV0dG9uU3RhdGUoKSB7XG4gICAgaWYgKHRoaXMuX2hhc0ludmFsaWRJbnB1dCgpKSB7XG4gICAgICB0aGlzLl9kaXNhYmxlQnV0dG9uKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZW5hYmxlQnV0dG9uKClcbiAgICAgIH1cbiAgICB9XG5cbiAgLy/Rg9GB0YLQsNC90LDQstC70LjQstCw0LXRgiDQvtCx0YDQsNCx0L7RgtGH0LjQutC4OlxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy50b2dnbGVCdXR0b25TdGF0ZSgpO1xuICAgIHRoaXMuX2lucHV0TGlzdC5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAgKCkgPT4ge1xuICAgICAgICB0aGlzLl9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXQpO1xuICAgICAgICB0aGlzLnRvZ2dsZUJ1dHRvblN0YXRlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8v0L/Rg9Cx0LvQuNGH0L3Ri9C5INC80LXRgtC+0LQsINC60L7RgtC+0YDRi9C5INCy0LrQu9GO0YfQsNC10YIg0LLQsNC70LjQtNCw0YbQuNGOINGE0L7RgNC80YsuXG4gIGVuYWJsZVZhbGlkYXRpb24oKSB7XG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgfTtcbn1cblxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XG4gICAgdGhpcy5fcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX3BvcHVwQ2xvc2VCdXR0b24gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2Nsb3NlLWJ1dHRvbicpO1xuICAgIHRoaXMuX3BvcHVwQ29udGFpbmVyID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwX19jb250YWluZXInKTtcbiAgfVxuICBvcGVuKCkge1xuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX2ZhZGUtb3V0Jyk7XG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LmFkZCgncG9wdXBfZmFkZS1pbicpO1xuICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX29wZW5lZCcpO1xuICAgICAgfSwgMTApO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLChldnQpID0+IHtcbiAgICAgIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKGV2dCk7XG4gICAgfSApO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfZmFkZS1pbicpO1xuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX2ZhZGUtb3V0Jyk7XG4gICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfb3BlbmVkJyk7XG4gICAgICB9LCA0MDApO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZ0KSA9PiB7XG4gICAgICBfaGFuZGxlRXNjQ2xvc2UoZXZ0KTtcbiAgICB9KTtcbiAgfVxuXG4gIF9oYW5kbGVFc2NDbG9zZSA9IChldnQpID0+IHtcbiAgICBpZiAoZXZ0LmtleSA9PT0gJ0VzY2FwZScpe1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbn1cblxuICBfY2xvc2VPbkNsaWNrID0gKGV2dCkgPT4ge1xuICBpZiAoKGV2dC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwb3B1cF9vcGVuZWQnKSkgJiYgKGV2dC50YXJnZXQuY2xvc2VzdCgnLnBvcHVwX19jb250YWluZXInKSAhPSB0aGlzLl9wb3B1cENvbnRhaW5lcikgfHwgKGV2dC50YXJnZXQuY2xvc2VzdCgnLnBvcHVwX19jbG9zZS1idXR0b24nKSA9PSB0aGlzLl9wb3B1cENsb3NlQnV0dG9uKSkge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4vL9C00L7QsdCw0LLQu9GP0LXRgiDRgdC70YPRiNCw0YLQtdC70Ywg0LjQutC+0L3QutC1INC30LDQutGA0YvRgtC40Y9cbnNldEV2ZW50TGlzdGVuZXJzKCkge1xuICB0aGlzLl9wb3B1cC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZXZ0KSA9PiB7XG4gICAgdGhpcy5fY2xvc2VPbkNsaWNrKGV2dCk7XG4gIH0gKTtcbn1cbn1cblxuXG5cbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhGb3JtIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yLCBzdWJtaXRGb3JtSGFuZGxlcikge1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX3N1Ym1pdEZvcm1IYW5kbGVyID0gc3VibWl0Rm9ybUhhbmRsZXI7XG4gICAgdGhpcy5fZm9ybSA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fZm9ybScpO1xuICAgIHRoaXMuX2lucHV0TGlzdCA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb3B1cF9faW5wdXQnKTtcbiAgfVxuXG4gIF9zdWJtaXRGb3JtSGFuZGxlckZ1bmN0aW9uID0gKGV2dCkgPT4ge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuX3N1Ym1pdEZvcm1IYW5kbGVyKHRoaXMuX2dldElucHV0VmFsdWVzKCkpO1xufVxuXG4gIF9nZXRJbnB1dFZhbHVlcygpe1xuICAgIHRoaXMuX2Zvcm1WYWx1ZXMgPSB7fTtcbiAgICB0aGlzLl9pbnB1dExpc3QuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgIHRoaXMuX2Zvcm1WYWx1ZXNbIGlucHV0Lm5hbWUgXSA9IGlucHV0LnZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiAgdGhpcy5fZm9ybVZhbHVlc1xuICB9XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKXtcbiAgICB0aGlzLl9mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuX3N1Ym1pdEZvcm1IYW5kbGVyRnVuY3Rpb24pO1xuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cblxuICBjbG9zZSgpeztcbiAgICB0aGlzLl9mb3JtLnJlc2V0KCk7XG4gICAgc3VwZXIuY2xvc2UoKTtcbiAgfVxufVxuIiwiaW1wb3J0IFBvcHVwIGZyb20gJy4vUG9wdXAuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhJbWFnZSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX3BvcHVwSW1hZ2UgPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2ltYWdlJyk7XG4gICAgdGhpcy5fcG9wdXBDYXB0aW9uID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwX19jYXB0aW9uJyk7XG5cbiAgfVxuXG4gIC8v0L/QtdGA0LXQt9Cw0L/QuNGB0LDRgtGMIG9wZW4g0LjRgdC/0L7Qu9GM0LfRg9GPINC70L7Qs9C40LrRgyDQv9C+0LvQuNC80L7RgNGE0LjQt9C80LBcbiAgb3BlbihlbGVtZW50KSB7XG4gICAgdGhpcy5fcG9wdXBJbWFnZS5zcmMgPSBlbGVtZW50Lmxpbms7XG4gICAgdGhpcy5fcG9wdXBJbWFnZS5hbHQgPSBlbGVtZW50Lm5hbWU7XG4gICAgdGhpcy5fcG9wdXBDYXB0aW9uLnRleHRDb250ZW50ID0gZWxlbWVudC5uYW1lO1xuICAgIHN1cGVyLm9wZW4oKTtcbiAgfVxufVxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwLmpzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoU3VibWl0IGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yLCB7c3VibWl0RGVsZXRpb25IYW5kbGVyfSl7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5fc3VibWl0RGVsZXRpb25IYW5kbGVyID0gc3VibWl0RGVsZXRpb25IYW5kbGVyXG4gIH1cblxuICBfc3VibWl0RGVsZXRpb25IYW5kbGVyRnVuY3Rpb24gPSAoZXZ0KSA9PiB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5fc3VibWl0RGVsZXRpb25IYW5kbGVyKCk7XG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVycygpe1xuICAgIHRoaXMuX3BvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuX3N1Ym1pdERlbGV0aW9uSGFuZGxlckZ1bmN0aW9uKVxuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cbn1cbiIsIlxuLy/Qv9GA0Lgg0L7RgNCz0LDQvdC40LfQsNGG0LjQuCDQutC+0LTQsCDQmtC70LDRgdGB0Ysg0LTQvtC70LbQvdGLINC+0YHRgtCw0LLQsNGC0YzRgdGPINC90LXQt9Cw0LLQuNGB0LjQvNGL0LzQuCzRgtC+0LvRjNC60L4g0YLQvtCz0LTQsCDQuNGFINC80L7QttC90L5cbi8v0LHRg9C00LXRgiDQuNGB0L/QvtC70YzQt9C+0LLQsNGC0Ywg0LIg0LTRgNGD0LPQuNGFINC80LXRgdGC0LDRhVxc0L/RgNC+0LXQutGC0LDRhVxuXG4vL9C60LvQsNGB0YEg0L7RgtCy0LXRh9Cw0LXRgiDQt9CwINCy0YHRgtCw0LLQutGDINGN0LvQtdC80LXQvdGC0L7QsiDQsiDRgNCw0LfQvNC10YLQutGDXG4vL2l0ZW1zIC0g0LzQsNGB0YHQuNCyINC00LDQvdC90YvRhSDQtNC70Y8g0LTQvtCx0LDQstC70LXQvdC40Y8g0L3QsCDRgdGC0YDQsNC90LjRhtGDIC0g0YHQv9C40YHQvtC6IGluaXRpYWxDYXJkcy5qcyDQuNC3IG5hbWUg0LggbGlua1xuLy9yZW5kZXJlciAtICDRhNGD0L3QutGG0LjRjyAtINGB0L7Qt9C00LDQtdGCINC60LDRgNGC0L7Rh9C60YMgKGluaXRpYWxpemVDYXJkKSDQuCDQstGB0YLQsNCy0LvRj9C10YIg0L3QsCDRgdGC0YDQsNC90LjRhtGDIChsb2NhdGVOZXdDYXJkQWhlYWQpLlxuLy9yZW5kZXJlciAtINCh0L7Qt9C00LDQvdC40LUg0Y3QutC30LXQvNC/0LvRj9GA0L7QsiDQutCw0YDRgtC+0YfQtdC6IChuZXcgQ2FyZCkg0Lgg0LjRhSDQstGB0YLQsNCy0LrRgyDQsiDRgNCw0LfQvNC10YLQutGDINCx0YPQtNC10Lwg0L/QtdGA0LXQtNCw0LLQsNGC0Ywg0LIg0LrQvtC90YHRgtGA0YPQutGC0L7RgCDQutC70LDRgdGB0LBcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHtyZW5kZXJlcn0sIGNvbnRhaW5lclNlbGVjdG9yKSB7XG4gICAgdGhpcy5fcmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICB0aGlzLl9jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lclNlbGVjdG9yKTtcbiAgfVxuXG4gICAgcmVuZGVySXRlbXMoY2FyZHMpIHtcbiAgICAgIGNhcmRzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIoZWxlbWVudCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRJdGVtKGRhdGEpe1xuXG4gICAgICB0aGlzLl9jb250YWluZXIucHJlcGVuZChkYXRhKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VySW5mbyB7XG4gIGNvbnN0cnVjdG9yKHVzZXJOYW1lLCB1c2VySm9iKSB7XG4gICAgdGhpcy5fdXNlck5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHVzZXJOYW1lKTtcbiAgICB0aGlzLl91c2VySm9iID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih1c2VySm9iKTtcbiAgfVxuXG4vL9GB0L7QsdGA0LDRgtGMINC00LDQvdC90YvQtSDQuCDQv9C+0LTRgdGC0LDQstC40YLRjCDQsiDRhNC+0YDQvNGDXG5nZXRVc2VySW5mbyA9ICgpID0+IHtcbiAgY29uc3QgdXNlck5hbWUgPSB0aGlzLl91c2VyTmFtZS50ZXh0Q29udGVudDtcbiAgY29uc3QgdXNlckpvYiA9IHRoaXMuX3VzZXJKb2IudGV4dENvbnRlbnQ7XG4gIHJldHVybiB7dXNlck5hbWUsIHVzZXJKb2J9XG59XG5cbi8v0L/RgNC40L3QuNC80LDQtdGCINC90L7QstGL0LUg0LTQsNC90L3Ri9C1INC4INC00L7QsdCw0LLQu9GP0LXRgiDQuNGFINC90LAg0YHRgtGA0LDQvdC40YbRg1xuLy/Qv9C+0LvRg9GH0LDQtdGCINC+0LHRitC10LrRgiDRgSDQutC70Y7Rh9Cw0LzQuCDQuCDRg9GB0YLQsNC90LDQstC70LjQstCw0LXRgiDQuNGFINCyINGA0LDQt9C80LXRgtC60YMuXG5zZXRVc2VySW5mbyA9IChkYXRhKSA9PiB7XG4gIHRoaXMuX3VzZXJOYW1lLnRleHRDb250ZW50ID0gZGF0YS5uYW1lO1xuICB0aGlzLl91c2VySm9iLnRleHRDb250ZW50ID0gZGF0YS5hYm91dDtcbn1cblxufVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvL9GE0LDQudC7INGB0L7QtNC10YDQttC40YIg0YPQvdC40LrQsNC70YzQvdGL0Lkg0LTQu9GPINGB0YLRgNCw0L3QuNGG0Ysg0LrQvtC0IC0gMS7QodC+0LfQtNCw0L3QuNC1INC90L7QstGL0YUg0Y3QutC30LXQvNC/0LvRj9GA0L7QsiDQutC70LDRgdGB0L7QsiAyLtCS0LfQsNC40LzQvtC00LXQudGB0YLQstC40LUg0LzQtdC20LTRgyDQutC70LDRgdGB0LDQvNC4IDMu0J/QtdGA0LXQtNCw0YfRgyDQtNCw0L3QvdGL0YUg0LIg0LrQu9Cw0YHRgdGLXG4vL9C60L7RgNC90LXQstC+0Lkg0YTQsNC50Lsg0L/RgNC+0LXQutGC0LAgLSDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQvdC10L7QsdGF0L7QtNC40LzRi9GFINGE0YPQvdC60YbQuNC5INC4INC60LvQsNGB0YHQvtCyXG5cbmltcG9ydCAnLi9pbmRleC5jc3MnOyAvLyDQtNC+0LHQsNCy0YzRgtC1INC40LzQv9C+0YDRgiDQs9C70LDQstC90L7Qs9C+INGE0LDQudC70LAg0YHRgtC40LvQtdC5XG5pbXBvcnQgQ2FyZCBmcm9tICcuLi9zY3JpcHRzL2NvbXBvbmVudHMvQ2FyZC5qcydcbmltcG9ydCBGb3JtVmFsaWRhdG9yIGZyb20gJy4uL3NjcmlwdHMvY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzJ1xuaW1wb3J0IFNlY3Rpb24gZnJvbSAnLi4vc2NyaXB0cy9jb21wb25lbnRzL1NlY3Rpb24uanMnO1xuaW1wb3J0IFBvcHVwV2l0aEltYWdlIGZyb20gJy4uL3NjcmlwdHMvY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qcyc7XG5pbXBvcnQgUG9wdXBXaXRoRm9ybSBmcm9tICcuLi9zY3JpcHRzL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybS5qcyc7XG5pbXBvcnQgVXNlckluZm8gZnJvbSAnLi4vc2NyaXB0cy9jb21wb25lbnRzL1VzZXJJbmZvLmpzJztcbmltcG9ydCBBcGkgZnJvbSAnLi4vc2NyaXB0cy9jb21wb25lbnRzL0FwaS5qcyc7XG5pbXBvcnQgUG9wdXBXaXRoU3VibWl0IGZyb20gJy4uL3NjcmlwdHMvY29tcG9uZW50cy9Qb3B1cFdpdGhTdWJtaXQnO1xuXG5jb25zdCBhcGkgPSBuZXcgQXBpKCdodHRwczovL21lc3RvLm5vbW9yZXBhcnRpZXMuY28vdjEvY29ob3J0LTQzJywgJzEzZTBkMDFhLTM2MzEtNDVhNS1iM2E2LTFhN2Y4NzI5NTA0OScpXG5cbmNvbnN0IGNvbmZpZyA9IHtcbiAgc3VibWl0QnV0dG9uOiAnLnBvcHVwX19zYXZlJyxcbiAgcG9wdXBJc0ludmFsaWQ6ICdwb3B1cF9fc2F2ZV9kaXNhYmxlZCcsXG4gIGlucHV0OiAnLnBvcHVwX19pbnB1dCcsXG4gIGlucHV0RXJyb3I6ICcucG9wdXBfX2lucHV0X3R5cGVfZXJyb3InLFxuICBlcnJvcjogJy5lcnJvcidcbn1cblxuY29uc3QgcHJvZmlsZU9wZW5Qb3B1cEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9maWxlX19lZGl0LWJ1dHRvbicpO1xuY29uc3QgZm9ybVByb2ZpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2Zvcm1fcHJvZmlsZScpO1xuY29uc3QgbmFtZUlucHV0ID0gZm9ybVByb2ZpbGUucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cInN1cm5hbWVcIl0nKTtcbmNvbnN0IGpvYklucHV0ID0gZm9ybVByb2ZpbGUucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cImpvYlwiXScpO1xuY29uc3QgZWxlbWVudE9wZW5Qb3B1cEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9maWxlX19hZGQtYnV0dG9uJyk7XG5jb25zdCBmb3JtRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fZm9ybV9hZGQnKTtcbmNvbnN0IHBvcHVwZXJQcm9maWxlV2l0aEZvcm0gPSBuZXcgUG9wdXBXaXRoRm9ybSgnLnBvcHVwX3Byb2ZpbGUnLCBzdWJtaXRGb3JtUHJvZmlsZUhhbmRsZXIpXG5jb25zdCBmb3JtQXZhdGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX19mb3JtX2F2YXRhcicpO1xuY29uc3QgYXZhdGFyT3BlblBvcHVwQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2ZpbGVfX2F2YXRhci1lZGl0LWJ1dHRvbicpO1xuY29uc3QgYXZhdGFySW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZmlsZV9fYXZhdGFyJyk7XG5jb25zdCBwb3B1cGVyQXZhdGFyID0gbmV3IFBvcHVwV2l0aEZvcm0oJy5wb3B1cF9hdmF0YXInLCBzdWJtaXRGb3JtQXZhdGFySGFuZGxlcilcbmNvbnN0IHVzZXJJbmZvID0gbmV3IFVzZXJJbmZvKCcucHJvZmlsZV9fbmFtZScsICcucHJvZmlsZV9fYmlvJylcblxuZnVuY3Rpb24gc3VibWl0Rm9ybVByb2ZpbGVIYW5kbGVyKGRhdGEpIHtcbiAgZm9ybVByb2ZpbGUucXVlcnlTZWxlY3Rvcihjb25maWcuc3VibWl0QnV0dG9uKS50ZXh0Q29udGVudCA9ICfQodC+0YXRgNCw0L3QtdC90LjQtS4uLic7XG4gIGFwaS5hZGRQcm9maWxlKGRhdGEpXG4gIC50aGVuKChkYXRhKSA9PiB7XG4gICAgdXNlckluZm8uc2V0VXNlckluZm8oZGF0YSlcbiAgICBwb3B1cGVyUHJvZmlsZVdpdGhGb3JtLmNsb3NlKClcbiAgfSlcbiAgLmNhdGNoKChlcnIpID0+IHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9KVxuICAuZmluYWxseSgoKT0+e1xuICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICBmb3JtUHJvZmlsZS5xdWVyeVNlbGVjdG9yKGNvbmZpZy5zdWJtaXRCdXR0b24pLnRleHRDb250ZW50ID0gJ9Ch0L7RhdGA0LDQvdC40YLRjCc7XG4gICAgfSwgNDAwKTtcbiAgfSlcbn1cblxuZm9ybUF2YXRhci5xdWVyeVNlbGVjdG9yKGNvbmZpZy5zdWJtaXRCdXR0b24pLnRleHRDb250ZW50ID0gJ9Ch0L7RhdGA0LDQvdC40YLRjCc7XG5cbmZ1bmN0aW9uIHN1Ym1pdEZvcm1BdmF0YXJIYW5kbGVyKGRhdGEpIHtcbiAgZm9ybUF2YXRhci5xdWVyeVNlbGVjdG9yKGNvbmZpZy5zdWJtaXRCdXR0b24pLnRleHRDb250ZW50ID0gJ9Ch0L7RhdGA0LDQvdC10L3QuNC1Li4uJztcbiAgYXBpLmFkZEF2YXRhcihkYXRhKVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZmlsZV9fYXZhdGFyJykuc3JjID0gZGF0YS5hdmF0YXI7XG4gICAgICBwb3B1cGVyQXZhdGFyLmNsb3NlKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KVxuICAgIC5maW5hbGx5KCgpPT57XG4gICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICBmb3JtQXZhdGFyLnF1ZXJ5U2VsZWN0b3IoY29uZmlnLnN1Ym1pdEJ1dHRvbikudGV4dENvbnRlbnQgPSAn0KHQvtGF0YDQsNC90LjRgtGMJztcbiAgICAgIH0sIDQwMCk7XG4gICAgfSlcbn1cblxuYXZhdGFySW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xuICBhdmF0YXJPcGVuUG9wdXBCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG59KVxuXG5hdmF0YXJJbWFnZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsICgpID0+IHtcbiAgYXZhdGFyT3BlblBvcHVwQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59KVxuXG5hdmF0YXJJbWFnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgZm9ybVZhbGlkYXRvcnNbIGZvcm1BdmF0YXIubmFtZSBdLnRvZ2dsZUJ1dHRvblN0YXRlKClcbiAgcG9wdXBlckF2YXRhci5vcGVuKCk7XG59KVxuXG5wb3B1cGVyQXZhdGFyLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cblxuYXBpLmdldEluaXRpYWxDYXJkcygpXG4gIC50aGVuKChpbml0aWFsQ2FyZHMpID0+IHtcbiAgICBjYXJkTGlzdC5yZW5kZXJJdGVtcyhpbml0aWFsQ2FyZHMucmV2ZXJzZSgpKTtcbiAgfSlcbiAgLmNhdGNoKChlcnIpID0+IHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9KVxuXG5hcGkuZ2V0UHJvZmlsZSgpXG4gIC50aGVuKChwcm9maWxlSW5mbykgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9maWxlX19uYW1lJykudGV4dENvbnRlbnQgPSBwcm9maWxlSW5mby5uYW1lO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9maWxlX19iaW8nKS50ZXh0Q29udGVudCA9IHByb2ZpbGVJbmZvLmFib3V0O1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9maWxlX19hdmF0YXInKS5zcmMgPSBwcm9maWxlSW5mby5hdmF0YXI7XG4gICAgfSlcbiAgLmNhdGNoKChlcnIpID0+IHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9KVxuXG5wb3B1cGVyUHJvZmlsZVdpdGhGb3JtLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbnByb2ZpbGVPcGVuUG9wdXBCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGZvcm1WYWxpZGF0b3JzWyBmb3JtUHJvZmlsZS5uYW1lIF0udG9nZ2xlQnV0dG9uU3RhdGUoKTtcbiAgcG9wdXBlclByb2ZpbGVXaXRoRm9ybS5vcGVuKCk7XG4gIGNvbnN0IGluaXRpYWxJbmZvID0gdXNlckluZm8uZ2V0VXNlckluZm8oKTtcbiAgbmFtZUlucHV0LnZhbHVlID0gaW5pdGlhbEluZm8udXNlck5hbWU7XG4gIGpvYklucHV0LnZhbHVlID0gaW5pdGlhbEluZm8udXNlckpvYjtcbn0pO1xuXG5lbGVtZW50T3BlblBvcHVwQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBmb3JtVmFsaWRhdG9yc1sgZm9ybUVsZW1lbnQubmFtZSBdLnRvZ2dsZUJ1dHRvblN0YXRlKClcblxuICBwb3B1cGVyRWxlbWVudFdpdGhGb3JtLm9wZW4oKTtcbn0gKTtcblxuY29uc3QgcG9wdXBlclpvb20gPSBuZXcgUG9wdXBXaXRoSW1hZ2UoJy5wb3B1cF96b29tJylcbnBvcHVwZXJab29tLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUNhcmQoZWxlbWVudCl7XG4gIGNvbnN0IGNhcmQgPSBuZXcgQ2FyZChlbGVtZW50LFxuICAgICcuaXRlbS10ZW1wbGF0ZScsXG4gICAge2hhbmRsZUNhcmRDbGljazogKCkgPT4ge1xuICAgIHBvcHVwZXJab29tLm9wZW4oZWxlbWVudCl9fSxcbiAgICB7ZGVsZXRlQ2xpY2tIYW5kbGVyOiAoY2FyZElkKSA9PiB7XG4gICAgICBjb25zdCBkZWxldGVQb3B1cGVyID0gbmV3IFBvcHVwV2l0aFN1Ym1pdCgnLnBvcHVwX2RlbGV0ZScsXG4gICAgICAge3N1Ym1pdERlbGV0aW9uSGFuZGxlcjogKCkgPT4ge1xuICAgICAgICAgIGFwaS5kZWxldGVDYXJkKGNhcmRJZClcbiAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBkZWxldGVQb3B1cGVyLmNsb3NlKCk7XG4gICAgICAgICAgICBjYXJkLmhhbmRsZUVsZW1lbnREZWxldGUoKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgfSlcbiAgICAgICB9fSlcbiAgICAgICBkZWxldGVQb3B1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgZGVsZXRlUG9wdXBlci5vcGVuKCk7XG4gICAgfX0sXG4gICAge2xpa2VDbGlja0hhbmRsZXI6IChjYXJkSWQpID0+IHtcbiAgICAgIGFwaS5zZXRMaWtlKGNhcmRJZClcbiAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgIGNhcmQuaGFuZGxlU2V0TGlrZShkYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICB9KVxuICAgIH19LFxuICAgIHtyZXNldExpa2VDbGlja0hhbmRsZXI6IChjYXJkSWQpID0+IHtcbiAgICAgIGFwaS5yZXNldExpa2UoY2FyZElkKVxuICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgY2FyZC5oYW5kbGVSZXNldExpa2UoZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgfSlcbiAgICB9fVxuICAgIClcblxuICAgIHJldHVybiBjYXJkLmNyZWF0ZUNhcmQoKTtcbn1cblxuY29uc3QgY2FyZExpc3QgPSBuZXcgU2VjdGlvbih7XG4gICAgcmVuZGVyZXI6IChlbGVtZW50KSA9PiB7XG4gICAgICAgIGNhcmRMaXN0LmFkZEl0ZW0oY3JlYXRlQ2FyZChlbGVtZW50KSlcbiAgfVxufSxcbicuZWxlbWVudHMnXG4pO1xuXG5jb25zdCBwb3B1cGVyRWxlbWVudFdpdGhGb3JtID0gbmV3IFBvcHVwV2l0aEZvcm0oJy5wb3B1cF9hZGQnLCBzdWJtaXRGb3JtRWxlbWVudEhhbmRsZXIpXG5cbmZ1bmN0aW9uIHN1Ym1pdEZvcm1FbGVtZW50SGFuZGxlciAoZGF0YSkge1xuICBmb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKGNvbmZpZy5zdWJtaXRCdXR0b24pLnRleHRDb250ZW50ID0gJ9Ch0L7RhdGA0LDQvdC10L3QuNC1Li4uJztcbiAgYXBpLmFkZENhcmQoZGF0YSlcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgY2FyZExpc3QuYWRkSXRlbShjcmVhdGVDYXJkKGRhdGEpKVxuICAgICAgcG9wdXBlckVsZW1lbnRXaXRoRm9ybS5jbG9zZSgpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfSlcbiAgICAuZmluYWxseSgoKT0+e1xuICAgICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgZm9ybUVsZW1lbnQucXVlcnlTZWxlY3Rvcihjb25maWcuc3VibWl0QnV0dG9uKS50ZXh0Q29udGVudCA9ICfQodC+0YXRgNCw0L3QuNGC0YwnO1xuICAgICAgfSwgNDAwKTtcbiAgICB9KVxufVxuXG5wb3B1cGVyRWxlbWVudFdpdGhGb3JtLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbmNvbnN0IGZvcm1WYWxpZGF0b3JzID0ge31cblxuY29uc3QgZW5hYmxlVmFsaWRhdGlvbiA9IChjb25maWcpID0+IHtcbiAgY29uc3QgZm9ybUxpc3QgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb3B1cF9fZm9ybScpKTtcbiAgZm9ybUxpc3QuZm9yRWFjaCgoZm9ybSkgPT4ge1xuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZXZ0KSB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KVxuICAgIGNvbnN0IGZvcm1WYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihjb25maWcsIGZvcm0pO1xuICAgIGZvcm1WYWxpZGF0b3JzWyBmb3JtLm5hbWUgXSA9IGZvcm1WYWxpZGF0b3I7XG4gICAgZm9ybVZhbGlkYXRvci5lbmFibGVWYWxpZGF0aW9uKCk7XG4gIH0pO1xufTtcblxuZW5hYmxlVmFsaWRhdGlvbihjb25maWcpO1xuXG5cblxuIl0sIm5hbWVzIjpbIkFwaSIsInVybCIsInRva2VuIiwiX3VybCIsIl90b2tlbiIsIl9oZWFkZXJzIiwiZmV0Y2giLCJoZWFkZXJzIiwidGhlbiIsInJlcyIsIm9rIiwianNvbiIsIlByb21pc2UiLCJyZWplY3QiLCJkYXRhIiwiYm9keSIsIm5hbWUiLCJzdXJuYW1lIiwiYWJvdXQiLCJqb2IiLCJtZXRob2QiLCJKU09OIiwic3RyaW5naWZ5IiwibGluayIsImNhcmRJZCIsImF2YXRhciIsIlBvcHVwIiwiQ2FyZCIsImNhcmRTZWxlY3RvciIsImhhbmRsZUNhcmRDbGljayIsImRlbGV0ZUNsaWNrSGFuZGxlciIsImxpa2VDbGlja0hhbmRsZXIiLCJyZXNldExpa2VDbGlja0hhbmRsZXIiLCJfZGF0YSIsIl9uYW1lIiwiX2xpbmsiLCJfY2FyZFNlbGVjdG9yIiwiX2hhbmRsZUNhcmRDbGljayIsIl9lbGVtZW50IiwiX2dldFRlbXBsYXRlIiwiX2NhcmRJbWFnZSIsInF1ZXJ5U2VsZWN0b3IiLCJfbGlrZUJ1dHRvbiIsIl9lbGVtZW50TmFtZSIsIl9kZWxldGVCdXR0b24iLCJfbGlrZUNvdW50ZXIiLCJfbnVtYmVyT2ZMaWtlcyIsImxpa2VzIiwiX293bmVySWQiLCJvd25lciIsIl9pZCIsIl9kZWxldGVDbGlja0hhbmRsZXIiLCJfbGlrZUNsaWNrSGFuZGxlciIsIl9yZXNldGxpa2VDbGlja0hhbmRsZXIiLCJfaXNMaWtlZCIsIm1hcCIsImVsIiwiaW5jbHVkZXMiLCJuZXdJdGVtIiwiZG9jdW1lbnQiLCJjb250ZW50IiwiY2xvbmVOb2RlIiwiX2FkZExpc3RlbmVycyIsInNyYyIsImFsdCIsInRleHRDb250ZW50IiwibGVuZ3RoIiwidG9TdHJpbmciLCJjbGFzc0xpc3QiLCJhZGQiLCJzdHlsZSIsImRpc3BsYXkiLCJhZGRFdmVudExpc3RlbmVyIiwiX2dldElkIiwiX2xpa2VIYW5kbGVyIiwiZXZ0IiwicmVtb3ZlIiwiRm9ybVZhbGlkYXRvciIsImNvbmZpZyIsImZvcm0iLCJfc3VibWl0QnV0dG9uIiwic3VibWl0QnV0dG9uIiwiX3BvcHVwSXNJbnZhbGlkIiwicG9wdXBJc0ludmFsaWQiLCJfaW5wdXQiLCJpbnB1dCIsIl9pbnB1dEVycm9yIiwiaW5wdXRFcnJvciIsIl9lcnJvciIsImVycm9yIiwiX2Zvcm0iLCJfaW5wdXRMaXN0IiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsIl9idXR0b24iLCJpZCIsInZhbGlkYXRpb25NZXNzYWdlIiwidmFsaWRpdHkiLCJ2YWxpZCIsIl9zaG93SW5wdXRFcnJvciIsIl9oaWRlSW5wdXRFcnJvciIsInNvbWUiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJfaGFzSW52YWxpZElucHV0IiwiX2Rpc2FibGVCdXR0b24iLCJfZW5hYmxlQnV0dG9uIiwidG9nZ2xlQnV0dG9uU3RhdGUiLCJmb3JFYWNoIiwiX2NoZWNrSW5wdXRWYWxpZGl0eSIsIl9zZXRFdmVudExpc3RlbmVycyIsInBvcHVwU2VsZWN0b3IiLCJrZXkiLCJjbG9zZSIsInRhcmdldCIsImNvbnRhaW5zIiwiY2xvc2VzdCIsIl9wb3B1cENvbnRhaW5lciIsIl9wb3B1cENsb3NlQnV0dG9uIiwiX3BvcHVwIiwic2V0VGltZW91dCIsIl9oYW5kbGVFc2NDbG9zZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJfY2xvc2VPbkNsaWNrIiwiUG9wdXBXaXRoRm9ybSIsInN1Ym1pdEZvcm1IYW5kbGVyIiwicHJldmVudERlZmF1bHQiLCJfc3VibWl0Rm9ybUhhbmRsZXIiLCJfZ2V0SW5wdXRWYWx1ZXMiLCJfZm9ybVZhbHVlcyIsInZhbHVlIiwiX3N1Ym1pdEZvcm1IYW5kbGVyRnVuY3Rpb24iLCJyZXNldCIsIlBvcHVwV2l0aEltYWdlIiwiX3BvcHVwSW1hZ2UiLCJfcG9wdXBDYXB0aW9uIiwiZWxlbWVudCIsIlBvcHVwV2l0aFN1Ym1pdCIsInN1Ym1pdERlbGV0aW9uSGFuZGxlciIsIl9zdWJtaXREZWxldGlvbkhhbmRsZXIiLCJfc3VibWl0RGVsZXRpb25IYW5kbGVyRnVuY3Rpb24iLCJTZWN0aW9uIiwiY29udGFpbmVyU2VsZWN0b3IiLCJyZW5kZXJlciIsIl9yZW5kZXJlciIsIl9jb250YWluZXIiLCJjYXJkcyIsInByZXBlbmQiLCJVc2VySW5mbyIsInVzZXJOYW1lIiwidXNlckpvYiIsIl91c2VyTmFtZSIsIl91c2VySm9iIiwiYXBpIiwicHJvZmlsZU9wZW5Qb3B1cEJ1dHRvbiIsImZvcm1Qcm9maWxlIiwibmFtZUlucHV0Iiwiam9iSW5wdXQiLCJlbGVtZW50T3BlblBvcHVwQnV0dG9uIiwiZm9ybUVsZW1lbnQiLCJwb3B1cGVyUHJvZmlsZVdpdGhGb3JtIiwic3VibWl0Rm9ybVByb2ZpbGVIYW5kbGVyIiwiZm9ybUF2YXRhciIsImF2YXRhck9wZW5Qb3B1cEJ1dHRvbiIsImF2YXRhckltYWdlIiwicG9wdXBlckF2YXRhciIsInN1Ym1pdEZvcm1BdmF0YXJIYW5kbGVyIiwidXNlckluZm8iLCJhZGRQcm9maWxlIiwic2V0VXNlckluZm8iLCJjYXRjaCIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJmaW5hbGx5IiwiYWRkQXZhdGFyIiwiZm9ybVZhbGlkYXRvcnMiLCJvcGVuIiwic2V0RXZlbnRMaXN0ZW5lcnMiLCJnZXRJbml0aWFsQ2FyZHMiLCJpbml0aWFsQ2FyZHMiLCJjYXJkTGlzdCIsInJlbmRlckl0ZW1zIiwicmV2ZXJzZSIsImdldFByb2ZpbGUiLCJwcm9maWxlSW5mbyIsImluaXRpYWxJbmZvIiwiZ2V0VXNlckluZm8iLCJwb3B1cGVyRWxlbWVudFdpdGhGb3JtIiwicG9wdXBlclpvb20iLCJjcmVhdGVDYXJkIiwiY2FyZCIsImRlbGV0ZVBvcHVwZXIiLCJkZWxldGVDYXJkIiwiaGFuZGxlRWxlbWVudERlbGV0ZSIsInNldExpa2UiLCJoYW5kbGVTZXRMaWtlIiwicmVzZXRMaWtlIiwiaGFuZGxlUmVzZXRMaWtlIiwiYWRkSXRlbSIsInN1Ym1pdEZvcm1FbGVtZW50SGFuZGxlciIsImFkZENhcmQiLCJlbmFibGVWYWxpZGF0aW9uIiwiZm9ybUxpc3QiLCJmb3JtVmFsaWRhdG9yIl0sInNvdXJjZVJvb3QiOiIifQ==