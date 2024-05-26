export const login = async (username:string, password: string) => {
    const loginCredentials = {
        username: username,
        password: password
    }
    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(loginCredentials) // Send login credentials as JSON in req.body
    
        });
        const data = await response.json()
        if (!response.ok) {
            // Data.error returns string, that consists of error
            return data.error
        }
        // Set token in localStorage
        localStorage.setItem("token", data.userData.token)
        
        return 
    } catch (error) {
        throw new Error('Operation failed!');
    }
}

