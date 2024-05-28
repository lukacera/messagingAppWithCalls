import {jwtDecode} from 'jwt-decode';

export const login = async (username: string, password: string): Promise<string | void> => {
    const loginCredentials = {
        username: username,
        password: password
    };
    
    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginCredentials)
        });

        const data: any = await response.json();

        if (!response.ok) {
            return data.error ?? 'An unknown error occurred';
        }

        const { token } = data.userData;
        localStorage.setItem("token", token);

        // Optional: Decode token and check expiry on client side
        const decodedToken:any = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
            throw new Error('Token has expired');
        }
    } catch (error) {
        console.error('Error during login:', error);
        throw new Error('Operation failed!');
    }
};