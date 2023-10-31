import './index.css';
import ouvLogo from '@/assets/ouvLogo.png';
import Image from 'next/image';
import Link from 'next/link';

import { Nav, Navbar } from 'react-bootstrap';

export default function Header() {
    return (
        <header>
            <Navbar expand="md" className="navbar py-4">
                <Navbar.Brand className="position-absolute mx-5 h-100">
                    <Image src={ouvLogo} alt="" width={120} />
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
                        <Link
                            className="px-5 m-0 btn-block text-center "
                            href="/"
                        >
                            Início
                        </Link>

                        <Link
                            className="px-5 m-0 btn-block text-center "
                            href="/shop"
                        >
                            Comprar
                        </Link>

                        <Link
                            className="px-5 m-0 btn-block text-center "
                            href="/contact"
                        >
                            Contato
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}
