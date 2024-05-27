export const register = async (username:string, password: string) => {
    const registrationCredentials = {
        username: username,
        password: password
    }
    try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(registrationCredentials) // Send reg credentials as JSON in req.body
    
        });

        const data = await response.json()

        if (!response.ok) {
            // Data.error returns string, that consists of error
            return data.error
        }

    } catch (error) {
        throw new Error('Operation failed!');
    }
}

