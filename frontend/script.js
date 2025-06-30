document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  // Login form handler
  if (loginForm) {
    loginForm.addEventListener('submit', async e => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok && data.token) {
          localStorage.setItem('token', data.token);
          alert('Login successful!');
          window.location.href = 'dashboard.html';
        } else {
          alert(data.message || 'Login failed');
        }
      } catch (err) {
        alert('Something went wrong. Try again.');
      }
    });
  }

  // Register form handler
  if (registerForm) {
    registerForm.addEventListener('submit', async e => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();

        if (res.ok) {
          alert('Registration successful! Please log in.');
          window.location.href = 'index.html';
        } else {
          alert(data.message || 'Registration failed');
        }
      } catch (err) {
        alert('Something went wrong. Try again.');
      }
    });
  }
});
