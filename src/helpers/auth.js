const saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem('token', token);
};

const getAuthTokenFromSession = () => {
    return window.sessionStorage.getItem('token');
};

const removeAuthTokenFromSession = () => {
    window.sessionStorage.removeItem('token');
};

const register = async (email, password, name) => {
    const response = await fetch('http://localhost:3000/register', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password, name})
    });
    const data = await response.json();
    if (data.userId && data.success === true) {
        saveAuthTokenInSession(data.token);
        return data.userId;
    }
    return null;
};

const signIn = async (email, password) => {
    const response = await fetch('http://localhost:3000/signin', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    });
    const data = await response.json();
    if (data.userId && data.success === true) {
        saveAuthTokenInSession(data.token);
        return data.userId;
    }
    return null;
};

const isAuthenticated = async () => {
    const token = getAuthTokenFromSession();
    const response = await fetch('http://localhost:3000/signin', {
        method: 'post',
        headers: {'Content-Type': 'application/json', 'Authorization': token},
    });
    const data = await response.json();
    if (data.userId && data.success === true) {
        return data.userId;
    }
    return null;
};

module.exports = {
    removeAuthTokenFromSession,
    register,
    signIn,
    isAuthenticated
}