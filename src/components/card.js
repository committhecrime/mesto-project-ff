const likeButtons = document.querySelectorAll('.card__like-button');

function toggleLikeClass(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

likeButtons.forEach(likeButton => {
  likeButton.addEventListener('click', function() {
    toggleLikeClass(likeButton);
  });
});



export {toggleLikeClass};