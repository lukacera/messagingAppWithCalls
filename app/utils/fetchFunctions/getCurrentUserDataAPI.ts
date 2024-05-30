export const getCurrentUserData = async () => {    
    try {
        const response = await fetch("/api/users/myProfile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }        
        });

        const data: any = await response.json();

        console.log(data)
        if (!response.ok) {
            return data.error ?? 'An unknown error occurred';
        }
        return data.data // Returns data about currentUser
            
    } catch (error) {
        throw new Error('Operation failed!');
    }
};