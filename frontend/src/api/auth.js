const API_URL = 'http://localhost:9000/api/v1/auth';

export const register = async (username, email, password) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
        credentials: 'include',
    });
    return response.json();
};

export const login = async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
    });
    return response.json();
};

export const getLoggedInUser = async () => {
    const response = await fetch(`${API_URL}/loggedin`, {
        method: 'GET',
        credentials: 'include',
    });
    console.log(response);
    return response.json();
};

export const logout = async () => {
    const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
    });
    return response.json();
};
