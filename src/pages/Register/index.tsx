import { Container } from 'react-bootstrap';
import { Form } from './styled.ts';
import './style.css';

export default function Register() {
    return (
        <Container
            fluid
            className="d-flex vh-100 justify-content-center flex-column align-items-center"
        >
            <div>
                <Form method="post" className="d-flex flex-column">
                    <h1 className="text-center">Register</h1>

                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Your name"
                    />

                    <label htmlFor="email" className="mt-3">
                        E-mail:
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="exemple@exemple.com"
                    />
                    
                    <label htmlFor="password" className="mt-3">
                        Password:
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password123"
                    />

                    <label htmlFor="confirmPassword" className="mt-3">
                        Confirm Password:
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="password123"
                    />
                </Form>
            </div>
        </Container>
    );
}
