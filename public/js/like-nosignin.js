const likeWithoutSigininHandler = (event) => {
    event.preventDefault();
    document.querySelector('.alert-content').textContent = "Sign in to like the posts";
    document.querySelector('.custom-logout-modal').classList.remove("hidden");
  };

const closeModal = (event) => {
    document.querySelector('.custom-logout-modal').classList.add("hidden");
  };

window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.like-no-signin').forEach(el => {el.addEventListener('click',likeWithoutSigininHandler);
    });
});

document.getElementById('dismiss-modal').addEventListener('click', closeModal);