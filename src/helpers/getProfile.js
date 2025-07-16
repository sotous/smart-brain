const getProfile = async (userId) => {
    const token =  window.sessionStorage.getItem('token');
    const response = await fetch("http://localhost:3000/profile/" + userId, {
        method: "get",
        headers: {"Content-Type": "application/json", "Authorization": token}
    });
    return response.json();
};

export default getProfile;