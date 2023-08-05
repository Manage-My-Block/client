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
    HiMegaphone,
    HiMiniBuildingOffice,
    HiUserPlus,
    HiBuildingOffice2,
    HiWrenchScrewdriver,
    HiCurrencyDollar,
    HiQuestionMarkCircle,
} from 'react-icons/hi2'

import { HiOutlineLogin, HiOutlineLogout } from 'react-icons/hi'
import { useState } from 'react'

const iconSize = 22

import logo from '../assets/house-logo.png'

import { useAuthUser } from 'react-auth-kit'

import Avatar from 'react-avatar'

import { capitalize } from 'lodash'

import colors from 'tailwindcss/colors'

// eslint-disable-next-line react/prop-types
export default function Navbar({ children }) {
    // Navigation hook
    const navigate = useNavigate()

    // Auth kit library signout hook
    const signOut = useSignOut()

    // Auth kit library check authentication
    const isAuthenticated = useIsAuthenticated()

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const authUser = useAuthUser()
    const user = authUser()?.user

    function closeDrawer() {
        document.querySelector('#my-drawer-2').click()
        setIsMenuOpen(false)
    }

    function handleLogout() {
        signOut()
        navigate('/login')
    }

    return (
        <div className='drawer md:drawer-open'>
            <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />

            <label
                className={`btn btn-square btn-lg swap ${
                    isMenuOpen ? 'swap-active' : ''
                } swap-rotate absolute m-4 right-0 z-10 md:hidden`}
                htmlFor='my-drawer-2'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <svg
                    className='swap-off fill-current'
                    xmlns='http://www.w3.org/2000/svg'
                    width='32'
                    height='32'
                    viewBox='0 0 512 512'
                >
                    <path d='M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z' />
                </svg>

                <svg
                    className='swap-on fill-current'
                    xmlns='http://www.w3.org/2000/svg'
                    width='32'
                    height='32'
                    viewBox='0 0 512 512'
                >
                    <polygon points='400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49' />
                </svg>
            </label>

            <div className='drawer-content max-h-screen overflow-y-auto'>
                {/* Page content here */}

                {/* <label
                    htmlFor='my-drawer-2'
                    className='swap btn btn-primary drawer-button rounded-none absolute right-0 z-20 md:hidden'
                >
                    <input type="checkbox" />
                    <span className='swap-on'>Open</span>
                    <span className='swap-off'>Close</span>
                </label> */}

                {children}
            </div>
            <div className='drawer-side'>
                <label htmlFor='my-drawer-2' className='drawer-overlay'></label>
                    <ul className='menu p-4 h-full text-lg bg-base-300'>
                    {/* Sidebar content here */}

                    <li className=''>
                        <Link
                            to='/'
                            onClick={closeDrawer}
                            className='flex justify-center'
                        >
                            {/* <img src={logo} alt="logo" className='w-20 invert opacity-80' /> */}
                            {/* <span className='font-logo tracking-widest text-xl bg-base-300 -translate-x-[43px] translate-y-[9px]'> */}
                            
                            <span className='font-logo tracking-widest text-xl'>
                                StrataSphere
                            </span>
                        </Link>
                    </li>

                    <hr className='my-3 border-base-content/30' />

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
                            <HiMegaphone size={iconSize} />
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
                    <li>
                        <Link
                            to='/budget'
                            onClick={closeDrawer}
                            className='font-normal space-x-1'
                        >
                            <HiCurrencyDollar size={iconSize} />
                            <span>Budget</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/contacts'
                            onClick={closeDrawer}
                            className='font-normal space-x-1'
                        >
                            <HiWrenchScrewdriver size={iconSize} />
                            <span>Contacts</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/building'
                            onClick={closeDrawer}
                            className='font-normal space-x-1'
                        >
                            <HiMiniBuildingOffice size={iconSize} />
                            <span>Building</span>
                        </Link>
                    </li>

                    <hr className='my-3 border-base-content/30' />

                    <li>
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
                            to='/faq'
                            onClick={closeDrawer}
                            className='font-normal space-x-1'
                        >
                            <HiQuestionMarkCircle size={iconSize} />
                            <span>FAQ</span>
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

                    <div className='bg-base-100 rounded-lg mt-auto m-1'>
                        {isAuthenticated() && (
                            <>
                                <div className='rounded-lg p-3'>
                                    <div className='flex items-center p-2 gap-3 text-sm'>
                                        <Avatar
                                            name={user.name}
                                            round
                                            size='42'
                                            color='grey'
                                        />

                                        <div className=''>
                                            <p>{user.name}</p>
                                            <p className=' opacity-50'>
                                                {capitalize(user.role.role)}
                                            </p>
                                        </div>
                                    </div>
                                    <li>
                                        <div
                                            onClick={handleLogout}
                                            className='font-normal space-x-1 mt-1 bg-base-200'
                                        >
                                            <HiOutlineLogout size={iconSize} />
                                            <span>Logout</span>
                                        </div>
                                    </li>
                                </div>
                            </>
                        )}
                    </div>

                    {/* If token exists, show Logout otherwise show Login/Register */}
                    {!isAuthenticated() && (
                        <>
                            <li>
                                <Link
                                    to='/login'
                                    onClick={closeDrawer}
                                    className='font-normal space-x-1'
                                >
                                    <HiOutlineLogin size={iconSize} />
                                    <span>Login</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/register'
                                    onClick={closeDrawer}
                                    className='font-normal space-x-1'
                                >
                                    <HiUserPlus size={iconSize} />
                                    <span>Register</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/newbuilding'
                                    onClick={closeDrawer}
                                    className='font-normal space-x-1'
                                >
                                    <HiBuildingOffice2 size={iconSize} />
                                    <span>New Building</span>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    )
}
