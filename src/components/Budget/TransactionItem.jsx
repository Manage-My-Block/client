import { startCase } from "lodash";
import { cleanDateString, shortenText } from "../../utils/helperFunctions";
import { format } from "date-fns";


export default function TransactionItem({ transaction }) {
    function numberWithCommas(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <tr>
            <td className=''>{format(new Date(transaction.date), 'dd-MM-yyyy')}</td>
            <td>
                <div className="tooltip" data-tip={startCase(transaction.description)}>
                    {shortenText(startCase(transaction.description), 10)}
                </div>
            </td>
            <td>$ {numberWithCommas(transaction.amount / 100)}</td>
            <td>$ {numberWithCommas(transaction.tally / 100)}</td>
        </tr>
    )
}
