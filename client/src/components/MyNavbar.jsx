import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function MyNavbar(props) {
	const navigate = useNavigate();
	return (
		<Navbar className='bg-body-tertiary'>
			<Container>
				<Navbar.Brand style={{ width: '100%', textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
					OfficeQueueManagement
				</Navbar.Brand>
				{props.loggedIn ? (
					<Button variant='outline-danger' onClick={props.logout}>
						Logout
					</Button>
				) : (
					<Button variant='outline-primary' onClick={() => navigate('/login')}>
						Login
					</Button>
				)}
			</Container>
		</Navbar>
	);
}

export default MyNavbar;
