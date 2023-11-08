const logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
        document.querySelector('.alert-content').textContent = "Something went wrong. Please try again";
        document.querySelector('.custom-logout-modal').classList.remove("hidden");
    }
  };
  
  document.querySelector('#logout-button').addEventListener('click', logout);