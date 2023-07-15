import { startCase, camelCase } from "lodash"
// https://lodash.com/docs/4.17.15#startCase
// https://lodash.com/docs/4.17.15#camelCase

export default function DashboardList({ title, data, propertiesToDisplay }) {

	// const camelCasedProperties = propertiesToDisplay.map(propertyName => camelCase(propertyName))
	
    return (
        <div className=" border border-base-100 rounded p-4">

            <h2 className='text-xl font-bold bg-base-300 p-2 px-4 rounded'>{title}</h2>

            <table className='table table-zebra table-md'>

                <thead className='text-lg'>
                    <tr>
                        {propertiesToDisplay?.map((property) => (
                            <th>{startCase(property)}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data?.map((dataItem, index) => (

                        <tr key={dataItem._id} className='border-b-0'>

                            {propertiesToDisplay?.map((property, index) => (
                                <td key={index}>{dataItem[property]}</td>
                            ))}
							
                        </tr>

                    ))}
                </tbody>

            </table>

        </div>
    )
}
