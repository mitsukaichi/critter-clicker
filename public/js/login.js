const loginFormHandler = async (event) => {
    event.preventDefault();
    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value.trim();
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
        if (response.ok) {
            // reload the page to generate the content shown for the user after logging in
            document.location.replace('/dashboard');
        } else {
            document.querySelector('.alert-content').textContent = "Incorrect email or password. Please try again";
            document.querySelector('.custom-login-modal').classList.remove("hidden");
        }
    }
  };

const signUpHandler = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#signup-username').value.trim();
    const email = document.querySelector('#signup-email').value.trim();
    const password = document.querySelector('#signup-password').value.trim();
    if (username && email && password) {
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ username, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            // reload the page to generate the content shown for the user after logging in
            document.location.replace('/dashboard');
        } else {
            document.querySelector('.alert-content').textContent = "Something went wrong. Please try again";
            document.querySelector('.custom-login-modal').classList.remove("hidden");
        }
      }
};

const closeModal = (event) => {
    document.querySelector('.custom-login-modal').classList.add("hidden");
};

document.getElementById('login-button').addEventListener('click', loginFormHandler);
document.getElementById('signup-button').addEventListener('click', signUpHandler);
document.getElementById('dismiss-modal').addEventListener('click', closeModal);