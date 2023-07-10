import { Link } from 'react-router-dom'

export default function Navbar({children}) {

    function closeDrawer() {
        document.querySelector('#my-drawer-2').click()
    }

    return (
        <div className='drawer md:drawer-open'>
            <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
            {/* <div className='drawer-content flex flex-col items-center justify-center'> */}
            <div className='drawer-content' >
                {/* Page content here */}
                <label
                    htmlFor='my-drawer-2'
                    className='btn btn-primary drawer-button rounded-none absolute right-0 md:hidden'
                >
                    Open Menu
                </label>
                {children}
            </div>
            <div className='drawer-side'>
                <label htmlFor='my-drawer-2' className='drawer-overlay'></label>
                <ul className='menu p-4 w-80 h-full bg-base-200 text-base-content text-lg'>
                    {/* Sidebar content here */}
                    <li>
                        <Link to='/' onClick={closeDrawer}>Dashboard</Link>
                    </li>
                    <li>
                        <Link to='/taskboard' onClick={closeDrawer}>Task Board</Link>
                    </li>
                    <li>
                        <Link to='/meetings' onClick={closeDrawer}>Meetings</Link>
                    </li>
                    <li>
                        <Link to='/noticeboard' onClick={closeDrawer}>Notice Board</Link>
                    </li>
                    <li>
                        <Link to='/members' onClick={closeDrawer}>Members</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
