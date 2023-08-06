import { useNavigate } from "react-router-dom"

export default function FAQPage() {
    const navigate = useNavigate()

    return (
        <div className='min-h-screen flex flex-col gap-10 p-10 text-lg'>
            <div>

                <h1 className="text-5xl text-center">Welcome to StrataSphere!</h1>
            </div>
            <div className="flex flex-wrap gap-8 justify-center m-auto mt-36">
                <div className="card cursor-pointer w-96 bg-base-200 hover:bg-info hover:text-black shadow-xl transition-colors" onClick={() => navigate('/taskboard')}>
                    <div className="card-body">
                        <h2 className="card-title text-3xl">Tasks</h2>
                        <p>Manage tasks, set due dates, add costs and automatically charge the budget on completion.</p>
                    </div>
                </div>
                <div className="card cursor-pointer w-96 bg-base-200 hover:bg-info hover:text-black shadow-xl transition-colors" onClick={() => navigate('/noticeboard')}>
                    <div className="card-body">
                        <h2 className="card-title text-3xl">Notices</h2>
                        <p>Post to the building notice board, comment on posts and upload images.</p>
                    </div>
                </div>
                <div className="card cursor-pointer w-96 bg-base-200 hover:bg-info hover:text-black shadow-xl transition-colors" onClick={() => navigate('/budget')}>
                    <div className="card-body">
                        <h2 className="card-title text-3xl">Budgeting</h2>
                        <p>Create budgets and add transactions, or link tasks to transactions</p>
                    </div>
                </div>
                <div className="card cursor-pointer w-96 bg-base-200 hover:bg-info hover:text-black shadow-xl transition-colors" onClick={() => navigate('/contacts')}>
                    <div className="card-body">
                        <h2 className="card-title text-3xl">Emergency contacts</h2>
                        <p>Collect all the import building contacts in one place, like plumbers, electricians or cleaners.</p>
                    </div>
                </div>
                <div className="card cursor-pointer w-96 bg-base-200 hover:bg-info hover:text-black shadow-xl transition-colors" onClick={() => navigate('/meetings')}>
                    <div className="card-body">
                        <h2 className="card-title text-3xl">Meetings</h2>
                        <p>Organise meetings and add Zoom links and dates.</p>
                    </div>
                </div>
                <div className="card cursor-pointer w-96 bg-base-200 hover:bg-info hover:text-black shadow-xl transition-colors" onClick={() => navigate('/meetings')}>
                    <div className="card-body">
                        <h2 className="card-title text-3xl">Members</h2>
                        <p>See all the occupants of the building.</p>
                    </div>
                </div>
            </div>

        </div>
    )
}
