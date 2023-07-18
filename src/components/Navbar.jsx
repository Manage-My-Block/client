import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSignOut } from 'react-auth-kit'
import { useIsAuthenticated } from 'react-auth-kit'

import {
    HiSquares2X2,
    HiUserGroup,
    HiUser,
    HiClipboardDocumentCheck,
    HiMiniCog8Tooth,
    HiChatBubbleLeftRight,
    HiMegaphone
} from 'react-icons/hi2'

import {HiOutlineLogin, HiOutlineLogout} from 'react-icons/hi'

const iconSize = 22

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
                    <li>
                        <Link
                            to='/'
                            onClick={closeDrawer}
                            className='font-normal space-x-1'
                        >
                            <HiSquares2X2 size={iconSize} />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/taskboard'
                            onClick={closeDrawer}
                            className='font-normal space-x-1'
                        >
                            <HiClipboardDocumentCheck size={iconSize} />
                            <span>Task Board</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/meetings'
                            onClick={closeDrawer}
                            className='font-normal space-x-1'
                        >
                            <HiChatBubbleLeftRight size={iconSize} />
                            <span>Meetings</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/noticeboard'
                            onClick={closeDrawer}
                            className='font-normal space-x-1'
                        >
                            <HiMegaphone size={iconSize}/>
                            <span>Notice Board</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/members'
                            onClick={closeDrawer}
                            className='font-normal space-x-1'
                        >
                            <HiUserGroup size={iconSize} />
                            <span>Members</span>
                        </Link>
                    </li>

                    <hr className='my-3 border-base-content/30' />
                      
                    <li>
                        <Link to='/building' onClick={closeDrawer}>
                            Building
                        </Link>
                    </li>

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
                        <Link
                            to='/profile'
                            onClick={closeDrawer}
                            className='font-normal space-x-1'
                        >
                            <HiUser size={iconSize} />
                            <span>Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/settings'
                            onClick={closeDrawer}
                            className='font-normal space-x-1'
                        >
                            <HiMiniCog8Tooth size={iconSize} />
                            <span>Settings</span>
                        </Link>
                    </li>

                    <div className='bg-base-300 rounded-lg mt-auto'>
                        {isAuthenticated() && (
                            <>
                                <li>
                                    <p
                                        onClick={handleLogout}
                                        className='font-normal space-x-1'
                                    >
                                        <HiOutlineLogout size={iconSize}/>
                                        <span>Logout</span>
                                    </p>
                                </li>
                            </>
                        )}
                    </div>
                </ul>
            </div>
        </div>
    )
}
