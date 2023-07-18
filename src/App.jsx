import { Routes, Route, Navigate } from 'react-router-dom'

// Import Pages + Components
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import NoticeBoardPage from './pages/NoticeBoardPage'
import MeetingsPage from './pages/MeetingsPage'
import MembersPage from './pages/MembersPage'
import TaskBoardPage from './pages/TaskBoardPage'
import AuthPage from './pages/AuthPage'
import AccountPage from './pages/AccountPage'
import UserDebug from './components/UserDebug'

// Libraries
import { useIsAuthenticated } from 'react-auth-kit'
import SettingsPage from './pages/SettingsPage'
import { useEffect } from 'react'

export default function App() {

    const PrivateRoute = ({ Component }) => {
        const isAuthenticated = useIsAuthenticated();
        const auth = isAuthenticated();
        return auth ? <Component /> : <Navigate to="/register" />;
    };

    useEffect(() => {
        // Get theme from localStorage
        const theme = window.localStorage.getItem('theme')

        // Set root html element data-theme attribute
        window.document.documentElement.setAttribute('data-theme', theme)
    }, [])

    return (
        <div>
            <Navbar>
                <main className='min-h-screen relative'>
                    <Routes>
                        {/* Login Paths */}
                        <Route path='/login' element={<AuthPage authType={'login'} />} />
                        <Route path='/register' element={<AuthPage authType={'register'} />} />
                        <Route path='/newBuilding' element={<AuthPage authType={'create building'} />} />

                        {/* Protected Paths */}
                        <Route path='/' element={<PrivateRoute Component={HomePage} />} />
                        <Route path='/taskboard' element={<PrivateRoute Component={TaskBoardPage} />} />
                        <Route path='/noticeboard' element={<PrivateRoute Component={NoticeBoardPage} />} />
                        <Route path='/meetings' element={<PrivateRoute Component={MeetingsPage} />} />
                        <Route path='/members' element={<PrivateRoute Component={MembersPage} />} />
                        <Route path='/account' element={<PrivateRoute Component={AccountPage} />} />
                        <Route path='/settings' element={<SettingsPage />}/>
                    </Routes>

                    {/* <UserDebug /> */}
                </main>
            </Navbar>
        </div>
    )
}