import NoticeItem from "./NoticeItem"

export default function NoticeList({ notices }) {
    return <div>
		{notices.map((notice, index) => (
			<NoticeItem key={notice._id} notice={notice}/>
		))}
	</div>
}
