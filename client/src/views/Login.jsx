import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Alert, Container } from 'react-bootstrap';

function Login(props) {
	const [username, setUsername] = useState('admin@polito.it');
	const [password, setPassword] = useState('òashfaosufhlaisfhlakushfg');

	const [errorMessage, setErrorMessage] = useState('');
	const show = props.show;

	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		const credentials = { username, password };
		props.login();
		navigate('/admin');
		// props
		// 	.login(credentials)
		// 	.then(() => navigate('/'))
		// 	.catch((err) => {
		// 		setErrorMessage(err.error);
		// 		setShow(true);
		// 	});
	};

	return (
		<Container>
			<Row className='justify-content-md-center mt-5'>
				<Col>
					<Button onClick={() => navigate('/')}>
						<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-arrow-left' viewBox='0 0 16 16'>
							<path
								fill-rule='evenodd'
								d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z'
							/>
						</svg>
					</Button>
				</Col>
				<Col md={5}>
					<h1 className='pb-3' style={{ textAlign: 'center' }}>
						Log in to your account
					</h1>
					<Form onSubmit={handleSubmit}>
						<Alert dismissible show={show} onClose={() => props.setShow(false)} variant='danger'>
							{errorMessage}
						</Alert>
						<Form.Group className='mb-3' controlId='username'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type='email'
								value={username}
								placeholder='name@polito.it'
								onChange={(ev) => setUsername(ev.target.value)}
								required={true}
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								value={password}
								placeholder='Enter password'
								onChange={(ev) => setPassword(ev.target.value)}
								required={true}
								minLength={6}
							/>
						</Form.Group>
						<div className='d-grid'>
							<Button type='submit'>Login</Button>
						</div>
					</Form>
				</Col>
				<Col></Col>
			</Row>
		</Container>
	);
}

export default Login;
