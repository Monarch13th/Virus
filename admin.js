const adminUsername = 'admin';
const adminPassword = '123';

function handleAdminLogin(event) {
  event.preventDefault();

  const username = document.getElementById('adminUsername').value.trim();
  const password = document.getElementById('adminPassword').value.trim();

  // Check if the entered username and password match the fixed credentials
  if (username === adminUsername && password === adminPassword) {
    alert('Login successful!');

    // Hide the login popup
    document.getElementById('adminLoginPopup').style.display = 'none';

    // Show the admin dashboard
    document.getElementById('adminHeader').style.display = 'block';
    document.getElementById('adminDashboard').style.display = 'block';
  } else {
    alert('Invalid credentials. Please try again.');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const commentForm = document.getElementById('comment-form');
  const commentContent = document.getElementById('comment-content');
  const commentList = document.getElementById('comment-list');
  const noComments = document.getElementById('no-comments');
  const stars = document.querySelectorAll('.star');

  let selectedRating = 0;
  let editingCommentId = null;
  let currentCommentElement = null;

  const username = localStorage.getItem('username') || 'Guest'; // Default to 'Guest'

  loadComments();

  stars.forEach(star => {
    star.addEventListener('click', function() {
      selectedRating = parseInt(this.getAttribute('data-value'));
      updateStarRating();
    });
  });

  commentForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const commentText = commentContent.value.trim();
    if (commentText) {
      const comment = {
        username: username, // Include username
        content: commentText,
        rating: selectedRating || null,
        timestamp: Date.now(), // Save as a timestamp
        id: Date.now(),
      };

      if (editingCommentId) {
        updateComment(editingCommentId, comment);
      } else {
        saveComment(comment);
      }

      commentContent.value = '';
      selectedRating = 0;
      updateStarRating();
      editingCommentId = null;
      currentCommentElement = null;
    } else {
      alert("Please enter a comment.");
    }
  });

  function saveComment(comment) {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));
    addCommentToList(comment);
  }

  function updateComment(id, newComment) {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    const commentIndex = comments.findIndex(comment => comment.id === id);

    if (commentIndex !== -1) {
      comments[commentIndex] = newComment;
      localStorage.setItem('comments', JSON.stringify(comments));
      currentCommentElement.querySelector('.comment-content').textContent = newComment.content;
      currentCommentElement.querySelector('.comment-rating').textContent = newComment.rating ? `Rating: ${newComment.rating} stars` : 'No rating given';
      currentCommentElement.querySelector('.comment-time').textContent = formatRelativeTime(newComment.timestamp);
    }
  }

  function loadComments() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];

    if (comments.length === 0) {
      noComments.style.display = 'block';
    } else {
      noComments.style.display = 'none';
    }

    commentList.innerHTML = '';

    comments.forEach(function(comment) {
      addCommentToList(comment);
    });
  }

  function addCommentToList(comment) {
    const li = document.createElement('li');
    li.classList.add('comment-item');
    li.dataset.id = comment.id;
    li.innerHTML = `
        <strong class="comment-time">${formatRelativeTime(comment.timestamp)}</strong>
        <p class="comment-username">${comment.username}</p>
        <p class="comment-content">${comment.content}</p>
        <p class="comment-rating">${comment.rating ? `Rating: ${comment.rating} stars` : 'No rating given'}</p>
        <div class="comment-actions">
            ${comment.username === username
        ? `<button class="edit-btn" onclick="editComment(${comment.id}, this)">Edit</button>
               <button class="delete-btn" onclick="deleteComment(${comment.id})">Delete</button>`
        : ``}
        </div>
    `;
    commentList.appendChild(li);
  }

  function formatRelativeTime(timestamp) {
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);

    if (seconds < 60) {
      return "Just now";
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  }

  window.editComment = function(commentId, buttonElement) {
    const commentElement = buttonElement.closest('li');
    currentCommentElement = commentElement;

    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    const comment = comments.find(c => c.id === commentId);

    if (comment) {
      commentContent.value = comment.content;
      selectedRating = comment.rating || 0;
      updateStarRating();
      editingCommentId = commentId;
    }
  };

  window.deleteComment = function(commentId) {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments = comments.filter(c => c.id !== commentId);
    localStorage.setItem('comments', JSON.stringify(comments));

    const commentElement = document.querySelector(`li[data-id='${commentId}']`);
    if (commentElement) {
      commentElement.remove();
    }

    if (comments.length === 0) {
      noComments.style.display = 'block';
    }
  };

  function updateStarRating() {
    stars.forEach(star => {
      const starValue = parseInt(star.getAttribute('data-value'));
      if (starValue <= selectedRating) {
        star.classList.add('selected');
      } else {
        star.classList.remove('selected');
      }
    });
  }
});

