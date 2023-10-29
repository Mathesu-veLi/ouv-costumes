import './index.css';
import ouvLogo from '../../assets/ouvLogo.png';

import { Nav, Navbar } from 'react-bootstrap';

export default function Header() {
    return (
        <header>
            <Navbar expand="md" className="navbar py-4">
                <Navbar.Brand className="position-absolute fixed-top mx-5 h-100">
                    <img src={ouvLogo} alt="" width={120} />
                </Navbar.Brand>

                <Navbar.Toggle
                    className="ms-auto"
                    data-mdb-target="basic-nav"
                    aria-controls="basic-nav"
                    aria-expanded="false"
                    data-mdb-toggle="collapse"
                />
                <Navbar.Collapse id="basic-nav">
                    <Nav className="me-auto mx-auto nav pt-2">
                        <Nav.Link
                            className="px-5 m-0 btn-block text-center "
                            href="/"
                        >
                            Início
                        </Nav.Link>

                        <Nav.Link
                            className="px-5 m-0 btn-block text-center "
                            href="shop"
                        >
                            Comprar
                        </Nav.Link>

                        <Nav.Link
                            className="px-5 m-0 btn-block text-center "
                            href="contact"
                        >
                            Contato
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}
