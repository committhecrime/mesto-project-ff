import { initialCards } from "./scripts/cards";
import "./pages/index.css";
import {
  deleteCard,
  likeCard,
  openCard,
  createSingleCard,
} from "./components/card";
import { openModal, closeModal } from "./components/modal";

export const cardTemplate = document.querySelector("#card-template").content;
const cardContainer = document.querySelector(".places__list");
export const cardImagePopUp = document.querySelector(".popup__image");
export const cardPopUpCaption = document.querySelector(".popup__caption");
const newCardButton = document.querySelector(".profile__add-button");
const formElement = document.forms[0];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");

const profileJob = document.querySelector(".profile__description");
const formElementAdd = document.forms[1];
const linkInput = document.querySelector(".popup__input_type_url");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
export const openedPopUp = document.querySelector(".popup_is-opened");
export const popUp = document.querySelector(".popup");
const popUpDelete = document.querySelector(".popup_type_delete");
const deleteButton = document.querySelector(".card__delete-button");

const formAvatar = document.forms[2];
const editAvatar = document.querySelector(".profile__image");
const popupAvatarProfile = document.querySelector(".popup_type_avatar-edit");
const avatarInput = document.querySelector(".popup__input_type_avatar");
let userId = '';
let userAvatar = '';

function renderCard(cards) {
  cards.forEach((card) =>
    cardContainer.append(createSingleCard(card, deleteCard, likeCard, openCard))
  );
}

renderCard(initialCards);

const editButton = document.querySelector(".profile__edit-button");
const editPopUp = document.querySelector(".popup_type_edit");
const newCardPopUp = document.querySelector(".popup_type_new-card");
export const cardPopUp = document.querySelector(".popup_type_image");
const deletePopUps = document.querySelectorAll(".popup__close");

editButton.addEventListener("click", function () {
  openModal(editPopUp);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});



newCardButton.addEventListener("click", function () {
  openModal(newCardPopUp);
  formElementAdd.reset();
});

deletePopUps.forEach((e) => {
  e.addEventListener("click", function () {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  });
});

document.addEventListener("click", function (e) {
   const openedPopup = document.querySelector(".popup_is-opened");
    if (e.target === openedPopup) {
      closeModal(openedPopup);
    }
});

export function closeByEscape(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape") {
    
    if (openedPopup) {
      closeModal(openedPopup);
      
    }
  }
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  setupUser({ name: nameInput.value, about: jobInput.value })
  .then(() => {
      profileName.textContent = nameInput.value;
      profileJob.textContent = jobInput.value;

      evt.target.reset();
      
      closeModal(formElement.closest(".popup"));
  })
  .catch((err) => console.log(err))
  
}

function handleFormSubmitAdd(evt) {
  evt.preventDefault();

  const cardLink = linkInput.value;
  const cardName = cardNameInput.value;

  addCardServer({ name: cardName, link: cardLink })
    .then((data) => {
      const newCard = createSingleCard(
        data,
        deleteCard,
        likeCard,
        openCard,
        userId
      );
      cardNameInput.value = "";
      linkInput.value = "";
      cardContainer.prepend(newCard);

      evt.target.reset();

      closeModal(formElementAdd.closest(".popup"));
    })
    .catch((err) => console.log(err));

}

formElement.addEventListener("submit", handleFormSubmit);
formElementAdd.addEventListener("submit", handleFormSubmitAdd);


//VALIDATION

const showError = (form, input, error) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  
  errorElement.textContent = error; 
  input.classList.add("popup__input_type_error");
  errorElement.classList.add("popup__error_visible");

};

const hideError = (form, input) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  
  input.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__error_visible");
  errorElement.textContent = "";
};

const checkInputValidity = (form, input) => {

  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }


  if (!input.validity.valid) {
    showError(form, input, input.validationMessage);
  } else {
    hideError(form, input);
  }
};

const setEventListeners = (formElement) => {

  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const submitButtonSelector = formElement.querySelector(".popup__button");

  toggleButtonState(inputList, submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, submitButtonSelector);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}; 

const toggleButtonState = (inputList, submitButtonSelector) => {
  if (hasInvalidInput(inputList)) {
    submitButtonSelector.disabled = true;
    submitButtonSelector.classList.add("popup__button_disabled");
  } else {
    submitButtonSelector.disabled = false;
    submitButtonSelector.classList.remove("popup__button_disabled");
  }
}; 

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation();



function handleFormAvatar(evt) {
  evt.preventDefault();
  updateAvatar({ avatar: avatarInput.value })
    .then((data) => {
      console.log(data.avatar)
      editAvatar.style = `background-image: url(${data.avatar})`;
      userAvatar = data.avatar;
      closePopup(popupAvatarProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    
}const openPopupAvatar = function () {
  openModal(popupAvatarProfile);
  avatarInput.value = userAvatar;
};

formAvatar.addEventListener('click', handleFormAvatar)

export const onDelete = (id, deleteCard) => {
  removeCard(id)
    .then((data) => deleteCard(data))

    .catch((err) => console.log(err));
};


const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-2",
  headers: {
    authorization : "f5f541a4-74fb-4c46-bd96-8b596c9ba44e",
    "Content-Type": "application/json",
  },
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const getDataUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const setupUser = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  });
};

export const removeCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export const getLikeCard = () => {
  return fetch(`${config.baseUrl}/cards/`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};




export const addCardServer = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: "f5f541a4-74fb-4c46-bd96-8b596c9ba44e",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};


export const updateAvatar = (data) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-2/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "f5f541a4-74fb-4c46-bd96-8b596c9ba44e",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

/*function changeAvatarBg (evt) {
  console.log(evt.target.style)
  evt.target.classList.toggle("hover-background");
}*/


editAvatar.addEventListener("click", openPopupAvatar);


Promise.all([getInitialCards(), getDataUser()])
  .then(([cards, userData]) => {
    userId = userData._id;
    userAvatar = userData.avatar;
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    editAvatar.style.backgroundImage = `url(${userData.avatar})`;

    cards.forEach((data) => {
      const userCard = createSingleCard(data, deleteCard, likeCard, openCard, userId);
      cardContainer.prepend(userCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });

