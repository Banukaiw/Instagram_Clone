
// src/Posts.jsx
import { useState, useEffect } from 'react';
import { fetchPosts, createPost, deletePost } from '../../services/api';
import './Posts.css';
import PostView from '../../components/Postview/PostView';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetchPosts()
      .then(data => setPosts(data));

    fetch('http://localhost:3000/comments')
      .then(res => res.json())
      .then(data => setComments(data));

    fetch('http://localhost:3000/likes')
      .then(res => res.json())
      .then(data => setLikes(data));
  }, []);


  const handleLike = (postId) => {
    const liked = likes.find
      (like => String(like.postId) ===
        String(postId) &&
        String(like.userId) === '1'
      );

    if (liked) {
      fetch(`http://localhost:3000/likes/${liked.id}`, {
        method: 'DELETE'
      });
      setLikes(likes.filter(like => like.id !== liked.id)
      );
    }

    else {
      const newLike = {
        postId: String(postId),
        userId: '1'
      };
      fetch('http://localhost:3000/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLike)
      })
        .then(res => res.json())
        .then(data => {
          setLikes([
            ...likes,
            data
          ]);
        });
    }
  };

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
      .then((res) => res.json());
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
          <div
            key={post.id}
            className="post"
            onClick={() => setSelectedPost(post)}
          >

            <div className="post-header">
              <div className="profile-background">
                <img
                  src={post.user?.profile_pic}
                  alt="Profile"
                  className="post-profile-image"
                />
              </div>


              <h5 className="post-username">
                {post.user?.username}
              </h5>

              <div className="dot3icon">
                <i className="bi bi-three-dots"></i>
              </div>
            </div>


            <img
              src={post.image}
              alt="Post"
              className="post-img"
            />

            <div className="action-icon">

              {/*  <i className="bi bi-heart"
                onClick={(e) => {
                  e.stopPropagation();
                }}></i> */}

              <i
                className={
                  likes.some(
                    like =>
                      String(like.postId) === String(post.id) &&
                      like.userId === "1"
                  )
                    ? "bi bi-heart-fill"
                    : "bi bi-heart"
                }

                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(post.id);
                }}
              ></i>

              <div className="action-like"
                onClick={(e) => {
                  e.stopPropagation();
                }}>
                {likes.filter(like => like.postId === post.id).length}

              </div>

              <i className="bi bi-chat"></i>

              <div className="action-like">
                {comments.filter(
                  comment => String(comment.postId) === String(post.id)
                ).length}
              </div>

              <i className="bi bi-repeat"
              onClick={(e) => {
                  e.stopPropagation();
                }}
              ></i>

              <i className="bi bi-send"
              onClick={(e) => {
                  e.stopPropagation();
                }}></i>

              <i className="bi bi-bookmark"
              onClick={(e) => {
                  e.stopPropagation();
                }}></i>

            </div>

            <div className="post-caption">
              <span className="post-caption-username">
                {post.user?.username}
              </span>

              <span>
                {post.caption}
              </span>
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

