import { Button, Container } from 'react-bootstrap';
import { Form } from './styled';
import './style.css';

import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '@/store/user/actions';

import { login } from './modules/login';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();
    const dispatch = useDispatch();

    return (
        <Container
            fluid
            className="d-flex vh-100 justify-content-center flex-column align-items-center"
        >
            <div>
                <Form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        await login(email, password).then((newUser) => {
                            if (newUser) {
                                dispatch(
                                    loginSuccess({
                                        user: {
                                            id: newUser.id,
                                            email,
                                        },

                                        accessToken: newUser.accessToken,
                                    }),
                                );
                            }
                        });
                        router.push('/');
                    }}
                    method="post"
                    className="d-flex flex-column"
                >
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
