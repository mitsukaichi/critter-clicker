const likeHandler = async (event) => {
    event.preventDefault();
    const posts_id = event.target.id;
    const response = await fetch(`/api/likes/${posts_id}`, {
        method: 'POST',
        body: JSON.stringify({ posts_id }),
        headers: { 'Content-Type': 'application/json' },
      });
        if (response.ok) {
            // reload the page to generate the content shown for the user after logging in
            document.location.replace('/');
        } else {
            document.querySelector('.alert-content').textContent = "Something went wrong, please try again.";
            document.querySelector('.custom-login-modal').classList.remove("hidden");
        }
  };

  const unlikeHandler = async (event) => {
    event.preventDefault();
    const posts_id = event.target.id;
    const response = await fetch(`/api/likes/${posts_id}`, {
        method: 'DELETE',
        body: JSON.stringify({ posts_id }),
        headers: { 'Content-Type': 'application/json' },
      });
        if (response.ok) {
            // reload the page to generate the content shown for the user after logging in
            document.location.replace('/');
        } else {
            document.querySelector('.alert-content').textContent = "Something went wrong, please try again.";
            document.querySelector('.custom-login-modal').classList.remove("hidden");
        }
  };



document.querySelector('.like-button').addEventListener('click',likeHandler);
document.querySelector('.unlike-button').addEventListener('click',unlikeHandler);
