const postDeleteHandler = async (event) => {
    event.preventDefault();
    const posts_id = event.currentTarget.id;
    const response = await fetch(`/api/petpic/${posts_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        // reload to the dashboard page
        console.log(response);
        document.location.replace('/dashboard');
      } else {
        document.querySelector('.alert-content').textContent = "Something went wrong, please try again.";
        document.querySelector('.custom-login-modal').classList.remove("hidden");
      }
  };

window.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('.delete-post-button').forEach(el => {el.addEventListener('click',postDeleteHandler);
  });
});