import { useState, useEffect, useCallback } from 'react';

import CommentList from './CommentList';
import NewComment from './NewComment';
import classes from './Comments.module.css';
import { CommentType, CommentDataType } from '../../types/comment';

type CommentsProps = {
  eventId: string;
};

export default function Comments({ eventId }: CommentsProps) {
  const [showComments, setShowComments] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentType[]>([]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData: CommentDataType) {
    try {
      const response = await fetch(`/api/comment/${eventId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ commentData }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Something went wrong');

      if (!comments) return;
      setComments([...comments, data.newComment]);
    } catch (error: any) {
      console.log(error.message);
      alert('댓글 작성에 실패하였습니다.');
    }
  }

  const fetchComments = useCallback(async () => {
    try {
      const response: any = await fetch(`/api/comment/${eventId}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Something went wrong');

      const commentList: CommentType[] = data.commentList;
      setComments(commentList);
    } catch (error: any) {
      console.log(error.message);
      setIsError(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments, fetchComments]);

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && (
        <CommentList
          isLoading={isLoading}
          isError={isError}
          comments={comments}
        />
      )}
    </section>
  );
}
