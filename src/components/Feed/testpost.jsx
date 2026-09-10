// src/Posts.jsx
import { useState, useEffect } from 'react';
import { fetchPosts, createPost, deletePost } from '../../services/api';
import './Posts.css';
import PostView from '../../components/Postview/PostView';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetchPosts()
      .then(data => setPosts(data));
  }, []);


  const handleCreatePost = (e) => {
    e.preventDefault();

    const newPost = {
      userId: 1,
      username: user.username,
      userImage: user.profilePicture,
      postImage: newPostImage || 'https://picsum.photos/600/600',
      caption: newPostCaption,
      likes: 0,
      timestamp: new Date().toISOString(),
    };
    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
    /* .then((createdPost) => {
      setUserPosts([createdPost, ...userPosts]);   // prepend to top
      setNewPostCaption('');
      setNewPostImage('');
    })
    .catch((err) => console.error('Error creating post:', err)); */

    createPost(newPost)
      .then((createdPost) => {
        setUserPosts([createdPost, ...userPosts]);
        setNewPostCaption('');
        setNewPostImage('');
      })
      .catch((err) => console.error('Error creating post:', err));
  };


  const handleDeletePost = (postId) => {
    /* fetch(`http://localhost:3000/posts/${postId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          
          setUserPosts(userPosts.filter((post) => post.id !== postId));
        }
      })
      .catch((err) => console.error('Error deleting post:', err)); */

    deletePost(postId)
      .then((res) => {

        if (res.ok) {

          setUserPosts(userPosts.filter((post) => post.id !== postId));
        }
      })
      .catch((err) => console.error('Error deleting post:', err));
  };


  return (
    <div className="posts-container">

      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="post my-3" onClick={() => setSelectedPost(post)}>
   
            <div className="d-flex align-items-center mb-2">
              <img
                src={post.user?.profile_pic}
                alt="Profile"
                className="dp rounded-circle me-2"
              />
              <h5 className="m-0 fs-6 fw-bold">{post.user?.username}</h5>
            </div>

            <img
              src={post.image}
              alt="Post"
              className="post-img w-100 rounded"
            />

            <div className="action-icon">
              
              <i className="bi bi-heart"></i>
              
                <div className="action-like">{post.likes}</div>
              
              <i className="bi bi-chat"></i>
              <div className="action-like">{post.comcount}</div>
              <i className="bi bi-repeat"></i>
              <i className="bi bi-send"></i>
              <i className="bi bi-bookmark"></i>
            </div>
            
            <div>
              <span className="fw-bold me-2">{post.user?.username}</span>
              <span>{post.caption}</span>
            </div>
          </div>
        ))
      ) : (
        <p>Loading posts...</p>
      )}

     {selectedPost && (
  <PostView
    post={selectedPost}
    onClose={() => setSelectedPost(null)}
  />
)} 
    </div>
  );
}
export default Posts;