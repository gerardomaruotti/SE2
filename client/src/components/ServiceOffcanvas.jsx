import 'bootstrap/dist/css/bootstrap.min.css';
import { Offcanvas, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import Select from 'react-select';

function ServiceOffcanvas(props) {
	const show = props.show;
	const [service, setService] = useState('');
	const [counters, setCounters] = useState([]);
	function handleClose() {
		props.setShow(false);
		setService('');
		setCounters([]);
	}

	function handleSubmit(event) {
		event.preventDefault();
		props.setShow(false);
		setService('');
		setCounters([]);
	}

	const counterslist = [
		{ value: 1, label: 'Counter 1' },
		{ value: 2, label: 'Counter 2' },
		{ value: 3, label: 'Counter 3' },
	];

	return (
		<Offcanvas show={show} onHide={handleClose}>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Add a new Service</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group className='mb-3' controlId='formServiceName'>
						<Form.Label>Service Name</Form.Label>
						<Form.Control type='text' value={service} onChange={(event) => setService(event.target.value)} placeholder='Enter name' />
					</Form.Group>
					<Form.Group className='mb-3' controlId='formCounterSelection'>
						<Form.Label>Select Counters</Form.Label>
						<Select options={counterslist} isMulti='true' />
					</Form.Group>
					<div className='d-grid'>
						<Button variant='primary' type='submit'>
							Create Service
						</Button>
					</div>
				</Form>
			</Offcanvas.Body>
		</Offcanvas>
	);
}

export default ServiceOffcanvas;
