import { startCase } from "lodash";
import { cleanDateString } from "../../utils/helperFunctions";
import { format } from "date-fns";


export default function TransactionItem({ transaction }) {

    return (
        <tr>
            <td className=''>{format(new Date(transaction.date), 'dd-MM-yyyy')}</td>
            <td>{startCase(transaction.description)}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.tally}</td>
        </tr>
    )
}
