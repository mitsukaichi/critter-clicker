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
          document.getElementById(`${posts_id}`).removeEventListener('click',likeHandler);
          document.getElementById(`${posts_id}`).classList.remove("bi-heart");
          document.getElementById(`${posts_id}`).classList.remove("like-button");
          document.getElementById(`${posts_id}`).classList.remove("text-secondary");
          document.getElementById(`${posts_id}`).classList.add("bi-heart-fill");
          document.getElementById(`${posts_id}`).classList.add("unlike-button");
          document.getElementById(`${posts_id}`).classList.add("text-danger");
          let likeCount = document.getElementById(`count-${posts_id}`).innerHTML;
          likeCount = Number(likeCount) + 1;
          document.getElementById(`count-${posts_id}`).innerHTML = likeCount.toString();
          document.getElementById(`${posts_id}`).addEventListener('click',unlikeHandler);
          // reload the page to generate the content shown for the user after logging in
          //location.reload();
        } else {
          document.querySelector('.alert-content').textContent = "Something went wrong, please try again.";
          document.querySelector('.custom-logout-modal').classList.remove("hidden");
        }
  };

  const unlikeHandler = async (event) => {
    event.preventDefault();
    const posts_id = event.currentTarget.id;
    const response = await fetch(`/api/likes/${posts_id}`, {
        method: 'DELETE',
        body: JSON.stringify({ posts_id }),
        headers: { 'Content-Type': 'application/json' },
      });
        if (response.ok) {
          document.getElementById(`${posts_id}`).removeEventListener('click',unlikeHandler);
          document.getElementById(`${posts_id}`).classList.remove("bi-heart-fill");
          document.getElementById(`${posts_id}`).classList.remove("unlike-button");
          document.getElementById(`${posts_id}`).classList.remove("text-danger");
          document.getElementById(`${posts_id}`).classList.add("bi-heart");
          document.getElementById(`${posts_id}`).classList.add("like-button");
          document.getElementById(`${posts_id}`).classList.add("text-secondary");
          let likeCount = document.getElementById(`count-${posts_id}`).innerHTML;
          likeCount = Number(likeCount) - 1;
          document.getElementById(`count-${posts_id}`).innerHTML = likeCount;
          document.getElementById(`${posts_id}`).addEventListener('click',likeHandler);
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
