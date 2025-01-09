// Fungsi untuk menyimpan data pengguna ke Local Storage
function saveUser(username, password, name, email, phone, birthPlace, birthDate) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.push({ username, password, name, email, phone, birthPlace, birthDate });
  localStorage.setItem('users', JSON.stringify(users));
}

// Fungsi untuk memeriksa login pengguna
function checkLogin(username, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  return users.some(user => user.username === username && user.password === password);
}

// Fungsi untuk menyimpan status Remember Me
function saveRememberMe(username, password) {
  localStorage.setItem('rememberMe', JSON.stringify({ username, password }));
}

// Fungsi untuk memuat status Remember Me
function loadRememberMe() {
  const rememberMe = JSON.parse(localStorage.getItem('rememberMe'));
  if (rememberMe) {
    document.getElementById('loginUsername').value = rememberMe.username;
    document.getElementById('loginPassword').value = rememberMe.password;
  }
}

// Event listener untuk membuka formulir pendaftaran
document.getElementById('showRegisterForm').addEventListener('click', function() {
  document.getElementById('registerPopup').style.display = 'block';
});

// Event listener untuk menutup formulir pendaftaran
document.getElementById('closeRegisterForm').addEventListener('click', function() {
  document.getElementById('registerPopup').style.display = 'none';
});

// Event listener untuk formulir pendaftaran
document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('registerUsername').value;
  const password = document.getElementById('registerPassword').value;
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const phone = document.getElementById('registerPhone').value;
  const birthPlace = document.getElementById('registerBirthPlace').value;
  const birthDate = document.getElementById('registerBirthDate').value;

  saveUser(username, password, name, email, phone, birthPlace, birthDate);
  alert('Pendaftaran berhasil!');
  document.getElementById('registerPopup').style.display = 'none';
  // Kembali ke halaman login setelah pendaftaran berhasil
  window.location.href = 'index.html'; 
});

// Event listener untuk formulir login
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  if (checkLogin(username, password)) {
    alert('Login berhasil!');
    if (document.getElementById('rememberMe').checked) {
      saveRememberMe(username, password);
    } else {
      localStorage.removeItem('rememberMe');
    }
    window.location.href = 'dashboard.html';
  } else {
    alert('Username atau password salah!');
  }
});

// Event listener untuk tombol Simpan Login
document.getElementById('saveLogin').addEventListener('click', function() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  if (username && password) {
    saveRememberMe(username, password);
    alert('Login disimpan!');
  } else {
    alert('Mohon isi username dan password terlebih dahulu.');
  }
});

// Muat status Remember Me saat halaman dimuat
window.onload = loadRememberMe;