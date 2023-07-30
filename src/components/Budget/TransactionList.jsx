import TransactionItem from "./TransactionItem"

export default function TransactionList({ transactions }) {
    return <div>
        <table className="table table-zebra text-lg">
            <thead className="text-lg">
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Tally</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction) => (
                    <TransactionItem key={transaction._id} transaction={transaction} />
                ))}
            </tbody>
        </table>
    </div>
}
