import { Route, Routes } from 'react-router-dom'
import ChatPage from '../pages/ChatPage'
import Login from '../pages/Login'
import Register from '../pages/Register'

const AppRoutes = () => {
  return (
    <Routes>

      <Route path='/chat' element={<ChatPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

    </Routes>
  )
}

export default AppRoutes