// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list')
// @todo: Функция создания карточки
function cardCreate(cardArray) {
  

  cardArray.forEach(card => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');

    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardTitle.textContent = card.name;

    isLiked(cardElement);
    deleteCard(cardElement);
    renderCard(cardElement);
  });
  
}
// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function(){
    cardElement.remove();
  });
}
// @todo: Вывести карточки на страницу
function renderCard(cardElement) {
  cardContainer.append(cardElement);
}
// like button functionality
function isLiked(cardElement) {
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('card__like-button_is-active')
  });
}

cardCreate(initialCards);