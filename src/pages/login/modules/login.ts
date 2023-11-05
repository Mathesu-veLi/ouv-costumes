export async function login(email: string, password: string) {
    const user = await fetch('http://192.168.100.5:3000/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });

    if (user.status === 201) {
        return user.json().then((response) => response.user);
    }
    
    const userErrors = await user.json().then((response) => response.errors);

    throw userErrors;

}
