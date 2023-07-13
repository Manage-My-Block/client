import { Link } from 'react-router-dom'
import { useAuthStore } from '../stores/AuthStore'
import { useUserStore } from '../stores/UserStore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar({ children }) {
    // const [token] = useState(() => JSON.parse(localStorage.getItem('auth')).state.token)

    const { token, setToken } = useAuthStore()
    // console.log('Navbar tokent init: ', token)

    const { setUserData } = useUserStore()

    const navigate = useNavigate()

    function closeDrawer() {
        document.querySelector('#my-drawer-2').click()
    }

    function handleLogout() {
        setToken("") // Clear JWT
        setUserData({}) // Clear user data
        navigate('/login')
    }

    return (
        <div className='drawer md:drawer-open'>
            <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
            
            {/* <div className='drawer-content flex flex-col items-center justify-center'> */}
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


                    {/* <li>{'token: ' + token}</li> */}


                    {/* If token exists, show Logout otherwise show Login/Register */}
                    {token ? (
                        <>
                            <li>
                                <p onClick={handleLogout}>Logout</p>
                            </li>
                        </>


                    ) : (
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
                    )}

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
