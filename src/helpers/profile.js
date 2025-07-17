const updateProfile = async (userId, data) => {
    const token = window.sessionStorage.getItem('token');
    const response = await fetch("http://localhost:3000/profile/" + userId, {
        method: "post",
        headers: {"Content-Type": "application/json", "Authorization": token},
        body: JSON.stringify(data)
    });
    return response.json();
};

const getProfile = async (userId) => {
    const token =  window.sessionStorage.getItem('token');
    const response = await fetch("http://localhost:3000/profile/" + userId, {
        method: "get",
        headers: {"Content-Type": "application/json", "Authorization": token}
    });
    return response.json();
};

module.exports = {
    getProfile,
    updateProfile
}