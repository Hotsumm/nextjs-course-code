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
  const [comments, setComments] = useState<CommentType[] | null>(null);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: CommentDataType) {
    fetch(`/api/comment/${eventId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ commentData }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!comments) return;
        setComments([...comments, data.newComment]);
      })
      .catch((error) => setIsError(error));
  }

  const fetchComments = useCallback(async () => {
    try {
      const response: any = await fetch(`/api/comment/${eventId}`);
      const data = await response.json();
      const commentList: CommentType[] = data.commentList;
      setComments(commentList);
    } catch (error) {
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
      {showComments && comments && (
        <CommentList
          isLoading={isLoading}
          isError={isError}
          comments={comments}
        />
      )}
    </section>
  );
}
