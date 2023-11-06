import './index.css';
import ouvLogo from '@/assets/ouvLogo.png';
import Image from 'next/image';
import Link from 'next/link';

import { Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from 'react-redux';

export default function Header() {
    const { isLoggedIn } = useSelector(
        (rootReducer: {
            userReducer: {
                isLoggedIn: boolean;
            };
        }) => rootReducer.userReducer,
    );

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
                        <div>
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
                        </div>

                        {!isLoggedIn && (
                            <div>
                                <Link
                                    className="px-4 m-0 btn-block text-center "
                                    href="/login"
                                >
                                    Login
                                </Link>
                                <Link
                                    className="px-4 m-0 btn-block text-center "
                                    href="/register"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
                {isLoggedIn && (
                    <Link href="/cart" id="icon">
                        <FontAwesomeIcon icon={faCartShopping} size="xl" />
                    </Link>
                )}
            </Navbar>
        </header>
    );
}
