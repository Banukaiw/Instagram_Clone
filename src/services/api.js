// src/services/api.js
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
//const BACKEND_URL = 'http://localhost:5000/api';
// Posts
/* export const fetchPosts = () =>
  fetch(`${BASE_URL}/posts`).then(res => res.json());


export const createPost = (post) =>
  fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  }).then(res => res.json());


export const deletePost = (id) =>
  fetch(`${BASE_URL}/posts/${id}`, { method: 'DELETE' }) */;
export const fetchPosts = () =>
  fetch(`${BASE_URL}/posts`).then(res => res.json());


export const createPost = (post) =>
  fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  }).then(res => res.json());


export const deletePost = (id) =>
  fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE'
  });


/* export const fetchProfile = () =>
  fetch(`${BASE_URL}/userProfile`).then(res => res.json()); */

export const fetchProfile = () =>
  fetch(`${BASE_URL}/users`)
    .then(res => res.json())
    .then(users => users[0]);



export const fetchLikes = () =>
  fetch(`${BASE_URL}}/likes`).then(res => res.json());

export const createLike = (like) =>
  fetch(`${BASE_URL}/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(like)
  }).then(res => res.json());

export const deleteLike = (id) =>
  fetch(`${BASE_URL}/likes/${id}`, {
    method: 'DELETE'
  });
  

export const fetchComments = () =>
  fetch(`${BASE_URL}}/comments`).then(res => res.json());

export const createComment = (comment) =>
  fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json());

export const deleteComment = (id) =>
  fetch(`${BASE_URL}/comments/${id}`, {
    method: 'DELETE'
  });
  

export const updateBio = (bio) =>
  fetch(`${BASE_URL}/userProfile`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bio }),
  }).then(res => res.json());


// Stories
export const fetchStories = () =>
  fetch(`${BASE_URL}/stories`).then(res => res.json());


// Suggestions
export const fetchSuggestions = () =>
  fetch(`${BASE_URL}/suggestions`).then(res => res.json());


//Reels
export const fetchReels = async () => {

  const response = await fetch(`${BASE_URL}/reels`);
  if (!response.ok) {
    throw new Error('Failed to fetch reels');
  }
  return response.json();
};

//Notifications
export async function fetchNotifications() {
  const response = await fetch(`${BASE_URL}/notifications`);

  if (!response.ok) {
    throw new Error('Failed to fetch notifications');
  }

  return response.json();
}


//Comments
/* export const fetchComments = async () => {
  const response = await fetch(`${BASE_URL}/comments`);

  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }

  return response.json();
}; */

//create comments
/* export const createComment = async (comment) => {
  const response = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });

  if (!response.ok) {
    throw new Error('Failed to create comment');
  }

  return response.json();
}; */



// Update user profile details
export const updateUser = (id, updatedData) => {
  return fetch(`${BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  }).then((res) => {
    if (!res.ok) {
      throw new Error('Failed to update user');
    }

    return res.json();
  });
};

//search users
export async function fetchUsers() {
  const response = await fetch(`${BASE_URL}/users`);

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
}

export const searchUsers = (searchText) =>
  fetch(`${BASE_URL}/users/search?q=${encodeURIComponent(searchText)}`)
    .then(res => res.json());

//fetch search images
export async function fetchSearchImages() {
  const response = await fetch(`${BASE_URL}/search-images`);

  if (!response.ok) {
    throw new Error('Failed to fetch search images');
  }

  return response.json();
}

