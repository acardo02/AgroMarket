export const loginService = async (username, password) => {
    const response = await fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({username, password})
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Authentication Error')
    } 

    return response.json()
}