import { useNavigate } from "react-router-dom"

export default function FAQPage() {
    const navigate = useNavigate()

    return (
        <div className='min-h-screen flex flex-col gap-10 p-10 text-lg'>
            <div>

                <h1 className="text-5xl text-center">Welcome to StrataSphere!</h1>
            </div>
            <div className="flex flex-wrap gap-8 justify-center my-auto">
                <div className="card card-compact cursor-pointer w-96 bg-base-200 hover:bg-info hover:text-black shadow-xl transition-colors" onClick={() => navigate('/taskboard')}>
                    <div className="card-body">
                        <h2 className="card-title">Tasks</h2>
                        <p>Manage tasks, set due dates, add costs and automatically charge the budget on completion.</p>
                    </div>
                </div>
                <div className="card card-compact cursor-pointer w-96 bg-base-200 hover:bg-info hover:text-black shadow-xl transition-colors" onClick={() => navigate('/noticeboard')}>
                    <div className="card-body">
                        <h2 className="card-title">Notices</h2>
                        <p>Post to the building notice board, comment on posts and upload images.</p>
                    </div>
                </div>
                <div className="card card-compact cursor-pointer w-96 bg-base-200 hover:bg-info hover:text-black shadow-xl transition-colors" onClick={() => navigate('/budget')}>
                    <div className="card-body">
                        <h2 className="card-title">Budgeting</h2>
                        <p>Create budgets and add transactions, or link tasks to transactions</p>
                    </div>
                </div>
                <div className="card card-compact cursor-pointer w-96 bg-base-200 hover:bg-info hover:text-black shadow-xl transition-colors" onClick={() => navigate('/contacts')}>
                    <div className="card-body">
                        <h2 className="card-title">Emergency contacts</h2>
                        <p>Collect all the import building contacts in one place, like plumbers, electricians or cleaners.</p>
                    </div>
                </div>
                <div className="card card-compact cursor-pointer w-96 bg-base-200 hover:bg-info hover:text-black shadow-xl transition-colors" onClick={() => navigate('/meetings')}>
                    <div className="card-body">
                        <h2 className="card-title">Meetings</h2>
                        <p>Organise meetings and add Zoom links and dates.</p>
                    </div>
                </div>
                <div className="card card-compact cursor-pointer w-96 bg-base-200 hover:bg-info hover:text-black shadow-xl transition-colors" onClick={() => navigate('/meetings')}>
                    <div className="card-body">
                        <h2 className="card-title">Members</h2>
                        <p>See all the occupants of the building.</p>
                    </div>
                </div>
                {/* <p>With StrataSphere you can:</p>
                <li>Manage tasks, set due dates, add costs and automatically charge the budget on completion.</li>
                <li>Post to the building notice board, comment on posts and upload images.</li>
                <li>Create budgets and add transactions, or link tasks to transactions</li>
                <li>Collect all the import building contacts in one place, like plumbers, electricians or cleaners.</li>
                <li>Organise meetings and add Zoom links and dates.</li> */}
            </div>

        </div>
    )
}
