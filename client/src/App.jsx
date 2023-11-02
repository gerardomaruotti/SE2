import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Officer from './views/Officer';
import Admin from './views/Admin';
import MyNavbar from './components/MyNavbar';
import { useState, useEffect } from 'react';
import API from './API';

function App() {
	const [show, setShow] = useState(false);
	const [user, setUser] = useState(null);
	const [loggedIn, setLoggedIn] = useState(false);
	const [popup, setPopup] = useState(false);
	const [services, setServices] = useState([]);
	const [lastTicket, setLastTicket] = useState(0);

	useEffect(() => {
		API.getServices()
			.then((services) => {
				setServices(services);
			})
			.catch((err) => handleError(err));
	}, []);

	const handleError = (err) => {
		if (err) {
			console.log(err);
		}
	};

	const deleteService = (serviceId) => {
		API.deleteService(serviceId)
			.then((services) => {
				API.getServices()
					.then((services) => {
						setServices(services);
					})
					.catch((err) => handleError(err));
			})
			.catch((err) => handleError(err));
	};

	// const updateService = (service, serviceId) => {
	// 	API.createService(service)
	// 		.then(() => {
	// 			API.deleteService(serviceId)
	// 				.then(() => {
	// 					API.getServices()
	// 						.then((services) => {
	// 							setServices(services);
	// 						})
	// 						.catch((err) => handleError(err));
	// 				})
	// 				.catch((err) => handleError(err));
	// 		})
	// 		.catch((err) => handleError(err));
	// };

	const createService = (service) => {
		API.createService(service)
			.then(() => {
				API.getServices()
					.then((services) => {
						setServices(services);
					})
					.catch((err) => handleError(err));
			})
			.catch((err) => handleError(err));
	};

	const handleLogin = () => {
		setLoggedIn(true);
		setUser(null);
	};

	const handleLogout = () => {
		// await API.logOut();
		setLoggedIn(false);
		setUser(null);
	};

	const requestTicket = (serviceId) => {
		API.createTicket({ service: serviceId })
			.then((ticketId) => {
				setLastTicket(ticketId);
			})
			.catch((err) => {
				setLastTicket(0);
			});
	};



	return (
		<BrowserRouter>
			<MyNavbar loggedIn={loggedIn} logout={handleLogout} />
			<Routes>
				<Route
					path='/'
					element={<Home popup={popup} setPopup={setPopup} services={services} requestTicket={requestTicket} lastTicket={lastTicket} />}
				/>
				<Route path='/login' element={<Login show={show} setShow={setShow} login={handleLogin} />} />
				<Route path='/officer' element={<Officer popup={popup} setPopup={setPopup} />} />
				<Route path='/admin' element={<Admin services={services} setServices={setServices} deleteService={deleteService} createService={createService} />} />
				<Route path='/*' element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
