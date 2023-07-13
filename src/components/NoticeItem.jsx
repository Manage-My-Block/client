import CommentList from "./CommentList"

import { convertDateString } from "../utils/helperFunctions"

export default function NoticeItem({ notice }) {
    

    return (
        <div className="border border-neutral p-4 rounded">
            {/* Title+Auther and Date  */}
            <div className='flex justify-between'>
                <div>
                    <div className='text-2xl'>{notice.title}</div>
                    <div className="">by {notice.author.name}</div>
                </div>

                <div>
                    {/* {notice.createdAt} */}
                    posted {convertDateString(notice.createdAt)}
                </div>
            </div>

            <div className="mt-4">{notice.description}</div>


			<div className="indicator mt-4 w-[99%]">
				<span className="indicator-item badge badge-secondary">{notice.comments.length}</span>

				<div className='collapse bg-base-200 rounded'>
					<input type='checkbox' />
					<div className='collapse-title font-medium'>
						Show comments
					</div>
					<div className='collapse-content'>
						<CommentList comments={notice.comments}/>
					</div>
				</div>
			</div>
        </div>
    )
}
