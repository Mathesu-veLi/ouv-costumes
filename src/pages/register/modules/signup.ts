import { isEmail } from 'validator';
import bcrypt from 'bcryptjs';

export function validate(name: string, email: string, password: string) {
    const formErrors: string[] = [];

    if (name.length < 3 || name.length > 255) {
        formErrors.push('Nome deve ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
        formErrors.push('Email inválido');
    }

    if (password.length < 6 || password.length > 50) {
        formErrors.push('Senha deve ter entre 6 e 50 caracteres');
    }

    return formErrors;
}

export async function signup(name: string, email: string, password: string) {
    const errors = validate(name, email, password);
    if (errors) throw errors;

    const encryptedPassword = bcrypt.hashSync(password, 8);

    const userData = {
        name,
        email,
        password: encryptedPassword,
    };

    const response = await fetch('http://192.168.100.5:3000/api/register', {
        method: 'POST',
        body: JSON.stringify(userData),
    });

    if (response.status === 201) {
        return 'Usuário cadastrado';
    }

    const userErrors = await response
        .json()
        .then((response) => response.errors);

    throw userErrors;
}
