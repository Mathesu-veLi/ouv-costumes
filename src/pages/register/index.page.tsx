import React from 'react';
import { useState } from 'react';

import { Button, Container } from 'react-bootstrap';
import { Form } from './styled';
import './style.css';

import { register } from './modules/registerModules';

export default function Register() {
    const [userName, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Container
            fluid
            className="d-flex vh-100 justify-content-center flex-column align-items-center"
        >
            <div>
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        register(userName, email, password)
                    }}
                    method="post"
                    className="d-flex flex-column"
                >
                    <h1 className="text-center">Register</h1>

                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                    />

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
