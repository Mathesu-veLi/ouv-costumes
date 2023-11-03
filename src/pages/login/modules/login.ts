import { toast } from 'react-toastify';

export async function login(email: string, password: string) {
    const user = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });

    if (user.status === 201) {
        toast.success('Login efetuado com sucesso');
        return user.json().then((response) => response.user);
    }

    toast.error(await user.json().then((response) => response.errors));
}
