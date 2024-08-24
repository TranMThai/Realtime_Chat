import { Route, Routes } from 'react-router-dom'
import ChatPage from '../pages/ChatPage'

const AppRoutes = () => {
  return (
    <Routes>

      <Route path='/chat' element={<ChatPage />} />

    </Routes>
  )
}

export default AppRoutes