import { toast } from 'react-toastify';
import { isEmail } from 'validator';

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

export function register(name: string, email: string, password: string) {
    const errors = validate(name, email, password);
    if (!errors) return;
}
