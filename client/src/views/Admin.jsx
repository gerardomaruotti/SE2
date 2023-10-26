import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Row, Col, Button, Container } from 'react-bootstrap';
import ServiceOffcanvas from '../components/ServiceOffcanvas';
import { useEffect, useState } from 'react';
import API from '../API';

function Admin(props) {
	const [showOffcanvas, setShowOffcanvas] = useState(false);
	const [service, setService] = useState('');
	const [counters, setCounters] = useState([]);
	const [time, setTime] = useState(1);
	const deleteService = props.deleteService;

	useEffect(() => {
		API.getCounters()
			.then((counters) => {
				counters.map((counter) => {
					counter.value = counter.id;
					counter.label = 'Counter ' + counter.id;
				});
				setCounters(counters);
			})
			.catch((err) => handleError(err));
	}, []);

	return (
		<>
			<Container>
				<Row style={{ marginTop: 100 }}>
					<Col md={{ span: 8, offset: 2 }}>
						<Table hover size='sm'>
							<thead>
								<tr>
									<th>Service</th>
									<th style={{ textAlign: 'center' }}>Counters</th>
									<th style={{ textAlign: 'center' }}>Average time</th>
									<th></th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{props.services.map((service) => (
									<tr key={service.id}>
										<td>{service.type}</td>
										{service.counters.length > 0 ? (
											<td style={{ textAlign: 'center' }}>{service.counters.map((counter) => counter.id_counter + ' ')}</td>
										) : (
											<td style={{ textAlign: 'center' }}>/</td>
										)}
										<td style={{ textAlign: 'center' }}>{service.time}</td>
										<td key={service.id} style={{ textAlign: 'right' }}>
											<Button
												size='sm'
												variant='outline-danger'
												style={{ borderRadius: 20, width: 50, display: 'inline-block', marginRight: 10 }}
												onClick={() => deleteService(service.id)}
											>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='16'
													height='16'
													fill='currentColor'
													className='bi bi-trash'
													viewBox='0 0 16 16'
												>
													<path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z' />
													<path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z' />
												</svg>
											</Button>

											{/* <Button
												size='sm'
												variant='outline-primary'
												style={{ borderRadius: 20, width: 50, display: 'inline-block', marginRight: 10 }}
												onClick={() => setShowOffcanvas(true)}
											>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='16'
													height='16'
													fill='currentColor'
													className='bi bi-pencil-fill'
													viewBox='0 0 16 16'
												>
													<path d='M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z' />
												</svg>
											</Button> */}
										</td>
									</tr>
								))}
								{/* <tr>
									<td>Servizio 1</td>
									<td style={{ textAlign: 'center' }}>2</td>
									<td style={{ textAlign: 'center' }}>5</td>
									<td style={{ textAlign: 'right' }}>
										<Button size='sm' variant='outline-danger' style={{ borderRadius: 20, width: 50, display: 'inline-block', marginRight: 10 }}>
											<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-trash' viewBox='0 0 16 16'>
												<path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z' />
												<path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z' />
											</svg>
										</Button>

										<Button size='sm' variant='outline-primary' style={{ borderRadius: 20, width: 50, display: 'inline-block', marginRight: 10 }}>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												width='16'
												height='16'
												fill='currentColor'
												className='bi bi-pencil-fill'
												viewBox='0 0 16 16'
											>
												<path d='M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z' />
											</svg>
										</Button>
									</td>
								</tr> */}
							</tbody>
						</Table>
					</Col>
				</Row>
				<Button
					size='lg'
					variant='primary'
					style={{ position: 'absolute', bottom: 50, right: 50, borderRadius: 100 }}
					onClick={() => setShowOffcanvas(true)}
				>
					+
				</Button>
			</Container>
			<ServiceOffcanvas
				show={showOffcanvas}
				setShow={setShowOffcanvas}
				service={service}
				counters={counters}
				time={time}
				setService={setService}
				setCounters={setCounters}
				setTime={setTime}
				createService={props.createService}
			/>
		</>
	);
}

export default Admin;
