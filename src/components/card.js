export const createSingleCard = (
  data,
  likeCard,
  onDelete,
  openCard,
  userId
) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const image = card.querySelector(".card__image");
  const name = card.querySelector(".card__title");
  const like = card.querySelector(".card__like");
  const likeButton = card.querySelector(".card__like-button");
  const deleteButton = card.querySelector(".card__delete-button");
  const buttonOpenPopupImage = card.querySelector(".card__image");
  const likeQuantity = like.querySelector(".card__like-quantity");

  let likes = data.likes;
  card.id = data._id;
  image.src = data.link;
  image.alt = data.name;
  name.textContent = data.name;

  function deleteCard() {
    card.remove();
  }

  function checkDeleteIcon() {
    if (data.owner._id !== userId) {
      deleteButton.classList.add("card__delete-button_active");
    }
  }

  checkDeleteIcon();

  const checkLike = () => {
    return likes.some((like) => like._id === userId);
  };

  const updateLikes = (newLikes) => {
    likes = newLikes;
    setLikeStatus();
  };

  const setLikeStatus = () => {
    const isLiked = checkLike();
    if (isLiked) {
      likeButton.classList.add("card__like-button_is-active");
    } else {
      likeButton.classList.remove("card__like-button_is-active");
    }
    likeQuantity.textContent = likes.length;
  };

  setLikeStatus();


  buttonOpenPopupImage.addEventListener("click", () => openCard(data));
  likeButton.addEventListener("click", () => likeCard(data._id, checkLike(), updateLikes));
  deleteButton.addEventListener("click", () => onDelete(data._id, deleteCard));


  return card;
};
