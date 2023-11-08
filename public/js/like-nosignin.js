const likeWithoutSigininHandler = async (event) => {
    event.preventDefault();
    document.querySelector('.alert-content').textContent = "Sign in to like the posts";
    document.querySelector('.custom-logout-modal').classList.remove("hidden");
  };

  document.querySelector('.like-no-signin').addEventListener('click',likeWithoutSigininHandler);