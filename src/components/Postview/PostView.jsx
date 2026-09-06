import { useEffect, useState } from 'react';
import {fetchComments,createComment} from '../../services/api';

import './PostView.css';

function PostView({ post, onClose }) {

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {

    const loadComments = async () => {
      try {
        setLoading(true);
        const data = await fetchComments();
        const postComments = data.filter(
          (comment) => comment.postId === post.id
        );

        setComments(postComments);

      } catch (error) {
        console.error(
          'Error fetching comments:',
          error
        );
      } finally {
        setLoading(false);
      }
    };
    if (post) {
      loadComments();
    }
  }, [post]);


  const handleCommentSubmit = async () => {
    if (commentText.trim() === '') {
      return;
    }
    try {

      const userData = localStorage.getItem('user');

      if (!userData) {
        console.log('User is not logged in');
        return;
      }

      // Convert JSON string into JavaScript object
      const loggedUser = JSON.parse(userData);

      // Create new comment
      const newComment = {

        postId: post.id,
        username: loggedUser.username,
        profileImage: loggedUser.profilePicture,
        text: commentText.trim()
      };

      const savedComment = await createComment(
        newComment
      );
      setComments((previousComments) => [
        ...previousComments,
        savedComment
      ]);
      setCommentText('');

    } catch (error) {

      console.error(
        'Error creating comment:',
        error
      );
    }
  };

  if (!post) {
    return null;
  }

  return (

    <div className="post-view-overlay">
      <div className="post-view">
        <button
          className="post-view-close"
          onClick={onClose}
          aria-label="Close post"
        >
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="post-view-left">
          <img
            src={post.image}
            alt="Post"
            className="post-view-image"
          />
        </div>

        <div className="post-view-right">
          <div className="post-view-header">
            <img
              src={post.user.profile_pic}
              alt={post.user.username}
              className="post-view-profile"
            />
            <strong>
              {post.user.username}
            </strong>
          </div>

          <div className="post-view-comments">
            {loading ? (
              <p>Loading comments...</p>
            ) : comments.length === 0 ? (
              <p>No comments yet.</p>

            ) : (

              comments.map((comment) => (
                <div
                  className="post-comment"
                  key={comment.id}
                >
                  <img
                    src={comment.profileImage}
                    alt={comment.username}
                    className="comment-profile-image"
                  />

                  <div className="comment-content">
                    <strong>
                      {comment.username}
                    </strong>
                    <span>
                      {comment.text}
                    </span>
                  </div>

                  <i className="bi bi-heart comment-heart"></i>
                </div>
              ))
            )}
          </div>

          <div className="post-view-bottom">

            <div className="post-view-actions">
              <i className="bi bi-heart"></i>
              <i className="bi bi-chat"></i>
              <i className="bi bi-send"></i>
              <i className="bi bi-bookmark"></i>
            </div>

            <div className="post-view-likes">
              {post.likes} likes
            </div>


            <div className="post-view-comment-input">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(event) =>
                  setCommentText(event.target.value)
                }
              />
              <button
                onClick={handleCommentSubmit}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default PostView;