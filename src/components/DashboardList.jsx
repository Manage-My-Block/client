import { startCase, camelCase } from "lodash"
import { cleanDateString } from "../utils/helperFunctions"
// https://lodash.com/docs/4.17.15#startCase
// https://lodash.com/docs/4.17.15#camelCase

export default function DashboardList({ title, data, propertiesToDisplay }) {

    // const camelCasedProperties = propertiesToDisplay.map(propertyName => camelCase(propertyName))

    return (
        <div className="rounded p-4 bg-neutral">

            <h2 className='text-xl font-bold text-neutral-content p-2 px-4 rounded'>{title}</h2>

            <table className='table table-zebra table-md'>

                <thead className='text-lg text-neutral-content'>
                    <tr>
                        {propertiesToDisplay?.map((property, index) => (
                            <th key={index}>{startCase(property)}</th>
                        ))}
                    </tr>
                </thead>

                <tbody className="h-10 overflow-hidden">
                    {data?.map((dataItem, index) => {
                        // only show 2 items
                        if (index > 1) {
                            return
                        } else {
                            return <tr key={dataItem._id} className='border-b-0 odd:text-neutral-content'>
                                {propertiesToDisplay?.map((property, index) => {
                                    if (index > 2) {
                                        return
                                    } else if (property === 'meetingDate' || property === 'createdAt') {
                                        return <td key={index}>{cleanDateString(dataItem[property])}</td>
                                    } else {
                                        return <td key={index}>{dataItem[property]}</td>
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
