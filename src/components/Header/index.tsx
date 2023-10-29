import './index.css';
import ouvLogo from '../../assets/ouvLogo.png';

import { Nav, Navbar } from 'react-bootstrap';

export default function Header() {
    return (
        <Navbar expand="lg" className="navbar">
            <Navbar.Brand className="position-absolute">
                <img src={ouvLogo} alt="" width={180} className='mx-5'/>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto mx-auto nav">
                    <Nav.Link className="px-5" href='/'>Início</Nav.Link>
                    <Nav.Link className="px-5" href='shop'>Comprar</Nav.Link>
                    <Nav.Link className="px-5" href='contact'>Contato</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