//lahi ni
document.addEventListener('DOMContentLoaded', () => {
            // User Management
            const userList = document.getElementById('userList');
            const userCount = document.getElementById('userCount');
            const userManagementBtn = document.getElementById('userManagement');
            const userManagementSection = document.getElementById('userManagementSection');
            const logoutBtn = document.getElementById('logout');

            function loadUsers() {
                const users = JSON.parse(localStorage.getItem('users')) || [];
                userList.innerHTML = '';
                users.forEach(user => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <span>${user.username}</span>
                        <button class="delete-btn" onclick="deleteUser('${user.username}')">Delete</button>
                    `;
                    userList.appendChild(li);
                });
                userCount.textContent = users.length;
            }

            userManagementBtn.addEventListener('click', () => {
                userManagementSection.style.display = 'block';
                loadUsers();
            });

            logoutBtn.addEventListener('click', () => {
                alert('Logged out!');
                window.location.href = 'login.html';
            });

            window.deleteUser = (username) => {
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const updatedUsers = users.filter(user => user.username !== username);
                localStorage.setItem('users', JSON.stringify(updatedUsers));
                loadUsers();
                alert(`User "${username}" deleted.`);
            };

            // Feedback Section
            const feedbackSection = document.getElementById('feedbackSection');
            const feedbackList = document.getElementById('feedbackList');
            const feedbackCount = document.getElementById('feedbackCount');
            const feedbackBtn = document.getElementById('feedbackBtn');

            function loadFeedbacks() {
                const feedbacks = JSON.parse(localStorage.getItem('comments')) || [];
                feedbackList.innerHTML = '';

                if (feedbacks.length === 0) {
                    feedbackList.innerHTML = '<li>No feedback available.</li>';
                } else {
                    feedbacks.forEach(feedback => {
                        const li = document.createElement('li');
                        li.classList.add('feedback-item');
                        li.innerHTML = `
                            <strong class="feedback-time">${formatRelativeTime(feedback.timestamp)}</strong>
                            <p class="feedback-username"><strong>${feedback.username}</strong></p>
                            <p class="feedback-content">${feedback.content}</p>
                            <p class="feedback-rating">${feedback.rating ? `Rating: ${feedback.rating} stars` : 'No rating given'}</p>
                        `;
                        feedbackList.appendChild(li);
                    });
                }

                // Update feedback count
                feedbackCount.textContent = feedbacks.length;
            }

            function formatRelativeTime(timestamp) {
                const now = Date.now();
                const seconds = Math.floor((now - timestamp) / 1000);

                if (seconds < 60) {
                    return 'Just now';
                } else if (seconds < 3600) {
                    const minutes = Math.floor(seconds / 60);
                    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
                } else if (seconds < 86400) {
                    const hours = Math.floor(seconds / 3600);
                    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
                } else {
                    const days = Math.floor(seconds / 86400);
                    return `${days} day${days > 1 ? 's' : ''} ago`;
                }
            }

            feedbackBtn.addEventListener('click', (event) => {
                event.preventDefault();
                feedbackSection.style.display = 'block';
                loadFeedbacks();
            });

            loadUsers();
            loadFeedbacks();
        });
        
//lahi napud ni
const profileSectionBtn = document.getElementById('profileSectionBtn');
const profileSection = document.getElementById('profileSection');

// Hide other sections
const hideSections = () => {
    document.getElementById('userManagementSection').style.display = 'none';
    document.getElementById('feedbackSection').style.display = 'none';
    profileSection.style.display = 'none';
};

// Show Profile Section
profileSectionBtn.addEventListener('click', () => {
    hideSections();
    profileSection.style.display = 'block';
});
