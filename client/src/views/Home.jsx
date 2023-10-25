import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Toast, ToastContainer } from 'react-bootstrap';
import React from 'react';

function Home(props) {
	const popup = props.popup;
	const services = props.services;
	const colors = [{ col: 0, variant: 'outline-success' }, { col: 1, variant: 'outline-secondary' },
	{ col: 0, variant: 'outline-primary' }, { col: 1, variant: 'outline-danger' },
	{ col: 0, variant: 'outline-warning' }, { col: 1, variant: 'outline-info' }]

	return (
		<>
			<Container style={{ textAlign: 'center', marginTop: 100 }}>
				<Row style={{}}>
					{services.map((service, index) =>
						<Col key={service.id} md={{ span: 3, offset: colors[index % 6].col == 0 ? 3 : 0 }} style={{ marginTop: 34 }}>
							<Button size='lg' variant={colors[index % 6].variant} style={{ borderRadius: 50, height: 90, width: '100%' }} onClick={() => props.setPopup(true)}>
								{service.type}
							</Button>
						</Col>
					)}
				</Row>
			</Container>

			<ToastContainer position='top-end' className='p-3' style={{ zIndex: 1 }}>
				<Toast onClose={() => props.setPopup(false)} show={popup} delay={5000} autohide>
					<Toast.Header>
						<strong className='me-auto'>Service selected correctly</strong>
					</Toast.Header>
					<Toast.Body>Please, collect the ticket!</Toast.Body>
				</Toast>
			</ToastContainer>
		</>
	);
}

export default Home;
