import 'bootstrap/dist/css/bootstrap.min.css';
import { Offcanvas, Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { useState } from 'react';

function ServiceOffcanvas(props) {
	const { show, setShow, service, counters, setCounters, time, setService, setTime } = props;

	const [selectedCounters, setSelectedCounters] = useState([]);

	function handleClose() {
		setShow(false);
	}

	function handleSubmit(event) {
		event.preventDefault();

		const newService = { time: time, type: service, counterList: selectedCounters.map((counter) => counter.id) };
		props.createService(newService);
		setShow(false);
	}

	function handleChange(selectedOptions) {
		setSelectedCounters(selectedOptions);
	}

	return (
		<Offcanvas show={show} onHide={handleClose}>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Add a new Service</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group className='mb-3' controlId='formServiceName'>
						<Form.Label>Service Name</Form.Label>
						<Form.Control required type='text' value={service} onChange={(event) => setService(event.target.value)} placeholder='Enter name' />
					</Form.Group>
					<Form.Group className='mb-3' controlId='formAverageTime'>
						<Form.Label>Average Time</Form.Label>
						<Form.Control
							required
							type='number'
							value={time}
							onChange={(event) => {
								const value = event.target.value;
								if (value >= 0) {
									setTime(value);
								}
							}}
							placeholder='Enter average time in seconds'
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='formCounterSelection'>
						<Form.Label>Select Counters</Form.Label>
						<Select required options={counters} isMulti='true' onChange={handleChange} />
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
