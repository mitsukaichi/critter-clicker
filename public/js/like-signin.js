const likeHandler = async (event) => {
    event.preventDefault();
    const posts_id = event.target.id;
    const liked = true;
    const response = await fetch(`/api/likes/${posts_id}`, {
        method: 'POST',
        body: JSON.stringify({ posts_id , liked }),
        headers: { 'Content-Type': 'application/json' },
      });
        if (response.ok) {
            // reload the page to generate the content shown for the user after logging in
            document.location.replace('/');
        } else {
            document.querySelector('.alert-content').textContent = "Something went wrong, please try again.";
            document.querySelector('.custom-logout-modal').classList.remove("hidden");
        }
  };

  const unlikeHandler = async (event) => {
    event.preventDefault();
    const posts_id = event.target.id;
    const liked = false;
    const response = await fetch(`/api/likes/${posts_id}`, {
        method: 'DELETE',
        body: JSON.stringify({ posts_id, liked }),
        headers: { 'Content-Type': 'application/json' },
      });
        if (response.ok) {
            // reload the page to generate the content shown for the user after logging in
            document.location.replace('/');
        } else {
            document.querySelector('.alert-content').textContent = "Something went wrong, please try again.";
            document.querySelector('.custom-logout-modal').classList.remove("hidden");
        }
  };


window.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('.like-button').forEach(el => {el.addEventListener('click',likeHandler);
  });
});

window.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('.unlike-button').forEach(el => {el.addEventListener('click',unlikeHandler);
  });
});
