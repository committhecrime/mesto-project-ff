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
import { openModal, closeModal, closeByOverlay } from "./components/modal";
import { enableValidation, clearValidation } from "./scripts/validation.js";

const cardContainer = document.querySelector(".places__list");
const cardImagePopUp = document.querySelector(".popup__image");
const formEditProfile = document.querySelector(".popup__content-edit");
const formAddCard = document.querySelector(".popup__content-card");
const openEditAvatar = document.querySelector(".profile__avatar_edit");
const profileAvatar = document.querySelector(".profile__avatar");
const cardPopUpCaption = document.querySelector(".popup__caption");
const newCardButton = document.querySelector(".profile__add-button");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const linkInput = document.querySelector(".popup__input_type_url");
const avatarInput = document.querySelector(".popup__field_type_avatar");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const formAvatar = document.querySelector(".popup__content-avatar");

let userId = "";

const editButton = document.querySelector(".profile__edit-button");
const editPopUp = document.querySelector(".popup_type_edit");
const newCardPopUp = document.querySelector(".popup_type_new-card");
const cardPopUp = document.querySelector(".popup_type_image");
const deletePopUps = document.querySelectorAll(".popup__close");
const popupAvatar = document.querySelector(".popup_avatar");

//164-165 line - fix click on overlay to close popup

const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__field-error_active",
};

function handleFormSubmitAdd(evt) {
  renderLoading(evt.submitter, "Сохранение...");
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

      closeModal(newCardPopUp);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(evt.submitter, "Сохранить"));
}

function handleFormSubmitEdit(evt) {
  renderLoading(evt.submitter, "Сохранение...");
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
  renderLoading(evt.submitter, "Сохранение...");
  evt.preventDefault();
  updateAvatar({ avatar: avatarInput.value })
    .then((data) => {
      profileAvatar.style = `background-image: url(${data.avatar})`;
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
  avatarInput.value = "";
  clearValidation(popupAvatar, validationSettings);
});

deletePopUps.forEach((e) => {
  const closeButtonPopUp = e.closest(".popup");
  e.addEventListener("click", () => closeModal(closeButtonPopUp));
});



function renderLoading(saveButton, status) {
  saveButton.textContent = status;
}

enableValidation(validationSettings);

Promise.all([getInitialCards(), getDataUser()])
  .then(([cards, userData]) => {
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


formAddCard.addEventListener("submit", handleFormSubmitAdd);
formEditProfile.addEventListener("submit", handleFormSubmitEdit);
formAvatar.addEventListener("submit", handleFormSubmitAvatar);  
popupAvatar.addEventListener("click", closeByOverlay);
editPopUp.addEventListener("click", closeByOverlay);
newCardPopUp.addEventListener("click", closeByOverlay);
cardPopUp.addEventListener("click", closeByOverlay);
