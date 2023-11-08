const likeWithoutSigininHandler = (event) => {
    event.preventDefault();
    document.querySelector('.alert-content').textContent = "Sign in to like the posts";
    document.querySelector('.custom-logout-modal').classList.remove("hidden");
  };

const closeModal = (event) => {
    document.querySelector('.custom-logout-modal').classList.add("hidden");
  };
  

  document.querySelector('.like-no-signin').addEventListener('click',likeWithoutSigininHandler);
  document.getElementById('dismiss-modal').addEventListener('click', closeModal);