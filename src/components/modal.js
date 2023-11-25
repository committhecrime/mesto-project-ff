import {closeByEscape} from '../index.js'


function openModal(popUp) { 
  popUp.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEscape); 
}


function closeModal(popUp) {
   popUp.classList.remove('popup_is-opened');
   document.addEventListener('keydown', closeByEscape); 
}


export {openModal,closeModal}