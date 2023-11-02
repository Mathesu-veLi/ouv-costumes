import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import bcrypt from 'bcryptjs';


export function validate(name: string, email: string, password: string) {
    let formErrors = false;

    if (name.length < 3 || name.length > 255) {
        formErrors = true;
        toast.error('Nome deve ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
        formErrors = true;
        toast.error('Email inválido');
    }

    if (password.length < 6 || password.length > 50) {
        formErrors = true;
        toast.error('Senha deve ter entre 6 e 50 caracteres');
    }

    return formErrors;
}

export async function signup(name: string, email: string, password: string) {
    const errors = validate(name, email, password);
    if (errors) return;

    const encryptedPassword = bcrypt.hashSync(password, 8);

    const userData = {
        name,
        email,
        password: encryptedPassword,
    };

    const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        body: JSON.stringify(userData),
    });

    if (response.status === 201) {
        return toast.success('Usuário cadastrado');
    }

    toast.error(await response.json().then((response) => response.errors));
}
