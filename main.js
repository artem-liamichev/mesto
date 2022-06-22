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
        avatar: data.link
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0lBQ0QsQ0FGRDtJQUdBLElBQU04RSxhQUFhLEdBQUcsSUFBSWhJLDRFQUFKLENBQWtCQyxNQUFsQixFQUEwQkMsSUFBMUIsQ0FBdEI7SUFDQWtHLGNBQWMsQ0FBRWxHLElBQUksQ0FBQy9ELElBQVAsQ0FBZCxHQUE4QjZMLGFBQTlCO0lBQ0FBLGFBQWEsQ0FBQ0YsZ0JBQWQ7RUFDRCxDQVBEO0FBUUQsQ0FWRDs7QUFZQUEsZ0JBQWdCLENBQUM3SCxNQUFELENBQWhCLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvQXBpLmpzIiwid2VicGFjazovL21lc3RvLy4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9DYXJkLmpzIiwid2VicGFjazovL21lc3RvLy4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzIiwid2VicGFjazovL21lc3RvLy4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9Qb3B1cC5qcyIsIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybS5qcyIsIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanMiLCJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL1BvcHVwV2l0aFN1Ym1pdC5qcyIsIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvVXNlckluZm8uanMiLCJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvcGFnZXMvaW5kZXguY3NzIiwid2VicGFjazovL21lc3RvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21lc3RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tZXN0by93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21lc3RvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvcGFnZXMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBpIHtcbiAgY29uc3RydWN0b3IodXJsLCB0b2tlbikge1xuICAgIHRoaXMuX3VybCA9IHVybDtcbiAgICB0aGlzLl90b2tlbiA9IHRva2VuO1xuICAgIHRoaXMuX2hlYWRlcnMgPSB7XG4gICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgJ0F1dGhvcml6YXRpb24nOiB0aGlzLl90b2tlbixcbiAgICB9XG4gIH1cblxuICBnZXRJbml0aWFsQ2FyZHMoKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX3VybH0vY2FyZHMvYCwge1xuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVyc1xuICAgIH0pXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ9CS0L7Qt9C90LjQutC70LAg0L7RiNC40LHQutCwJylcbiAgICAgIH0pXG4gIH1cblxuICBnZXRQcm9maWxlKCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLl91cmx9L3VzZXJzL21lYCwge1xuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVyc1xuICAgIH0pXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ9CS0L7Qt9C90LjQutC70LAg0L7RiNC40LHQutCwJylcbiAgICAgIH0pXG4gIH1cblxuICBhZGRQcm9maWxlKGRhdGEpIHtcbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgbmFtZTogZGF0YS5zdXJuYW1lLFxuICAgICAgYWJvdXQ6IGRhdGEuam9iXG4gICAgfVxuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLl91cmx9L3VzZXJzL21lYCwge1xuICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpXG59KVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ9CS0L7Qt9C90LjQutC70LAg0L7RiNC40LHQutCwJylcbiAgICB9KVxuICB9XG5cbiAgYWRkQ2FyZChkYXRhKSB7XG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgIG5hbWU6IGRhdGEubmFtZSxcbiAgICAgIGxpbms6IGRhdGEubGlua1xuICAgIH1cbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5fdXJsfS9jYXJkcy9gLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KVxufSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCfQktC+0LfQvdC40LrQu9CwINC+0YjQuNCx0LrQsCcpXG4gICAgfSlcbiAgfVxuXG4gIGRlbGV0ZUNhcmQoY2FyZElkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX3VybH0vY2FyZHMvJHtjYXJkSWR9YCwge1xuICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCfQktC+0LfQvdC40LrQu9CwINC+0YjQuNCx0LrQsCcpXG4gICAgfSlcbiAgfVxuXG4gIHNldExpa2UoY2FyZElkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX3VybH0vY2FyZHMvJHtjYXJkSWR9L2xpa2VzYCwge1xuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgfSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCfQktC+0LfQvdC40LrQu9CwINC+0YjQuNCx0LrQsCcpXG4gICAgfSlcbiAgfVxuXG4gIHJlc2V0TGlrZShjYXJkSWQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5fdXJsfS9jYXJkcy8ke2NhcmRJZH0vbGlrZXNgLCB7XG4gICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ9CS0L7Qt9C90LjQutC70LAg0L7RiNC40LHQutCwJylcbiAgICB9KVxuICB9XG5cbiAgYWRkQXZhdGFyKGRhdGEpIHtcbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgYXZhdGFyOiBkYXRhLmxpbmssXG4gICAgfVxuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLl91cmx9L3VzZXJzL21lL2F2YXRhcmAsIHtcbiAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KVxufSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCfQktC+0LfQvdC40LrQu9CwINC+0YjQuNCx0LrQsCcpXG4gICAgfSlcbiAgfVxuXG4gfVxuIiwiaW1wb3J0IFBvcHVwIGZyb20gJy4uL2NvbXBvbmVudHMvUG9wdXAuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJkIHtcbiAgLy/QutC70LDRgdGBINGB0L7Qt9C00LDRkdGCINC60LDRgNGC0L7Rh9C60YMg0YEg0YLQtdC60YHRgtC+0Lwg0Lgg0YHRgdGL0LvQutC+0Lkg0L3QsCDQuNC30L7QsdGA0LDQttC10L3QuNC1XG4gIC8v0L/RgNC40L3QuNC80LDQtdGCINCyINC60L7QvdGB0YLRgNGD0LrRgtC+0YAg0LTQsNC90L3Ri9C1INC60LDRgNGC0L7Rh9C60Lgg0Lgg0YHQtdC70LXQutGC0L7RgCDQtdGRIHRlbXBsYXRlLdGN0LvQtdC80LXQvdGC0LA7XG4gIGNvbnN0cnVjdG9yKGRhdGEsIGNhcmRTZWxlY3Rvciwge2hhbmRsZUNhcmRDbGlja30sIHtkZWxldGVDbGlja0hhbmRsZXJ9LCB7bGlrZUNsaWNrSGFuZGxlcn0sIHtyZXNldExpa2VDbGlja0hhbmRsZXJ9KSB7XG4gICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gICAgdGhpcy5fbmFtZSA9IGRhdGEubmFtZTtcbiAgICB0aGlzLl9saW5rID0gZGF0YS5saW5rO1xuICAgIHRoaXMuX2NhcmRTZWxlY3RvciA9IGNhcmRTZWxlY3RvcjtcbiAgICB0aGlzLl9oYW5kbGVDYXJkQ2xpY2sgPSBoYW5kbGVDYXJkQ2xpY2s7XG4gICAgdGhpcy5fZWxlbWVudCA9IHRoaXMuX2dldFRlbXBsYXRlKCk7XG4gICAgdGhpcy5fY2FyZEltYWdlID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZWxlbWVudF9faW1hZ2UnKTtcbiAgICB0aGlzLl9saWtlQnV0dG9uID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZWxlbWVudF9fbGlrZS1idXR0b24nKTtcbiAgICB0aGlzLl9lbGVtZW50TmFtZSA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcignLmVsZW1lbnRfX25hbWUnKTtcbiAgICB0aGlzLl9kZWxldGVCdXR0b24gPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbGVtZW50X19kZWxldGUtYnV0dG9uJyk7XG4gICAgdGhpcy5fbGlrZUNvdW50ZXIgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbGVtZW50X19saWtlLW51bWJlcicpO1xuICAgIHRoaXMuX251bWJlck9mTGlrZXMgPSBkYXRhLmxpa2VzO1xuICAgIHRoaXMuX293bmVySWQgPSBkYXRhLm93bmVyLl9pZDtcbiAgICB0aGlzLl9kZWxldGVDbGlja0hhbmRsZXIgPSBkZWxldGVDbGlja0hhbmRsZXI7XG4gICAgdGhpcy5fbGlrZUNsaWNrSGFuZGxlciA9IGxpa2VDbGlja0hhbmRsZXI7XG4gICAgdGhpcy5fcmVzZXRsaWtlQ2xpY2tIYW5kbGVyID0gcmVzZXRMaWtlQ2xpY2tIYW5kbGVyXG4gICAgdGhpcy5faXNMaWtlZCA9IHRoaXMuX2RhdGEubGlrZXMubWFwKChlbCkgPT4gZWwuX2lkKS5pbmNsdWRlcygnMTFhYjZkOGY1NTFkZDMwNzAzNWMxYjY3Jyk7XG5cbiAgfVxuLy/RgdC+0LTQtdGA0LbQuNGCINC/0YDQuNCy0LDRgtC90YvQtSDQvNC10YLQvtC00YssINC60L7RgtC+0YDRi9C1INGA0LDQsdC+0YLQsNGO0YIg0YEg0YDQsNC30LzQtdGC0LrQvtC5XG4gIF9nZXRUZW1wbGF0ZSgpIHtcbiAgICBjb25zdCBuZXdJdGVtID0gZG9jdW1lbnRcbiAgICAucXVlcnlTZWxlY3Rvcih0aGlzLl9jYXJkU2VsZWN0b3IpXG4gICAgLmNvbnRlbnRcbiAgICAucXVlcnlTZWxlY3RvcignLmVsZW1lbnQnKVxuICAgIC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgcmV0dXJuIG5ld0l0ZW1cbiAgfVxuXG4gIGNyZWF0ZUNhcmQoKSB7XG4gICAgLy9jb25kaXRpb24gLSBpZiBjYXJkIGNyZWF0ZWQgYnkgbWUgKG5vdCBpbml0aWFsKVxuICAgIHRoaXMuX2FkZExpc3RlbmVycygpO1xuICAgIC8vINCU0L7QsdCw0LLQuNC8INC00LDQvdC90YvQtVxuICAgIHRoaXMuX2NhcmRJbWFnZS5zcmMgPSB0aGlzLl9saW5rXG4gICAgdGhpcy5fY2FyZEltYWdlLmFsdCA9IHRoaXMuX25hbWVcbiAgICB0aGlzLl9lbGVtZW50TmFtZS50ZXh0Q29udGVudCA9IHRoaXMuX25hbWVcbiAgICB0aGlzLl9saWtlQ291bnRlci50ZXh0Q29udGVudCA9IHRoaXMuX251bWJlck9mTGlrZXMubGVuZ3RoLnRvU3RyaW5nKClcbiAgICAvLyDQktC10YDQvdGR0Lwg0Y3Qu9C10LzQtdC90YIg0L3QsNGA0YPQttGDXG5cbiAgICBpZiAodGhpcy5faXNMaWtlZCkge1xuICAgICAgdGhpcy5fbGlrZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZWxlbWVudF9fbGlrZS1idXR0b25fYWN0aXZlXCIpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9vd25lcklkID09PSBcIjExYWI2ZDhmNTUxZGQzMDcwMzVjMWI2N1wiKSB7XG4gICAgICB0aGlzLl9kZWxldGVCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwiZ3JpZFwiO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9lbGVtZW50O1xuICB9XG5cbi8v0YPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0YHQu9GD0YjQsNGC0LXQu9C10Lkg0YHQvtCx0YvRgtC40Lk6XG4vL9C30LTQtdGB0Ywg0L3Rg9C20L3QsCDRgdGC0YDQtdC70L7Rh9C90LDRjyDRhNGD0L3QutGG0LjRjywg0YIu0LouINC+0L3QsCDQv9C+0LfQstC+0LvRj9C10YIg0L7QsdGA0LDRgtC40YLRjNGB0Y8g0Log0L7QsdGA0LDQsdC+0YLRh9C40LrQsNC8INGH0LXRgNC10LcgdGhpczpcblxuICBfZ2V0SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGEuX2lkO1xuICB9XG5cbiAgX2FkZExpc3RlbmVycygpIHtcbiAgICB0aGlzLl9kZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLl9kZWxldGVDbGlja0hhbmRsZXIodGhpcy5fZ2V0SWQoKSk7XG4gICAgfSk7XG4gICAgdGhpcy5fbGlrZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuX2xpa2VIYW5kbGVyKHRoaXMuX2dldElkKCkpO1xuICAgIH0pO1xuICAgIHRoaXMuX2NhcmRJbWFnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldnQpID0+IHtcbiAgICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljayhldnQpO1xuICAgIH0pO1xuICB9O1xuXG4gIF9saWtlSGFuZGxlcigpe1xuICAgIGlmICh0aGlzLl9pc0xpa2VkKSB7XG4gICAgICB0aGlzLl9yZXNldGxpa2VDbGlja0hhbmRsZXIodGhpcy5fZ2V0SWQoKSk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbGlrZUNsaWNrSGFuZGxlcih0aGlzLl9nZXRJZCgpKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVFbGVtZW50RGVsZXRlKCkge1xuICAgIC8vIGNvbnN0IGRlbGV0ZVBvcHVwZXIgPSBuZXcgUG9wdXAoJy5wb3B1cF9kZWxldGUnKTtcbiAgICAvLyBkZWxldGVQb3B1cGVyLm9wZW4oKTtcbiAgICB0aGlzLl9lbGVtZW50LnJlbW92ZSgpO1xuICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICB9XG5cbiAgaGFuZGxlU2V0TGlrZShkYXRhKSB7XG4gICAgdGhpcy5fbGlrZUNvdW50ZXIudGV4dENvbnRlbnQgPSBkYXRhLmxpa2VzLmxlbmd0aC50b1N0cmluZygpO1xuICAgIHRoaXMuX2xpa2VCdXR0b24uY2xhc3NMaXN0LmFkZChcImVsZW1lbnRfX2xpa2UtYnV0dG9uX2FjdGl2ZVwiKTtcbiAgICAvLyBjb25zdCBsaWtlZCA9IGRhdGEubGlrZXMubWFwKChlbCkgPT4gZWwuX2lkKS5pbmNsdWRlcygnMTFhYjZkOGY1NTFkZDMwNzAzNWMxYjY3Jyk7XG4gICAgdGhpcy5faXNMaWtlZCA9IHRydWU7XG4gIH1cbiAgaGFuZGxlUmVzZXRMaWtlKGRhdGEpIHtcbiAgICB0aGlzLl9saWtlQ291bnRlci50ZXh0Q29udGVudCA9IGRhdGEubGlrZXMubGVuZ3RoLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5fbGlrZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiZWxlbWVudF9fbGlrZS1idXR0b25fYWN0aXZlXCIpO1xuICAgIC8vIGNvbnN0IGxpa2VkID0gZGF0YS5saWtlcy5tYXAoKGVsKSA9PiBlbC5faWQpLmluY2x1ZGVzKCcxMWFiNmQ4ZjU1MWRkMzA3MDM1YzFiNjcnKTtcbiAgICB0aGlzLl9pc0xpa2VkID0gZmFsc2U7XG5cbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybVZhbGlkYXRvciB7XG4gIC8v0L/RgNC40L3QuNC80LDQtdGCINCyINC60L7QvdGB0YLRgNGD0LrRgtC+0YAg0L7QsdGK0LXQutGCINC90LDRgdGC0YDQvtC10Log0YEg0YHQtdC70LXQutGC0L7RgNCw0LzQuCDQuCDQutC70LDRgdGB0LDQvNC4INGE0L7RgNC80Ys6XG4gIC8v0L/RgNC40L3QuNC80LDQtdGCINCy0YLQvtGA0YvQvCDQv9Cw0YDQsNC80LXRgtGA0L7QvCDRjdC70LXQvNC10L3RgiDRgtC+0Lkg0YTQvtGA0LzRiywg0LrQvtGC0L7RgNCw0Y8g0LLQsNC70LjQtNC40YDRg9C10YLRgdGPO1xuICBjb25zdHJ1Y3Rvcihjb25maWcsIGZvcm0pIHtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24gPSBjb25maWcuc3VibWl0QnV0dG9uO1xuICAgIHRoaXMuX3BvcHVwSXNJbnZhbGlkID0gY29uZmlnLnBvcHVwSXNJbnZhbGlkO1xuICAgIHRoaXMuX2lucHV0ID0gY29uZmlnLmlucHV0O1xuICAgIHRoaXMuX2lucHV0RXJyb3IgPSBjb25maWcuaW5wdXRFcnJvcjtcbiAgICB0aGlzLl9lcnJvciA9IGNvbmZpZy5lcnJvcjtcbiAgICB0aGlzLl9mb3JtID0gZm9ybTtcbiAgICB0aGlzLl9pbnB1dExpc3QgPSBBcnJheS5mcm9tKHRoaXMuX2Zvcm0ucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9pbnB1dCkpO1xuICAgIHRoaXMuX2J1dHRvbiA9IHRoaXMuX2Zvcm0ucXVlcnlTZWxlY3Rvcih0aGlzLl9zdWJtaXRCdXR0b24pO1xuICB9XG5cbiAgLy/Qv9GA0LjQstCw0YLQvdGL0LUg0LzQtdGC0L7QtNGLLCDQutC+0YLQvtGA0YvQtSDQvtCx0YDQsNCx0LDRgtGL0LLQsNGO0YIg0YTQvtGA0LzRgzpcbiAgX3Nob3dJbnB1dEVycm9yKGlucHV0KSB7XG4gICAgY29uc3QgZXJyb3IgPSB0aGlzLl9mb3JtLnF1ZXJ5U2VsZWN0b3IoYC4ke2lucHV0LmlkfS1lcnJvcmApO1xuICAgIGlucHV0LmNsYXNzTGlzdC5hZGQodGhpcy5faW5wdXRFcnJvcik7XG4gICAgZXJyb3IudGV4dENvbnRlbnQgPSBpbnB1dC52YWxpZGF0aW9uTWVzc2FnZTtcbiAgICBlcnJvci5jbGFzc0xpc3QuYWRkKHRoaXMuX2Vycm9yKTtcbiAgfVxuXG4gIF9jaGVja0lucHV0VmFsaWRpdHkgKGlucHV0KSB7XG4gICAgaWYgKCFpbnB1dC52YWxpZGl0eS52YWxpZCkge1xuICAgICAgdGhpcy5fc2hvd0lucHV0RXJyb3IoaW5wdXQsIGlucHV0LnZhbGlkYXRpb25NZXNzYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXQpO1xuICAgIH1cbiAgfTtcblxuICBfaGlkZUlucHV0RXJyb3IgKGlucHV0KSB7XG4gICAgY29uc3QgZXJyb3IgPSB0aGlzLl9mb3JtLnF1ZXJ5U2VsZWN0b3IoYC4ke2lucHV0LmlkfS1lcnJvcmApO1xuICAgIGlucHV0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5faW5wdXRFcnJvcik7XG4gICAgZXJyb3IuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9lcnJvcik7XG4gICAgZXJyb3IudGV4dENvbnRlbnQgPSAnJztcbiAgfTtcblxuICBfaGFzSW52YWxpZElucHV0KCkge1xuICAgIHJldHVybiB0aGlzLl9pbnB1dExpc3Quc29tZSgoaW5wdXQpID0+IHtcbiAgICAgICAgcmV0dXJuICFpbnB1dC52YWxpZGl0eS52YWxpZDtcbiAgICB9KVxuICB9XG5cbiAgX2Rpc2FibGVCdXR0b24oKSB7XG4gICAgdGhpcy5fYnV0dG9uLmNsYXNzTGlzdC5hZGQodGhpcy5fcG9wdXBJc0ludmFsaWQpO1xuICAgIHRoaXMuX2J1dHRvbi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gIH1cblxuICBfZW5hYmxlQnV0dG9uKCkge1xuICAgIHRoaXMuX2J1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX3BvcHVwSXNJbnZhbGlkKTtcbiAgICB0aGlzLl9idXR0b24ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICB9XG5cbiAgLy/QuNC30LzQtdC90Y/QtdGCINGB0L7RgdGC0L7Rj9C90LjQtSDQutC90L7Qv9C60Lgg0YHQsNCx0LzQuNGC0LA6XG4gIHRvZ2dsZUJ1dHRvblN0YXRlKCkge1xuICAgIGlmICh0aGlzLl9oYXNJbnZhbGlkSW5wdXQoKSkge1xuICAgICAgdGhpcy5fZGlzYWJsZUJ1dHRvbigpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VuYWJsZUJ1dHRvbigpXG4gICAgICB9XG4gICAgfVxuXG4gIC8v0YPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIg0L7QsdGA0LDQsdC+0YLRh9C40LrQuDpcbiAgX3NldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMudG9nZ2xlQnV0dG9uU3RhdGUoKTtcbiAgICB0aGlzLl9pbnB1dExpc3QuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgICgpID0+IHtcbiAgICAgICAgdGhpcy5fY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0KTtcbiAgICAgICAgdGhpcy50b2dnbGVCdXR0b25TdGF0ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvL9C/0YPQsdC70LjRh9C90YvQuSDQvNC10YLQvtC0LCDQutC+0YLQvtGA0YvQuSDQstC60LvRjtGH0LDQtdGCINCy0LDQu9C40LTQsNGG0LjRjiDRhNC+0YDQvNGLLlxuICBlbmFibGVWYWxpZGF0aW9uKCkge1xuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXJzKCk7XG4gIH07XG59XG5cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHRoaXMuX3BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9wb3B1cENsb3NlQnV0dG9uID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwX19jbG9zZS1idXR0b24nKTtcbiAgICB0aGlzLl9wb3B1cENvbnRhaW5lciA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fY29udGFpbmVyJyk7XG4gIH1cbiAgb3BlbigpIHtcbiAgICB0aGlzLl9wb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9mYWRlLW91dCcpO1xuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX2ZhZGUtaW4nKTtcbiAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICB0aGlzLl9wb3B1cC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9vcGVuZWQnKTtcbiAgICAgIH0sIDEwKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywoZXZ0KSA9PiB7XG4gICAgICB0aGlzLl9oYW5kbGVFc2NDbG9zZShldnQpO1xuICAgIH0gKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX2ZhZGUtaW4nKTtcbiAgICB0aGlzLl9wb3B1cC5jbGFzc0xpc3QuYWRkKCdwb3B1cF9mYWRlLW91dCcpO1xuICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHVwX29wZW5lZCcpO1xuICAgICAgfSwgNDAwKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2dCkgPT4ge1xuICAgICAgX2hhbmRsZUVzY0Nsb3NlKGV2dCk7XG4gICAgfSk7XG4gIH1cblxuICBfaGFuZGxlRXNjQ2xvc2UgPSAoZXZ0KSA9PiB7XG4gICAgaWYgKGV2dC5rZXkgPT09ICdFc2NhcGUnKXtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG59XG5cbiAgX2Nsb3NlT25DbGljayA9IChldnQpID0+IHtcbiAgaWYgKChldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncG9wdXBfb3BlbmVkJykpICYmIChldnQudGFyZ2V0LmNsb3Nlc3QoJy5wb3B1cF9fY29udGFpbmVyJykgIT0gdGhpcy5fcG9wdXBDb250YWluZXIpIHx8IChldnQudGFyZ2V0LmNsb3Nlc3QoJy5wb3B1cF9fY2xvc2UtYnV0dG9uJykgPT0gdGhpcy5fcG9wdXBDbG9zZUJ1dHRvbikpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuLy/QtNC+0LHQsNCy0LvRj9C10YIg0YHQu9GD0YjQsNGC0LXQu9GMINC40LrQvtC90LrQtSDQt9Cw0LrRgNGL0YLQuNGPXG5zZXRFdmVudExpc3RlbmVycygpIHtcbiAgdGhpcy5fcG9wdXAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGV2dCkgPT4ge1xuICAgIHRoaXMuX2Nsb3NlT25DbGljayhldnQpO1xuICB9ICk7XG59XG59XG5cblxuXG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXAuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoRm9ybSBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvciwgc3VibWl0Rm9ybUhhbmRsZXIpIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9zdWJtaXRGb3JtSGFuZGxlciA9IHN1Ym1pdEZvcm1IYW5kbGVyO1xuICAgIHRoaXMuX2Zvcm0gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2Zvcm0nKTtcbiAgICB0aGlzLl9pbnB1dExpc3QgPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yQWxsKCcucG9wdXBfX2lucHV0Jyk7XG4gIH1cblxuICBfc3VibWl0Rm9ybUhhbmRsZXJGdW5jdGlvbiA9IChldnQpID0+IHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLl9zdWJtaXRGb3JtSGFuZGxlcih0aGlzLl9nZXRJbnB1dFZhbHVlcygpKTtcbn1cblxuICBfZ2V0SW5wdXRWYWx1ZXMoKXtcbiAgICB0aGlzLl9mb3JtVmFsdWVzID0ge307XG4gICAgdGhpcy5faW5wdXRMaXN0LmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICB0aGlzLl9mb3JtVmFsdWVzWyBpbnB1dC5uYW1lIF0gPSBpbnB1dC52YWx1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gIHRoaXMuX2Zvcm1WYWx1ZXNcbiAgfVxuXG4gIHNldEV2ZW50TGlzdGVuZXJzKCl7XG4gICAgdGhpcy5fZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLl9zdWJtaXRGb3JtSGFuZGxlckZ1bmN0aW9uKTtcbiAgICBzdXBlci5zZXRFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgY2xvc2UoKXs7XG4gICAgdGhpcy5fZm9ybS5yZXNldCgpO1xuICAgIHN1cGVyLmNsb3NlKCk7XG4gIH1cbn1cbiIsImltcG9ydCBQb3B1cCBmcm9tICcuL1BvcHVwLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9wb3B1cEltYWdlID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwX19pbWFnZScpO1xuICAgIHRoaXMuX3BvcHVwQ2FwdGlvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fY2FwdGlvbicpO1xuXG4gIH1cblxuICAvL9C/0LXRgNC10LfQsNC/0LjRgdCw0YLRjCBvcGVuINC40YHQv9C+0LvRjNC30YPRjyDQu9C+0LPQuNC60YMg0L/QvtC70LjQvNC+0YDRhNC40LfQvNCwXG4gIG9wZW4oZWxlbWVudCkge1xuICAgIHRoaXMuX3BvcHVwSW1hZ2Uuc3JjID0gZWxlbWVudC5saW5rO1xuICAgIHRoaXMuX3BvcHVwSW1hZ2UuYWx0ID0gZWxlbWVudC5uYW1lO1xuICAgIHRoaXMuX3BvcHVwQ2FwdGlvbi50ZXh0Q29udGVudCA9IGVsZW1lbnQubmFtZTtcbiAgICBzdXBlci5vcGVuKCk7XG4gIH1cbn1cbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cC5qc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aFN1Ym1pdCBleHRlbmRzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvciwge3N1Ym1pdERlbGV0aW9uSGFuZGxlcn0pe1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX3N1Ym1pdERlbGV0aW9uSGFuZGxlciA9IHN1Ym1pdERlbGV0aW9uSGFuZGxlclxuICB9XG5cbiAgX3N1Ym1pdERlbGV0aW9uSGFuZGxlckZ1bmN0aW9uID0gKGV2dCkgPT4ge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuX3N1Ym1pdERlbGV0aW9uSGFuZGxlcigpO1xuICB9XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKXtcbiAgICB0aGlzLl9wb3B1cC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLl9zdWJtaXREZWxldGlvbkhhbmRsZXJGdW5jdGlvbilcbiAgICBzdXBlci5zZXRFdmVudExpc3RlbmVycygpO1xuICB9XG59XG4iLCJcbi8v0L/RgNC4INC+0YDQs9Cw0L3QuNC30LDRhtC40Lgg0LrQvtC00LAg0JrQu9Cw0YHRgdGLINC00L7Qu9C20L3RiyDQvtGB0YLQsNCy0LDRgtGM0YHRjyDQvdC10LfQsNCy0LjRgdC40LzRi9C80Lgs0YLQvtC70YzQutC+INGC0L7Qs9C00LAg0LjRhSDQvNC+0LbQvdC+XG4vL9Cx0YPQtNC10YIg0LjRgdC/0L7Qu9GM0LfQvtCy0LDRgtGMINCyINC00YDRg9Cz0LjRhSDQvNC10YHRgtCw0YVcXNC/0YDQvtC10LrRgtCw0YVcblxuLy/QutC70LDRgdGBINC+0YLQstC10YfQsNC10YIg0LfQsCDQstGB0YLQsNCy0LrRgyDRjdC70LXQvNC10L3RgtC+0LIg0LIg0YDQsNC30LzQtdGC0LrRg1xuLy9pdGVtcyAtINC80LDRgdGB0LjQsiDQtNCw0L3QvdGL0YUg0LTQu9GPINC00L7QsdCw0LLQu9C10L3QuNGPINC90LAg0YHRgtGA0LDQvdC40YbRgyAtINGB0L/QuNGB0L7QuiBpbml0aWFsQ2FyZHMuanMg0LjQtyBuYW1lINC4IGxpbmtcbi8vcmVuZGVyZXIgLSAg0YTRg9C90LrRhtC40Y8gLSDRgdC+0LfQtNCw0LXRgiDQutCw0YDRgtC+0YfQutGDIChpbml0aWFsaXplQ2FyZCkg0Lgg0LLRgdGC0LDQstC70Y/QtdGCINC90LAg0YHRgtGA0LDQvdC40YbRgyAobG9jYXRlTmV3Q2FyZEFoZWFkKS5cbi8vcmVuZGVyZXIgLSDQodC+0LfQtNCw0L3QuNC1INGN0LrQt9C10LzQv9C70Y/RgNC+0LIg0LrQsNGA0YLQvtGH0LXQuiAobmV3IENhcmQpINC4INC40YUg0LLRgdGC0LDQstC60YMg0LIg0YDQsNC30LzQtdGC0LrRgyDQsdGD0LTQtdC8INC/0LXRgNC10LTQsNCy0LDRgtGMINCyINC60L7QvdGB0YLRgNGD0LrRgtC+0YAg0LrQu9Cw0YHRgdCwXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlY3Rpb24ge1xuICBjb25zdHJ1Y3Rvcih7cmVuZGVyZXJ9LCBjb250YWluZXJTZWxlY3Rvcikge1xuICAgIHRoaXMuX3JlbmRlcmVyID0gcmVuZGVyZXI7XG4gICAgdGhpcy5fY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXJTZWxlY3Rvcik7XG4gIH1cblxuICAgIHJlbmRlckl0ZW1zKGNhcmRzKSB7XG4gICAgICBjYXJkcy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyKGVsZW1lbnQpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkSXRlbShkYXRhKXtcblxuICAgICAgdGhpcy5fY29udGFpbmVyLnByZXBlbmQoZGF0YSk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckluZm8ge1xuICBjb25zdHJ1Y3Rvcih1c2VyTmFtZSwgdXNlckpvYikge1xuICAgIHRoaXMuX3VzZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih1c2VyTmFtZSk7XG4gICAgdGhpcy5fdXNlckpvYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodXNlckpvYik7XG4gIH1cblxuLy/RgdC+0LHRgNCw0YLRjCDQtNCw0L3QvdGL0LUg0Lgg0L/QvtC00YHRgtCw0LLQuNGC0Ywg0LIg0YTQvtGA0LzRg1xuZ2V0VXNlckluZm8gPSAoKSA9PiB7XG4gIGNvbnN0IHVzZXJOYW1lID0gdGhpcy5fdXNlck5hbWUudGV4dENvbnRlbnQ7XG4gIGNvbnN0IHVzZXJKb2IgPSB0aGlzLl91c2VySm9iLnRleHRDb250ZW50O1xuICByZXR1cm4ge3VzZXJOYW1lLCB1c2VySm9ifVxufVxuXG4vL9C/0YDQuNC90LjQvNCw0LXRgiDQvdC+0LLRi9C1INC00LDQvdC90YvQtSDQuCDQtNC+0LHQsNCy0LvRj9C10YIg0LjRhSDQvdCwINGB0YLRgNCw0L3QuNGG0YNcbi8v0L/QvtC70YPRh9Cw0LXRgiDQvtCx0YrQtdC60YIg0YEg0LrQu9GO0YfQsNC80Lgg0Lgg0YPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIg0LjRhSDQsiDRgNCw0LfQvNC10YLQutGDLlxuc2V0VXNlckluZm8gPSAoZGF0YSkgPT4ge1xuICB0aGlzLl91c2VyTmFtZS50ZXh0Q29udGVudCA9IGRhdGEubmFtZTtcbiAgdGhpcy5fdXNlckpvYi50ZXh0Q29udGVudCA9IGRhdGEuYWJvdXQ7XG59XG5cbn1cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy/RhNCw0LnQuyDRgdC+0LTQtdGA0LbQuNGCINGD0L3QuNC60LDQu9GM0L3Ri9C5INC00LvRjyDRgdGC0YDQsNC90LjRhtGLINC60L7QtCAtIDEu0KHQvtC30LTQsNC90LjQtSDQvdC+0LLRi9GFINGN0LrQt9C10LzQv9C70Y/RgNC+0LIg0LrQu9Cw0YHRgdC+0LIgMi7QktC30LDQuNC80L7QtNC10LnRgdGC0LLQuNC1INC80LXQttC00YMg0LrQu9Cw0YHRgdCw0LzQuCAzLtCf0LXRgNC10LTQsNGH0YMg0LTQsNC90L3Ri9GFINCyINC60LvQsNGB0YHRi1xuLy/QutC+0YDQvdC10LLQvtC5INGE0LDQudC7INC/0YDQvtC10LrRgtCwIC0g0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0L3QtdC+0LHRhdC+0LTQuNC80YvRhSDRhNGD0L3QutGG0LjQuSDQuCDQutC70LDRgdGB0L7QslxuXG5pbXBvcnQgJy4vaW5kZXguY3NzJzsgLy8g0LTQvtCx0LDQstGM0YLQtSDQuNC80L/QvtGA0YIg0LPQu9Cw0LLQvdC+0LPQviDRhNCw0LnQu9CwINGB0YLQuNC70LXQuVxuaW1wb3J0IENhcmQgZnJvbSAnLi4vc2NyaXB0cy9jb21wb25lbnRzL0NhcmQuanMnXG5pbXBvcnQgRm9ybVZhbGlkYXRvciBmcm9tICcuLi9zY3JpcHRzL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qcydcbmltcG9ydCBTZWN0aW9uIGZyb20gJy4uL3NjcmlwdHMvY29tcG9uZW50cy9TZWN0aW9uLmpzJztcbmltcG9ydCBQb3B1cFdpdGhJbWFnZSBmcm9tICcuLi9zY3JpcHRzL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanMnO1xuaW1wb3J0IFBvcHVwV2l0aEZvcm0gZnJvbSAnLi4vc2NyaXB0cy9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanMnO1xuaW1wb3J0IFVzZXJJbmZvIGZyb20gJy4uL3NjcmlwdHMvY29tcG9uZW50cy9Vc2VySW5mby5qcyc7XG5pbXBvcnQgQXBpIGZyb20gJy4uL3NjcmlwdHMvY29tcG9uZW50cy9BcGkuanMnO1xuaW1wb3J0IFBvcHVwV2l0aFN1Ym1pdCBmcm9tICcuLi9zY3JpcHRzL2NvbXBvbmVudHMvUG9wdXBXaXRoU3VibWl0JztcblxuY29uc3QgYXBpID0gbmV3IEFwaSgnaHR0cHM6Ly9tZXN0by5ub21vcmVwYXJ0aWVzLmNvL3YxL2NvaG9ydC00MycsICcxM2UwZDAxYS0zNjMxLTQ1YTUtYjNhNi0xYTdmODcyOTUwNDknKVxuXG5jb25zdCBjb25maWcgPSB7XG4gIHN1Ym1pdEJ1dHRvbjogJy5wb3B1cF9fc2F2ZScsXG4gIHBvcHVwSXNJbnZhbGlkOiAncG9wdXBfX3NhdmVfZGlzYWJsZWQnLFxuICBpbnB1dDogJy5wb3B1cF9faW5wdXQnLFxuICBpbnB1dEVycm9yOiAnLnBvcHVwX19pbnB1dF90eXBlX2Vycm9yJyxcbiAgZXJyb3I6ICcuZXJyb3InXG59XG5cbmNvbnN0IHByb2ZpbGVPcGVuUG9wdXBCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZmlsZV9fZWRpdC1idXR0b24nKTtcbmNvbnN0IGZvcm1Qcm9maWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX19mb3JtX3Byb2ZpbGUnKTtcbmNvbnN0IG5hbWVJbnB1dCA9IGZvcm1Qcm9maWxlLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJzdXJuYW1lXCJdJyk7XG5jb25zdCBqb2JJbnB1dCA9IGZvcm1Qcm9maWxlLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJqb2JcIl0nKTtcbmNvbnN0IGVsZW1lbnRPcGVuUG9wdXBCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZmlsZV9fYWRkLWJ1dHRvbicpO1xuY29uc3QgZm9ybUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2Zvcm1fYWRkJyk7XG5jb25zdCBwb3B1cGVyUHJvZmlsZVdpdGhGb3JtID0gbmV3IFBvcHVwV2l0aEZvcm0oJy5wb3B1cF9wcm9maWxlJywgc3VibWl0Rm9ybVByb2ZpbGVIYW5kbGVyKVxuY29uc3QgZm9ybUF2YXRhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fZm9ybV9hdmF0YXInKTtcbmNvbnN0IGF2YXRhck9wZW5Qb3B1cEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9maWxlX19hdmF0YXItZWRpdC1idXR0b24nKTtcbmNvbnN0IGF2YXRhckltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2ZpbGVfX2F2YXRhcicpO1xuY29uc3QgcG9wdXBlckF2YXRhciA9IG5ldyBQb3B1cFdpdGhGb3JtKCcucG9wdXBfYXZhdGFyJywgc3VibWl0Rm9ybUF2YXRhckhhbmRsZXIpXG5jb25zdCB1c2VySW5mbyA9IG5ldyBVc2VySW5mbygnLnByb2ZpbGVfX25hbWUnLCAnLnByb2ZpbGVfX2JpbycpXG5cbmZ1bmN0aW9uIHN1Ym1pdEZvcm1Qcm9maWxlSGFuZGxlcihkYXRhKSB7XG4gIGZvcm1Qcm9maWxlLnF1ZXJ5U2VsZWN0b3IoY29uZmlnLnN1Ym1pdEJ1dHRvbikudGV4dENvbnRlbnQgPSAn0KHQvtGF0YDQsNC90LXQvdC40LUuLi4nO1xuICBhcGkuYWRkUHJvZmlsZShkYXRhKVxuICAudGhlbigoZGF0YSkgPT4ge1xuICAgIHVzZXJJbmZvLnNldFVzZXJJbmZvKGRhdGEpXG4gICAgcG9wdXBlclByb2ZpbGVXaXRoRm9ybS5jbG9zZSgpXG4gIH0pXG4gIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgY29uc29sZS5sb2coZXJyKTtcbiAgfSlcbiAgLmZpbmFsbHkoKCk9PntcbiAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgZm9ybVByb2ZpbGUucXVlcnlTZWxlY3Rvcihjb25maWcuc3VibWl0QnV0dG9uKS50ZXh0Q29udGVudCA9ICfQodC+0YXRgNCw0L3QuNGC0YwnO1xuICAgIH0sIDQwMCk7XG4gIH0pXG59XG5cbmZvcm1BdmF0YXIucXVlcnlTZWxlY3Rvcihjb25maWcuc3VibWl0QnV0dG9uKS50ZXh0Q29udGVudCA9ICfQodC+0YXRgNCw0L3QuNGC0YwnO1xuXG5mdW5jdGlvbiBzdWJtaXRGb3JtQXZhdGFySGFuZGxlcihkYXRhKSB7XG4gIGZvcm1BdmF0YXIucXVlcnlTZWxlY3Rvcihjb25maWcuc3VibWl0QnV0dG9uKS50ZXh0Q29udGVudCA9ICfQodC+0YXRgNCw0L3QtdC90LjQtS4uLic7XG4gIGFwaS5hZGRBdmF0YXIoZGF0YSlcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2ZpbGVfX2F2YXRhcicpLnNyYyA9IGRhdGEuYXZhdGFyO1xuICAgICAgcG9wdXBlckF2YXRhci5jbG9zZSgpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfSlcbiAgICAuZmluYWxseSgoKT0+e1xuICAgICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgZm9ybUF2YXRhci5xdWVyeVNlbGVjdG9yKGNvbmZpZy5zdWJtaXRCdXR0b24pLnRleHRDb250ZW50ID0gJ9Ch0L7RhdGA0LDQvdC40YLRjCc7XG4gICAgICB9LCA0MDApO1xuICAgIH0pXG59XG5cbmF2YXRhckltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcbiAgYXZhdGFyT3BlblBvcHVwQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xufSlcblxuYXZhdGFySW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoKSA9PiB7XG4gIGF2YXRhck9wZW5Qb3B1cEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufSlcblxuYXZhdGFySW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGZvcm1WYWxpZGF0b3JzWyBmb3JtQXZhdGFyLm5hbWUgXS50b2dnbGVCdXR0b25TdGF0ZSgpXG4gIHBvcHVwZXJBdmF0YXIub3BlbigpO1xufSlcblxucG9wdXBlckF2YXRhci5zZXRFdmVudExpc3RlbmVycygpO1xuXG5cbmFwaS5nZXRJbml0aWFsQ2FyZHMoKVxuICAudGhlbigoaW5pdGlhbENhcmRzKSA9PiB7XG4gICAgY2FyZExpc3QucmVuZGVySXRlbXMoaW5pdGlhbENhcmRzLnJldmVyc2UoKSk7XG4gIH0pXG4gIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgY29uc29sZS5sb2coZXJyKTtcbiAgfSlcblxuYXBpLmdldFByb2ZpbGUoKVxuICAudGhlbigocHJvZmlsZUluZm8pID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZmlsZV9fbmFtZScpLnRleHRDb250ZW50ID0gcHJvZmlsZUluZm8ubmFtZTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZmlsZV9fYmlvJykudGV4dENvbnRlbnQgPSBwcm9maWxlSW5mby5hYm91dDtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZmlsZV9fYXZhdGFyJykuc3JjID0gcHJvZmlsZUluZm8uYXZhdGFyO1xuICAgIH0pXG4gIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgY29uc29sZS5sb2coZXJyKTtcbiAgfSlcblxucG9wdXBlclByb2ZpbGVXaXRoRm9ybS5zZXRFdmVudExpc3RlbmVycygpO1xuXG5wcm9maWxlT3BlblBvcHVwQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBmb3JtVmFsaWRhdG9yc1sgZm9ybVByb2ZpbGUubmFtZSBdLnRvZ2dsZUJ1dHRvblN0YXRlKCk7XG4gIHBvcHVwZXJQcm9maWxlV2l0aEZvcm0ub3BlbigpO1xuICBjb25zdCBpbml0aWFsSW5mbyA9IHVzZXJJbmZvLmdldFVzZXJJbmZvKCk7XG4gIG5hbWVJbnB1dC52YWx1ZSA9IGluaXRpYWxJbmZvLnVzZXJOYW1lO1xuICBqb2JJbnB1dC52YWx1ZSA9IGluaXRpYWxJbmZvLnVzZXJKb2I7XG59KTtcblxuZWxlbWVudE9wZW5Qb3B1cEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgZm9ybVZhbGlkYXRvcnNbIGZvcm1FbGVtZW50Lm5hbWUgXS50b2dnbGVCdXR0b25TdGF0ZSgpXG5cbiAgcG9wdXBlckVsZW1lbnRXaXRoRm9ybS5vcGVuKCk7XG59ICk7XG5cbmNvbnN0IHBvcHVwZXJab29tID0gbmV3IFBvcHVwV2l0aEltYWdlKCcucG9wdXBfem9vbScpXG5wb3B1cGVyWm9vbS5zZXRFdmVudExpc3RlbmVycygpO1xuXG5mdW5jdGlvbiBjcmVhdGVDYXJkKGVsZW1lbnQpe1xuICBjb25zdCBjYXJkID0gbmV3IENhcmQoZWxlbWVudCxcbiAgICAnLml0ZW0tdGVtcGxhdGUnLFxuICAgIHtoYW5kbGVDYXJkQ2xpY2s6ICgpID0+IHtcbiAgICBwb3B1cGVyWm9vbS5vcGVuKGVsZW1lbnQpfX0sXG4gICAge2RlbGV0ZUNsaWNrSGFuZGxlcjogKGNhcmRJZCkgPT4ge1xuICAgICAgY29uc3QgZGVsZXRlUG9wdXBlciA9IG5ldyBQb3B1cFdpdGhTdWJtaXQoJy5wb3B1cF9kZWxldGUnLFxuICAgICAgIHtzdWJtaXREZWxldGlvbkhhbmRsZXI6ICgpID0+IHtcbiAgICAgICAgICBhcGkuZGVsZXRlQ2FyZChjYXJkSWQpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgZGVsZXRlUG9wdXBlci5jbG9zZSgpO1xuICAgICAgICAgICAgY2FyZC5oYW5kbGVFbGVtZW50RGVsZXRlKClcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIH0pXG4gICAgICAgfX0pXG4gICAgICAgZGVsZXRlUG9wdXBlci5zZXRFdmVudExpc3RlbmVycygpO1xuICAgICAgIGRlbGV0ZVBvcHVwZXIub3BlbigpO1xuICAgIH19LFxuICAgIHtsaWtlQ2xpY2tIYW5kbGVyOiAoY2FyZElkKSA9PiB7XG4gICAgICBhcGkuc2V0TGlrZShjYXJkSWQpXG4gICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICBjYXJkLmhhbmRsZVNldExpa2UoZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgfSlcbiAgICB9fSxcbiAgICB7cmVzZXRMaWtlQ2xpY2tIYW5kbGVyOiAoY2FyZElkKSA9PiB7XG4gICAgICBhcGkucmVzZXRMaWtlKGNhcmRJZClcbiAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgIGNhcmQuaGFuZGxlUmVzZXRMaWtlKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pXG4gICAgfX1cbiAgICApXG5cbiAgICByZXR1cm4gY2FyZC5jcmVhdGVDYXJkKCk7XG59XG5cbmNvbnN0IGNhcmRMaXN0ID0gbmV3IFNlY3Rpb24oe1xuICAgIHJlbmRlcmVyOiAoZWxlbWVudCkgPT4ge1xuICAgICAgICBjYXJkTGlzdC5hZGRJdGVtKGNyZWF0ZUNhcmQoZWxlbWVudCkpXG4gIH1cbn0sXG4nLmVsZW1lbnRzJ1xuKTtcblxuY29uc3QgcG9wdXBlckVsZW1lbnRXaXRoRm9ybSA9IG5ldyBQb3B1cFdpdGhGb3JtKCcucG9wdXBfYWRkJywgc3VibWl0Rm9ybUVsZW1lbnRIYW5kbGVyKVxuXG5mdW5jdGlvbiBzdWJtaXRGb3JtRWxlbWVudEhhbmRsZXIgKGRhdGEpIHtcbiAgZm9ybUVsZW1lbnQucXVlcnlTZWxlY3Rvcihjb25maWcuc3VibWl0QnV0dG9uKS50ZXh0Q29udGVudCA9ICfQodC+0YXRgNCw0L3QtdC90LjQtS4uLic7XG4gIGFwaS5hZGRDYXJkKGRhdGEpXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGNhcmRMaXN0LmFkZEl0ZW0oY3JlYXRlQ2FyZChkYXRhKSlcbiAgICAgIHBvcHVwZXJFbGVtZW50V2l0aEZvcm0uY2xvc2UoKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pXG4gICAgLmZpbmFsbHkoKCk9PntcbiAgICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgIGZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoY29uZmlnLnN1Ym1pdEJ1dHRvbikudGV4dENvbnRlbnQgPSAn0KHQvtGF0YDQsNC90LjRgtGMJztcbiAgICAgIH0sIDQwMCk7XG4gICAgfSlcbn1cblxucG9wdXBlckVsZW1lbnRXaXRoRm9ybS5zZXRFdmVudExpc3RlbmVycygpO1xuXG5jb25zdCBmb3JtVmFsaWRhdG9ycyA9IHt9XG5cbmNvbnN0IGVuYWJsZVZhbGlkYXRpb24gPSAoY29uZmlnKSA9PiB7XG4gIGNvbnN0IGZvcm1MaXN0ID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG9wdXBfX2Zvcm0nKSk7XG4gIGZvcm1MaXN0LmZvckVhY2goKGZvcm0pID0+IHtcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGV2dCkge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSlcbiAgICBjb25zdCBmb3JtVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IoY29uZmlnLCBmb3JtKTtcbiAgICBmb3JtVmFsaWRhdG9yc1sgZm9ybS5uYW1lIF0gPSBmb3JtVmFsaWRhdG9yO1xuICAgIGZvcm1WYWxpZGF0b3IuZW5hYmxlVmFsaWRhdGlvbigpO1xuICB9KTtcbn07XG5cbmVuYWJsZVZhbGlkYXRpb24oY29uZmlnKTtcblxuXG5cbiJdLCJuYW1lcyI6WyJBcGkiLCJ1cmwiLCJ0b2tlbiIsIl91cmwiLCJfdG9rZW4iLCJfaGVhZGVycyIsImZldGNoIiwiaGVhZGVycyIsInRoZW4iLCJyZXMiLCJvayIsImpzb24iLCJQcm9taXNlIiwicmVqZWN0IiwiZGF0YSIsImJvZHkiLCJuYW1lIiwic3VybmFtZSIsImFib3V0Iiwiam9iIiwibWV0aG9kIiwiSlNPTiIsInN0cmluZ2lmeSIsImxpbmsiLCJjYXJkSWQiLCJhdmF0YXIiLCJQb3B1cCIsIkNhcmQiLCJjYXJkU2VsZWN0b3IiLCJoYW5kbGVDYXJkQ2xpY2siLCJkZWxldGVDbGlja0hhbmRsZXIiLCJsaWtlQ2xpY2tIYW5kbGVyIiwicmVzZXRMaWtlQ2xpY2tIYW5kbGVyIiwiX2RhdGEiLCJfbmFtZSIsIl9saW5rIiwiX2NhcmRTZWxlY3RvciIsIl9oYW5kbGVDYXJkQ2xpY2siLCJfZWxlbWVudCIsIl9nZXRUZW1wbGF0ZSIsIl9jYXJkSW1hZ2UiLCJxdWVyeVNlbGVjdG9yIiwiX2xpa2VCdXR0b24iLCJfZWxlbWVudE5hbWUiLCJfZGVsZXRlQnV0dG9uIiwiX2xpa2VDb3VudGVyIiwiX251bWJlck9mTGlrZXMiLCJsaWtlcyIsIl9vd25lcklkIiwib3duZXIiLCJfaWQiLCJfZGVsZXRlQ2xpY2tIYW5kbGVyIiwiX2xpa2VDbGlja0hhbmRsZXIiLCJfcmVzZXRsaWtlQ2xpY2tIYW5kbGVyIiwiX2lzTGlrZWQiLCJtYXAiLCJlbCIsImluY2x1ZGVzIiwibmV3SXRlbSIsImRvY3VtZW50IiwiY29udGVudCIsImNsb25lTm9kZSIsIl9hZGRMaXN0ZW5lcnMiLCJzcmMiLCJhbHQiLCJ0ZXh0Q29udGVudCIsImxlbmd0aCIsInRvU3RyaW5nIiwiY2xhc3NMaXN0IiwiYWRkIiwic3R5bGUiLCJkaXNwbGF5IiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9nZXRJZCIsIl9saWtlSGFuZGxlciIsImV2dCIsInJlbW92ZSIsIkZvcm1WYWxpZGF0b3IiLCJjb25maWciLCJmb3JtIiwiX3N1Ym1pdEJ1dHRvbiIsInN1Ym1pdEJ1dHRvbiIsIl9wb3B1cElzSW52YWxpZCIsInBvcHVwSXNJbnZhbGlkIiwiX2lucHV0IiwiaW5wdXQiLCJfaW5wdXRFcnJvciIsImlucHV0RXJyb3IiLCJfZXJyb3IiLCJlcnJvciIsIl9mb3JtIiwiX2lucHV0TGlzdCIsIkFycmF5IiwiZnJvbSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJfYnV0dG9uIiwiaWQiLCJ2YWxpZGF0aW9uTWVzc2FnZSIsInZhbGlkaXR5IiwidmFsaWQiLCJfc2hvd0lucHV0RXJyb3IiLCJfaGlkZUlucHV0RXJyb3IiLCJzb21lIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiX2hhc0ludmFsaWRJbnB1dCIsIl9kaXNhYmxlQnV0dG9uIiwiX2VuYWJsZUJ1dHRvbiIsInRvZ2dsZUJ1dHRvblN0YXRlIiwiZm9yRWFjaCIsIl9jaGVja0lucHV0VmFsaWRpdHkiLCJfc2V0RXZlbnRMaXN0ZW5lcnMiLCJwb3B1cFNlbGVjdG9yIiwia2V5IiwiY2xvc2UiLCJ0YXJnZXQiLCJjb250YWlucyIsImNsb3Nlc3QiLCJfcG9wdXBDb250YWluZXIiLCJfcG9wdXBDbG9zZUJ1dHRvbiIsIl9wb3B1cCIsInNldFRpbWVvdXQiLCJfaGFuZGxlRXNjQ2xvc2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiX2Nsb3NlT25DbGljayIsIlBvcHVwV2l0aEZvcm0iLCJzdWJtaXRGb3JtSGFuZGxlciIsInByZXZlbnREZWZhdWx0IiwiX3N1Ym1pdEZvcm1IYW5kbGVyIiwiX2dldElucHV0VmFsdWVzIiwiX2Zvcm1WYWx1ZXMiLCJ2YWx1ZSIsIl9zdWJtaXRGb3JtSGFuZGxlckZ1bmN0aW9uIiwicmVzZXQiLCJQb3B1cFdpdGhJbWFnZSIsIl9wb3B1cEltYWdlIiwiX3BvcHVwQ2FwdGlvbiIsImVsZW1lbnQiLCJQb3B1cFdpdGhTdWJtaXQiLCJzdWJtaXREZWxldGlvbkhhbmRsZXIiLCJfc3VibWl0RGVsZXRpb25IYW5kbGVyIiwiX3N1Ym1pdERlbGV0aW9uSGFuZGxlckZ1bmN0aW9uIiwiU2VjdGlvbiIsImNvbnRhaW5lclNlbGVjdG9yIiwicmVuZGVyZXIiLCJfcmVuZGVyZXIiLCJfY29udGFpbmVyIiwiY2FyZHMiLCJwcmVwZW5kIiwiVXNlckluZm8iLCJ1c2VyTmFtZSIsInVzZXJKb2IiLCJfdXNlck5hbWUiLCJfdXNlckpvYiIsImFwaSIsInByb2ZpbGVPcGVuUG9wdXBCdXR0b24iLCJmb3JtUHJvZmlsZSIsIm5hbWVJbnB1dCIsImpvYklucHV0IiwiZWxlbWVudE9wZW5Qb3B1cEJ1dHRvbiIsImZvcm1FbGVtZW50IiwicG9wdXBlclByb2ZpbGVXaXRoRm9ybSIsInN1Ym1pdEZvcm1Qcm9maWxlSGFuZGxlciIsImZvcm1BdmF0YXIiLCJhdmF0YXJPcGVuUG9wdXBCdXR0b24iLCJhdmF0YXJJbWFnZSIsInBvcHVwZXJBdmF0YXIiLCJzdWJtaXRGb3JtQXZhdGFySGFuZGxlciIsInVzZXJJbmZvIiwiYWRkUHJvZmlsZSIsInNldFVzZXJJbmZvIiwiY2F0Y2giLCJlcnIiLCJjb25zb2xlIiwibG9nIiwiZmluYWxseSIsImFkZEF2YXRhciIsImZvcm1WYWxpZGF0b3JzIiwib3BlbiIsInNldEV2ZW50TGlzdGVuZXJzIiwiZ2V0SW5pdGlhbENhcmRzIiwiaW5pdGlhbENhcmRzIiwiY2FyZExpc3QiLCJyZW5kZXJJdGVtcyIsInJldmVyc2UiLCJnZXRQcm9maWxlIiwicHJvZmlsZUluZm8iLCJpbml0aWFsSW5mbyIsImdldFVzZXJJbmZvIiwicG9wdXBlckVsZW1lbnRXaXRoRm9ybSIsInBvcHVwZXJab29tIiwiY3JlYXRlQ2FyZCIsImNhcmQiLCJkZWxldGVQb3B1cGVyIiwiZGVsZXRlQ2FyZCIsImhhbmRsZUVsZW1lbnREZWxldGUiLCJzZXRMaWtlIiwiaGFuZGxlU2V0TGlrZSIsInJlc2V0TGlrZSIsImhhbmRsZVJlc2V0TGlrZSIsImFkZEl0ZW0iLCJzdWJtaXRGb3JtRWxlbWVudEhhbmRsZXIiLCJhZGRDYXJkIiwiZW5hYmxlVmFsaWRhdGlvbiIsImZvcm1MaXN0IiwiZm9ybVZhbGlkYXRvciJdLCJzb3VyY2VSb290IjoiIn0=