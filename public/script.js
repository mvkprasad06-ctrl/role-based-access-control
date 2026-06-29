const API_URL = 'http://127.0.0.1:5050/api';

function showMessage(text) {
  const message = document.getElementById('message');
  if (message) {
    message.textContent = text;
  } else {
    alert(text);
  }
}

async function register() {
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const role = document.getElementById('registerRole').value;

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    });

    const data = await response.json();
    showMessage(data.message);

    if (response.ok) {
      document.getElementById('registerName').value = '';
      document.getElementById('registerEmail').value = '';
      document.getElementById('registerPassword').value = '';
    }
  } catch (error) {
    showMessage('Registration failed. Server error.');
  }
}

async function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      showMessage(data.message);
      return;
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    window.location.href = 'dashboard.html';
  } catch (error) {
    showMessage('Login failed. Server error.');
  }
}

async function loadDashboard() {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = 'index.html';
    return;
  }

  try {
    const response = await fetch(`${API_URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      logout();
      return;
    }

    document.getElementById('dashboardMessage').textContent = data.message;

    document.getElementById('userInfo').innerHTML =
      '<strong>Name:</strong> ' + data.user.name + '<br>' +
      '<strong>Email:</strong> ' + data.user.email + '<br>' +
      '<strong>Role:</strong> ' + data.user.role;

    const adminButton = document.getElementById('adminButton');

    if (data.user.role === 'admin') {
      adminButton.style.display = 'block';
    } else {
      adminButton.style.display = 'none';
    }
  } catch (error) {
    alert('Could not load dashboard.');
  }
}

async function loadAdmin() {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = 'index.html';
    return;
  }

  try {
    const response = await fetch(`${API_URL}/admin`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      window.location.href = 'dashboard.html';
      return;
    }

    document.getElementById('adminMessage').textContent = data.message;

    const table = document.getElementById('usersTable');
    table.innerHTML = '';

    data.users.forEach(user => {
      table.innerHTML +=
        '<tr>' +
        '<td>' + user.id + '</td>' +
        '<td>' + user.name + '</td>' +
        '<td>' + user.email + '</td>' +
        '<td>' + user.role + '</td>' +
        '</tr>';
    });
  } catch (error) {
    alert('Could not load admin page.');
  }
}

function goToAdmin() {
  window.location.href = 'admin.html';
}

function goToDashboard() {
  window.location.href = 'dashboard.html';
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}
