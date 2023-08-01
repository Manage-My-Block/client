import { startCase, camelCase } from "lodash"
import { cleanDateString, shortenText } from "../utils/helperFunctions"
// https://lodash.com/docs/4.17.15#startCase
// https://lodash.com/docs/4.17.15#camelCase

export default function DashboardList({ title, data, propertiesToDisplay }) {

    // const camelCasedProperties = propertiesToDisplay.map(propertyName => camelCase(propertyName))

    return (
        <div className="border-2 border-neutral rounded-md overflow-hidden group">

            <h2 className='py-2 px-4 text-xl font-bold bg-neutral text-neutral-content group-hover:bg-info group-hover:text-black'>
                {title}
            </h2>

            <table className='table table-lg'>

                {/* <thead className='text-lg'>
                    <tr>
                        {propertiesToDisplay?.map((property, index) => (
                            <th key={index}>{startCase(property)}</th>
                        ))}
                    </tr>
                </thead> */}

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
