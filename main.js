function openModal(title, ingredients, instructions) {
  const modal = document.getElementById('recipeModal');
  const recipeTitle = document.getElementById('recipeTitle');
  const recipeIngredients = document.getElementById('recipeIngredients');
  const recipeInstructions = document.getElementById('recipeInstructions');

  recipeTitle.textContent = title;
  
  recipeIngredients.innerHTML = '';
  ingredients.forEach((ingredient) => {
    const li = document.createElement('li');
    li.textContent = ingredient;
    recipeIngredients.appendChild(li);
  });

  recipeInstructions.textContent = instructions;

  modal.style.display = 'flex';
}

function closeModal() {
  const modal = document.getElementById('recipeModal');
  modal.style.display = 'none';
}

window.onclick = function(event) {
  const modal = document.getElementById('recipeModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

function toggleSearch(event) {
  event.preventDefault(); 

  var searchInput = document.getElementById('searchInput');
  
  if (searchInput.style.display === "none" || searchInput.style.display === "") {
    searchInput.style.display = "block";
  } else {
    searchInput.style.display = "none";
  }
}


const userLoginTrigger = document.getElementById('userLoginTrigger');
const loginPopup = document.getElementById('loginPopup');
const closePopup = document.getElementById('closePopup');
const loginForm = document.getElementById('loginForm');
const createAccountForm = document.getElementById('createAccountForm');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');

userLoginTrigger.addEventListener('click', (e) => {
    e.preventDefault(); 
    loginPopup.style.display = 'flex';
    showLogin(); 
});

closePopup.addEventListener('click', () => {
    loginPopup.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === loginPopup) {
        loginPopup.style.display = 'none';
    }
});

function showCreateAccount() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('createAccountForm').style.display = 'block';
    document.getElementById('forgotPasswordForm').style.display = 'none';
}

function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('createAccountForm').style.display = 'none';
    document.getElementById('forgotPasswordForm').style.display = 'none';
}

function showForgotPassword() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('createAccountForm').style.display = 'none';
    document.getElementById('forgotPasswordForm').style.display = 'block';
}


function createAccount(event) {
    event.preventDefault();

    const username = document.getElementById('create-username').value.trim();
    const password = document.getElementById('create-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!username || !password || !confirmPassword) {
        alert('Please fill out all fields.');
        return;
    }
    
    if (password.length < 8) {
     alert('Password must be at least 8 characters long.');
        return;
    }


    if (password === confirmPassword) {
        const newUser = { username, password };
        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.some(user => user.username === username)) {
            alert('Username already exists. Please choose a different one.');
            return;
        }

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert('Account created successfully!');
        showLogin(); 
        
    } else {
        alert('Passwords do not match.');
    }
}

function login(event) {
    event.preventDefault();

    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert('Login successful!');
        
        localStorage.setItem('username', user.username);

        localStorage.setItem('loggedInUser', JSON.stringify(user));

        window.location.href = 'home.html';
    } else {
        alert('Invalid username or password.');
    }
}


function forgotPassword(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    
    alert('A password reset link has been sent to your email.');
    showLogin(); 
}

document.getElementById('startCooking').addEventListener('click', function () {
      showogin();
    });
    
document.getElementById('startCooking').addEventListener('click', function() {
  document.getElementById('loginPopup').style.display = 'flex'; 
});