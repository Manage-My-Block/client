import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

// Import Pages + Components
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import NoticeBoardPage from './pages/NoticeBoardPage'
import MeetingsPage from './pages/MeetingsPage'
import MembersPage from './pages/MembersPage'
import TaskBoardPage from './pages/TaskBoardPage'
import AuthPage from './pages/AuthPage'
import UserDebug from './components/UserDebug'
import { isTokenExpired } from './utils/helperFunctions'
import { useAuthStore } from './stores/AuthStore'

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const token = useAuthStore.getState().token

    useEffect(() => {
        if (token.length < 1) {
            setLoggedIn(false)
        } else {
            setLoggedIn(!isTokenExpired(token))
        }
    }, [token])

    return (
        <div>
            <Navbar>
                <main className='min-h-screen relative'>
                    <Routes>
                        {loggedIn ?
                            (<>
                                <Route path='/' element={<HomePage />} />

                                <Route path='/login' element={<AuthPage authType={'login'} />} />
                                <Route path='/register' element={<AuthPage authType={'register'} />} />
                                <Route path='/newBuilding' element={<AuthPage authType={'create building'} />} />

                                <Route path='/taskboard' element={<TaskBoardPage />} />
                                <Route path='/noticeboard' element={<NoticeBoardPage />} />
                                <Route path='/meetings' element={<MeetingsPage />} />
                                <Route path='/members' element={<MembersPage />} />
                            </>)
                            :
                            (<>
                                <Route path='/' element={<AuthPage authType={'login'} />} />

                                <Route path='/login' element={<AuthPage authType={'login'} />} />
                                <Route path='/register' element={<AuthPage authType={'register'} />} />
                                <Route path='/newBuilding' element={<AuthPage authType={'create building'} />} />

                                <Route path='/taskboard' element={<AuthPage authType={'login'} />} />
                                <Route path='/noticeboard' element={<AuthPage authType={'login'} />} />
                                <Route path='/meetings' element={<AuthPage authType={'login'} />} />
                                <Route path='/members' element={<AuthPage authType={'login'} />} />
                            </>)
                        }

                    </Routes>

                    <UserDebug />
                </main>

            </Navbar>

        </div>
    )
}


{/* <Route path='/' element={loggedIn ? <HomePage /> : <Navigate to='/register' />} />

<Route path='/login' element={<AuthPage authType={'login'} />} />
<Route path='/register' element={<AuthPage authType={'register'} />} />
<Route path='/newbuilding' element={<AuthPage authType={'create building'} />} />

<Route path='/taskboard' element={loggedIn ? <TaskBoardPage /> : <Navigate to='/register' />} />
<Route path='/noticeboard' element={loggedIn ? <NoticeBoardPage /> : <Navigate to='/register' />} />
<Route path='/meetings' element={loggedIn ? <MeetingsPage /> : <Navigate to='/register' />} />
<Route path='/members' element={loggedIn ? <MembersPage /> : <Navigate to='/register' />} /> */}



{/* <Route path='/' element={<HomePage />} />

<Route path='/login' element={<AuthPage authType={'login'} />} />
<Route path='/register' element={<AuthPage authType={'register'} />} />
<Route path='/newBuilding' element={<AuthPage authType={'create building'} />} />

<Route path='/taskboard' element={<TaskBoardPage />} />
<Route path='/noticeboard' element={<NoticeBoardPage />} />
<Route path='/meetings' element={<MeetingsPage />} />
<Route path='/members' element={<MembersPage />} /> */}