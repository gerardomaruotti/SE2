import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function MyNavbar() {
  const navigate = useNavigate();
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand style={{ width: '100%', textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>OfficeQueueManagement</Navbar.Brand>
        <Button variant="outline-primary" onClick={() => navigate('/login')}>Login</Button>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;