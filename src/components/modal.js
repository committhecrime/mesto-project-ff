import { closeByEscape } from "../index.js";

function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEscape);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.addEventListener("keydown", closeByEscape);
}

export { openModal, closeModal };
