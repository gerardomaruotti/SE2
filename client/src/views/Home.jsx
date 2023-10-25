import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Toast, ToastContainer } from 'react-bootstrap';
import React from 'react';

function Home(props) {
	const popup = props.popup;

	return (
		<>
			<Container style={{ textAlign: 'center', marginTop: 100 }}>
				<Row style={{ marginTop: 34 }}>
					<Col md={{ span: 3, offset: 3 }}>
						<Button size='lg' variant='outline-success' style={{ borderRadius: 50, height: 90, width: '100%' }} onClick={() => props.setPopup(true)}>
							Servizio 1
						</Button>
					</Col>
					<Col md={3}>
						<Button
							size='lg'
							variant='outline-secondary'
							style={{ borderRadius: 50, height: 90, width: '100%' }}
							onClick={() => props.setPopup(true)}
						>
							Servizio 2
						</Button>
					</Col>
				</Row>
				<Row style={{ marginTop: 34 }}>
					<Col md={{ span: 3, offset: 3 }}>
						<Button size='lg' variant='outline-primary' style={{ borderRadius: 50, height: 90, width: '100%' }} onClick={() => props.setPopup(true)}>
							Servizio 1
						</Button>
					</Col>
					<Col md={3}>
						<Button size='lg' variant='outline-danger' style={{ borderRadius: 50, height: 90, width: '100%' }} onClick={() => props.setPopup(true)}>
							Servizio 2
						</Button>
					</Col>
				</Row>
				<Row style={{ marginTop: 34 }}>
					<Col md={{ span: 3, offset: 3 }}>
						<Button size='lg' variant='outline-warning' style={{ borderRadius: 50, height: 90, width: '100%' }} onClick={() => props.setPopup(true)}>
							Servizio 1
						</Button>
					</Col>
					<Col md={3}>
						<Button size='lg' variant='outline-info' style={{ borderRadius: 50, height: 90, width: '100%' }} onClick={() => props.setPopup(true)}>
							Servizio 2
						</Button>
					</Col>
				</Row>
			</Container>

			<ToastContainer position='top-end' className='p-3' style={{ zIndex: 1 }}>
				<Toast onClose={() => props.setPopup(false)} show={popup} delay={5000} autohide>
					<Toast.Header>
						<strong className='me-auto'>service selected correctly</strong>
					</Toast.Header>
					<Toast.Body>Please, collect the ticket!</Toast.Body>
				</Toast>
			</ToastContainer>
		</>
	);
}

export default Home;
