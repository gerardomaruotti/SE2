import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Alert, Container } from 'react-bootstrap';

function Login(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [errorMessage, setErrorMessage] = useState('');
	const show = props.show;

	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		const credentials = { username, password };

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
				<Col md={5}>
					<h1 className='pb-3'>Log in to your account</h1>
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
						<div className="d-grid">
							<Button type='submit'>Login</Button>
						</div>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}

export default Login;
