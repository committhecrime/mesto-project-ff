import "./pages/index.css";
import {
  getInitialCards,
  getDataUser,
  addCard,
  updateUser,
  removeCard,
  addLike,
  updateAvatar,
} from "./components/api.js";
import { createSingleCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal";
import { enableValidation, clearValidation } from "./scripts/validation.js";

export const cardTemplate = document.querySelector("#card-template").content;
const cardContainer = document.querySelector(".places__list");
export const cardImagePopUp = document.querySelector(".popup__image");
const formEditProfile = document.querySelector(".popup__content-edit");
const formAddCard = document.querySelector(".popup__content-card");
const openEditAvatar = document.querySelector(".profile__avatar_edit");
const profileAvatar = document.querySelector(".profile__avatar");
export const cardPopUpCaption = document.querySelector(".popup__caption");
const newCardButton = document.querySelector(".profile__add-button");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const linkInput = document.querySelector(".popup__input_type_url");
const avatarInput = document.querySelector(".popup__field_type_avatar");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const formAvatar = document.querySelector(".popup__content-avatar");

export const openedPopUp = document.querySelector(".popup_is-opened");
export const popUp = document.querySelector(".popup");
let userId = "";
let userAvatar = "";

const editButton = document.querySelector(".profile__edit-button");
const editPopUp = document.querySelector(".popup_type_edit");
const newCardPopUp = document.querySelector(".popup_type_new-card");
export const cardPopUp = document.querySelector(".popup_type_image");
const deletePopUps = document.querySelectorAll(".popup__close");
const popupAvatar = document.querySelector(".popup_avatar");

export const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__field-error_active",
};

function handleFormSubmitAdd(evt) {
  renderLoading(evt.submitter, "Saving...");
  evt.preventDefault();
  addCard({ name: cardNameInput.value, link: linkInput.value })
    .then((dataNew) => {
      const newCard = createSingleCard(
        dataNew,
        likeCard,
        onDelete,
        openCard,
        userId
      );
      cardNameInput.value = "";
      linkInput.value = "";
      cardContainer.prepend(newCard);

      evt.target.reset();
      closeModal(newCardPopUp);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(evt.submitter, "Сохранить"));
}

function handleFormSubmitEdit(evt) {
  renderLoading(evt.submitter, "Saving...");
  evt.preventDefault();
  updateUser({ name: nameInput.value, about: jobInput.value })
    .then((data) => {
      profileName.textContent = data.name;
      profileJob.textContent = data.about;

      evt.target.reset();

      closeModal(editPopUp);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(evt.submitter, "Сохранить"));
}

function handleFormSubmitAvatar(evt) {
  renderLoading(evt.submitter, "Saving...");
  evt.preventDefault();
  updateAvatar({ avatar: avatarInput.value })
    .then((data) => {
      profileAvatar.style = `background-image: url(${data.avatar})`;
      userAvatar = data.avatar;
      closeModal(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(evt.submitter, "Сохранить"));
}

editButton.addEventListener("click", function () {
  openModal(editPopUp);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation(editPopUp, validationSettings);
});

newCardButton.addEventListener("click", function () {
  openModal(newCardPopUp);
  clearValidation(newCardPopUp, validationSettings);
});

const likeCard = (id, isLiked, updateLikes) => {
  addLike(id, isLiked)
    .then((data) => {
      updateLikes(data.likes);
    })
    .catch((err) => {
      console.log(err);
    });
};

const onDelete = (id, deleteCard) => {
  removeCard(id)
    .then((data) => {
      deleteCard(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const openCard = (data) => {
  openModal(cardPopUp);
  cardPopUpCaption.textContent = data.name;
  cardImagePopUp.src = data.link;
  cardImagePopUp.alt = data.name;
};

openEditAvatar.addEventListener("click", function () {
  openModal(popupAvatar);
  console.log(popupAvatar);
  clearValidation(popupAvatar, validationSettings);
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

formAddCard.addEventListener("submit", handleFormSubmitAdd);
formEditProfile.addEventListener("submit", handleFormSubmitEdit);
formAvatar.addEventListener("submit", handleFormSubmitAvatar);

function renderLoading(saveButton, status) {
  saveButton.textContent = status;
}

enableValidation(validationSettings);

Promise.all([getInitialCards(), getDataUser()])
  .then(([cards, userData]) => {
    userAvatar = userData.avatar;
    userId = userData._id;
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

    cards.forEach((data) => {
      const card = createSingleCard(data, likeCard, onDelete, openCard, userId);
      cardContainer.append(card);
    });
  })
  .catch((err) => {
    console.log(err);
  });
