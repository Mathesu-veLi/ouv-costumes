import { useState } from 'react';

import { Button, Container } from 'react-bootstrap';
import { Form } from './styled.ts';
import './style.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Container
            fluid
            className="d-flex vh-100 justify-content-center flex-column align-items-center"
        >
            <div>
                <Form method="post" className="d-flex flex-column">
                    <h1 className="text-center">Login</h1>

                    <label htmlFor="email" className="mt-3">
                        E-mail:
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="exemple@exemple.com"
                    />

                    <label htmlFor="password" className="mt-3">
                        Password:
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password123"
                    />
                    
                    <Button type="submit" className="mt-4">
                        Register
                    </Button>
                </Form>
            </div>
        </Container>
    );
}
