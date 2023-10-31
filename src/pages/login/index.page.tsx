import { Container } from 'react-bootstrap';
import { Form } from './styled.ts';
import './style.css';

export default function Login() {
    return (
        <Container
            fluid
            className="d-flex vh-100 justify-content-center flex-column align-items-center"
        >
            <div>
                <Form method="post" className="d-flex flex-column">
                    <h1 className="text-center">Login</h1>
                    <label htmlFor="email">E-mail:</label>
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
                </Form>
            </div>
        </Container>
    );
}
