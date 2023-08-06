import { cleanDateString, shortenText } from "../utils/helperFunctions"

export default function DashboardList({ title, data, propertiesToDisplay }) {

    return (
        <div className="border-2 border-neutral rounded-md overflow-hidden hover:border-info transition-colors">

            <h2 className='py-2 px-4 text-xl font-bold bg-neutral text-neutral-content'>
                {title}
            </h2>

            <table className='table table-lg'>

                <tbody className="h-10 overflow-hidden">
                    {data?.map((dataItem, index) => {
                        // only show 2 items
                        if (index > 3) {
                            return
                        } else {
                            return <tr key={dataItem._id} className='border-b-0 even:bg-base-200'>
                                {propertiesToDisplay?.map((property, index) => {
                                    if (index > 3) {
                                        return
                                    } else if (property === 'meetingDate' || property === 'createdAt') {
                                        return <td key={index}>{cleanDateString(dataItem[property])}</td>
                                    } else if (property === 'balance') {
                                        return <td key={index}>Balance: $ <span className="font-bold">{dataItem[property] / 100}</span></td>
                                    } else if (property === 'name') {
                                        return <td key={index}>{dataItem[property] ? shortenText(dataItem[property], 18) : 'Anonymous'}</td>
                                    } else {
                                        return <td key={index}>{(shortenText(dataItem[property], 18))}</td>
                                    }
                                })}
                            </tr>
                        }
                    })}
                </tbody>

            </table>

        </div>
    )
}
