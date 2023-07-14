import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSignOut } from 'react-auth-kit'
import { useIsAuthenticated } from 'react-auth-kit';


// eslint-disable-next-line react/prop-types
export default function Navbar({ children }) {
    // Navigation hook
    const navigate = useNavigate()

    // Auth kit library signout hook
    const signOut = useSignOut()

    // Auth kit library check authentication
    const isAuthenticated = useIsAuthenticated()

    function closeDrawer() {
        document.querySelector('#my-drawer-2').click()
    }

    function handleLogout() {
        signOut()
        navigate('/login')
    }

    return (
        <div className='drawer md:drawer-open'>
            <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />

            <div className='drawer-content'>
                {/* Page content here */}
                <label
                    htmlFor='my-drawer-2'
                    className='btn btn-primary drawer-button rounded-none absolute right-0 z-10 md:hidden'
                >
                    Open Menu
                </label>
                {children}
            </div>
            <div className='drawer-side'>
                <label htmlFor='my-drawer-2' className='drawer-overlay'></label>
                <ul className='menu p-4 w-60 h-full bg-base-200 text-base-content text-lg'>
                    {/* Sidebar content here */}

                    {/* If token exists, show Logout otherwise show Login/Register */}
                    {isAuthenticated() ?
                        (
                            <>
                                <li>
                                    <p onClick={handleLogout}>Logout</p>
                                </li>
                            </>


                        )
                        :
                        (
                            <>
                                <li>
                                    <Link to='/login' onClick={closeDrawer}>Login</Link>
                                </li>
                                <li>
                                    <Link to='/register' onClick={closeDrawer}>Register</Link>
                                </li>
                                <li>
                                    <Link to='/newbuilding' onClick={closeDrawer}>New Building</Link>
                                </li>
                            </>
                        )
                    }

                    <hr className='my-4 opacity-20' />

                    <li>
                        <Link to='/' onClick={closeDrawer}>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to='/taskboard' onClick={closeDrawer}>
                            Task Board
                        </Link>
                    </li>
                    <li>
                        <Link to='/meetings' onClick={closeDrawer}>
                            Meetings
                        </Link>
                    </li>
                    <li>
                        <Link to='/noticeboard' onClick={closeDrawer}>
                            Notice Board
                        </Link>
                    </li>
                    <li>
                        <Link to='/members' onClick={closeDrawer}>
                            Members
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
