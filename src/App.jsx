import { Routes, Route } from 'react-router-dom'

// Import Pages + Components
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import NoticeBoardPage from './pages/NoticeBoardPage'
import MeetingsPage from './pages/MeetingsPage'
import MembersPage from './pages/MembersPage'



export default function App() {
    return <div>
        <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/noticeboard' element={<NoticeBoardPage />}/>
            <Route path='/meetings' element={<MeetingsPage />}/>
            <Route path='/members' element={<MembersPage />}/>
        </Routes>
    </div>
}