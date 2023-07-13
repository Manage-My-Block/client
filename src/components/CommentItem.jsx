import { convertDateString } from '../utils/helperFunctions'

export default function CommentItem({ comment }) {
    return (
        <li className='p-2 border-b border-neutral last:border-none'>
            <div className='flex justify-between'>
                <div>{comment.user.name}</div>
                <div>{convertDateString(comment.createdAt)}</div>
            </div>
            <div>{comment.comment}</div>
        </li>
    )
}
