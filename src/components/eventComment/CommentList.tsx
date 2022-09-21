import classes from './CommentList.module.css';
import { CommentType } from '../../types/comment';

type CommentListProps = {
  comments: CommentType[];
  isLoading: boolean;
  isError: boolean;
};

export default function CommentList({
  comments,
  isLoading,
  isError,
}: CommentListProps) {
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;
  if (comments.length === 0) return <p>댓글이 없습니다.</p>;

  return (
    <ul className={classes.comments}>
      {comments.map((comment) => (
        <li key={comment._id}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}
