export const getCurrentUserData = async () => {    
    try {
        const response = await fetch("/api/users/myProfile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }        
        });

        const data: any = await response.json();

        if (!response.ok) {
            return data.error ?? 'An unknown error occurred';
        }

       return data.data // Returns data about currentUser
        
    } catch (error) {
        console.error('Error during login:', error);
        throw new Error('Operation failed!');
    }
};