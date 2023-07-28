import MeetingItem from "./MeetingItem"

export default function MeetingList({ meetings, handleDelete }) {
    return <div className="space-y-2">
		{meetings.map((meeting, index) => (
			<MeetingItem key={meeting._id} meeting={meeting} handleDelete={handleDelete}/>
		))}
	</div>
}
