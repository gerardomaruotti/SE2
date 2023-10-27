import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Toast, ToastContainer } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import React from 'react';

function Home(props) {
	const popup = props.popup;
	const services = props.services;
	const requestTicket = props.requestTicket;
	const lastTicket = props.lastTicket;
	const colors = [
		{ col: 0, variant: 'outline-success' },
		{ col: 1, variant: 'outline-secondary' },
		{ col: 0, variant: 'outline-primary' },
		{ col: 1, variant: 'outline-danger' },
		{ col: 0, variant: 'outline-warning' },
		{ col: 1, variant: 'outline-info' },
	];

	useEffect(() => {
		if (lastTicket != 0) {
			props.setPopup(true);
		}
	}, [lastTicket]);

	return (
		<>
			<Container style={{ textAlign: 'center', marginTop: 100 }}>
				<Row style={{}}>
					<h1>PLease select a service</h1>
					{services.map((service, index) => (
						<Col key={service.id} md={{ span: 3, offset: colors[index % 6].col == 0 ? 3 : 0 }} style={{ marginTop: 34 }}>
							{service.counters.length > 0 ? (
								<Button
									size='lg'
									variant={colors[index % 6].variant}
									style={{ borderRadius: 50, height: 90, width: '100%' }}
									onClick={() => requestTicket(service.id)}
								>
									{service.type}
								</Button>
							) : (
								<Button
									size='lg'
									variant={colors[index % 6].variant}
									style={{ borderRadius: 50, height: 90, width: '100%' }}
									onClick={() => requestTicket(service.id)}
									disabled
								>
									{service.type}
								</Button>
							)}
						</Col>
					))}
				</Row>
			</Container>

			<ToastContainer position='top-end' className='p-3' style={{ zIndex: 1 }}>
				<Toast onClose={() => props.setPopup(false)} show={popup} delay={5000} autohide>
					<Toast.Header>
						<strong className='me-auto'>Service selected correctly</strong>
					</Toast.Header>
					<Toast.Body>Please, collect the ticket, Your number is {lastTicket}!</Toast.Body>
				</Toast>
			</ToastContainer>
		</>
	);
}

export default Home;
