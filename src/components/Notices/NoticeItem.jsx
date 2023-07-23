import CommentList from '../CommentList'

import { convertDateString } from '../../utils/helperFunctions'
import ModalDaisy from '../ModalDaisy'

export default function NoticeItem({ notice, handleDelete }) {
    return (
        <div className='border border-neutral p-4 rounded'>
            <div className='flex gap-3'>
                {/* Image */}
                {notice.image && (
                    <div>
                        <img src={notice.image} alt='' className='w-48 mt-2' />
                    </div>
                )}
                {/* Title + Author  */}
                <div className='flex-1'>
                    <div className='flex justify-between'>
                        <div>
                            <div className='text-2xl font-bold'>
                                {notice.title}
                            </div>
                            <div className=''>{notice.author.name}</div>
                        </div>

                        <div>
                            {/* Date */}
                            <div>
                                posted {convertDateString(notice.createdAt)}
                            </div>
                            {/* Delete Button */}
                            <button
                                className='mt-2 btn btn-outline btn-error btn-sm self-center normal-case'
                                onClick={() => handleDelete.mutate(notice._id)}
                            >
                                Delete Notice
                            </button>
                        </div>
                    </div>
                    {/* Message */}
                    <div className='mt-2 border-t border-neutral rounded p-2'>
                        {notice.message}
                    </div>
                </div>
            </div>

            <div className='indicator mt-4 w-[99%]'>
                <span className='indicator-item badge badge-secondary'>
                    {notice.comments.length}
                </span>

                {/* <div className='collapse bg-base-200 rounded'>
					<input type='checkbox' />
					<div className='collapse-title font-medium'>
						Show comments
					</div>
					<div className='collapse-content'>
						<CommentList comments={notice.comments}/>
                        <p>hello</p>
					</div>
				</div> */}

                <details className='collapse bg-base-200 rounded-md'>
                    <summary className='collapse-title font-medium'>
                        Show Comments
                    </summary>
                    <div className='collapse-content'>
                        <CommentList comments={notice.comments} />
                    </div>
                </details>
            </div>

            {/* Delete button */}
        </div>
    )
}
