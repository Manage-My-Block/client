import { Routes, Route } from 'react-router-dom'

// Import Pages + Components
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import NoticeBoardPage from './pages/NoticeBoardPage'
import MeetingsPage from './pages/MeetingsPage'
import MembersPage from './pages/MembersPage'
import TaskBoardPage from './pages/TaskBoardPage'
import AuthPage from './pages/AuthPage'

export default function App() {
    return (
        <div>
            <Navbar>
            <main>
                <Routes>
                    <Route path='/' element={<HomePage />} />

                    <Route path='/login' element={<AuthPage authType={'login'}/>}/>
                    <Route path='/register' element={<AuthPage authType={'register'}/>}/>

                    <Route path='/taskboard' element={<TaskBoardPage />} />
                    <Route path='/noticeboard' element={<NoticeBoardPage />} />
                    <Route path='/meetings' element={<MeetingsPage />} />
                    <Route path='/members' element={<MembersPage />} />
                </Routes>
            </main>

            </Navbar>

        </div>
    )
}
