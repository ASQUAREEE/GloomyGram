import React, { useState, useEffect,ChangeEvent } from 'react';
import { useCommentPost, useGetRecentComment } from '@/lib/react-query/queriesAnsMutations';
import Loader from './Loader';


interface CommentProps {
  postId: string; // Specify the type of the postId prop
}


const Comment: React.FC<CommentProps> = ({ postId }) => {
  const [newComment, setNewComment] = useState<string>('');
  const [comments, setComments] = useState<string[]>([]); 
  const { data: recentComments, isLoading } = useGetRecentComment(postId);
  const { mutate: commentPost } = useCommentPost();

  useEffect(() => {
    if (recentComments) {
      setComments(recentComments);
    }
  }, [recentComments]);

  const handleNewComment = (e: ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };
  const handleAddComment = () => {
    if (newComment !== '') {
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);

      // Assuming you're using commentPost to send the updated comments to your backend
      commentPost({ postId: postId, commentsArray: updatedComments });
    }
    setNewComment(''); // Clear the input after adding the comment
  };

  return (
    <div className="comment-section mt-2">
      <div className="previous-comments">

      {isLoading && <Loader />} {/* Render Loading component when isLoading is true */}

        {comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
      </div>
      <div className="flex items-center mt-4">
        <input
          type="text"
          value={newComment}
          onChange={handleNewComment}
          placeholder="Add a comment..."
          className="border text-black border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow mr-2"
        />
        <button
          onClick={handleAddComment}
          className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:bg-gray-900 text-sm"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Comment;
