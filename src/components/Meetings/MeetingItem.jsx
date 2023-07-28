import { convertDateString } from '../../utils/helperFunctions'

export default function MeetingItem({ meeting, handleDelete }) {
    // Trying a different grid layout technique than I usually do (perhaps easier to make responsive)
    // grid-cols-3 on parent and col-span-2 on child
    return (
        <div className='border border-neutral rounded grid grid-cols-1 md:grid-cols-3'>
            <div className='py-2 px-3 col-span-2'>
                <div className='text-xl font-bold text-primary-content'>{meeting.title}</div>
                <div className='text-sm'>{meeting.description}</div>
            </div>
            <div className='py-2 px-3 bg-base-200 space-y-2'>
                <div>
                    Meeting Date:{' '}
                    <span className='font-bold text-base-content'>
                        {convertDateString(meeting.meetingDate)}
                    </span>
                </div>
                <div className='flex flex-wrap justify-between gap-1 w-'>
                    <a
                        href={meeting.zoomLink}
                        target='_blank'
                        className='btn btn-outline btn-xs btn-info normal-case'
                    >
                        Open Zoom Link
                    </a>
                    <button
                        className='btn btn-outline btn-xs btn-error normal-case'
                        onClick={() => handleDelete.mutate(meeting._id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
