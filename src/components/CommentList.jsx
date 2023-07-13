import CommentItem from "./CommentItem"

export default function CommentList({ comments }) {
    return <ul>
		{comments.map((comment, index) => (
			<CommentItem key={comment._id} comment={comment}/>
		))}
	</ul>
}
