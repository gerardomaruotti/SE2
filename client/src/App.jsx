import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home'
import Login from './views/Login'
import Officer from './views/Officer'
import Admin from './views/Admin';
import MyNavbar from './components/MyNavbar';

function App() {

  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/officer' element={<Officer />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/*' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
