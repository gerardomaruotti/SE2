import 'bootstrap/dist/css/bootstrap.min.css';
import { Offcanvas } from 'react-bootstrap';

function ServiceOffcanvas(props) {
	const show = props.show;
	function handleClose() {
		props.setShow(false);
	}

	return (
		<Offcanvas show={show} onHide={handleClose} backdrop='static'>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Offcanvas</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
			</Offcanvas.Body>
		</Offcanvas>
	);
}

export default ServiceOffcanvas;
