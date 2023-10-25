import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Officer from './views/Officer';
import Admin from './views/Admin';
import Service from './views/Service';
import MyNavbar from './components/MyNavbar';
import { useState } from 'react';

function App() {
	const [show, setShow] = useState(false);
	const [user, setUser] = useState(null);
	const [loggedIn, setLoggedIn] = useState(false);
	const [popup, setPopup] = useState(false);

	const handleLogout = () => {
		// await API.logOut();
		setLoggedIn(false);
		setUser(null);
	};

	return (
		<BrowserRouter>
			<MyNavbar loggedIn={loggedIn} logout={handleLogout} />
			<Routes>
				<Route path='/' element={<Home popup={popup} setPopup={setPopup} />} />
				<Route path='/login' element={<Login show={show} setShow={setShow} />} />
				<Route path='/officer' element={<Officer popup={popup} setPopup={setPopup} />} />
				<Route path='/admin' element={<Admin />} />
				<Route path='admin/:id' element={<Service />} />
				<Route path='/*' element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
