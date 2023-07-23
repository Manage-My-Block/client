import NoticeItem from "./NoticeItem"

export default function NoticeList({ notices, handleDelete }) {
    return <div>
		{notices.map((notice, index) => (
			<NoticeItem key={notice._id} notice={notice} handleDelete={handleDelete}/>
		))}
	</div>
}
