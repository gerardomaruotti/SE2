import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, Toast, ToastContainer } from 'react-bootstrap';

function Officer(props) {
	const popup = props.popup;
	return (
		<>
			<Container style={{ textAlign: 'center', marginTop: 400 }}>
				<Row style={{ marginTop: 34, marginLeft: 300, marginRight: 300 }}>
					<Button size='lg' variant='outline-primary' style={{ borderRadius: 50, height: 90 }} onClick={() => props.setPopup(true)}>
						Call Next
					</Button>
				</Row>
			</Container>

			<ToastContainer position='top-end' className='p-3' style={{ zIndex: 1 }}>
				<Toast onClose={() => props.setPopup(false)} show={popup} delay={5000} autohide>
					<Toast.Header>
						<strong className='me-auto'>Next client has been called</strong>
					</Toast.Header>
					<Toast.Body>The ticket code is: </Toast.Body>
				</Toast>
			</ToastContainer>
		</>
	);
}

export default Officer;
