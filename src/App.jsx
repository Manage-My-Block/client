import { Routes, Route, Navigate } from 'react-router-dom'

// Import Pages + Components
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import NoticeBoardPage from './pages/NoticeBoardPage'
import MeetingsPage from './pages/MeetingsPage'
import MembersPage from './pages/MembersPage'
import TaskBoardPage from './pages/TaskBoardPage'
import AuthPage from './pages/AuthPage'
import UserDebug from './components/UserDebug'

// Libraries
import { useIsAuthenticated } from 'react-auth-kit'

export default function App() {

    const PrivateRoute = ({ Component }) => {
        const isAuthenticated = useIsAuthenticated();
        const auth = isAuthenticated();
        return auth ? <Component /> : <Navigate to="/register" />;
    };

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
                    </Routes>

                    <UserDebug />
                </main>
            </Navbar>
        </div>
    )
}