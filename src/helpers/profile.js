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

const updateEntries = async (userId) => {
    const token = window.sessionStorage.getItem('token');
    const response = await fetch("http://localhost:3000/image/", {
        method: "put",
        headers: {"Content-Type": "application/json", "Authorization": token},
        body: JSON.stringify({
            id: userId
        })
    });
    return response.json();
}

const getProfileUploadUrl = async (file) => {
    const response = await fetch(process.env.REACT_APP_IMAGE_UPLOAD_FUNCTION_URL, {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            fileName: file.name,
            fileType: file.type,
        })
    });
    return response.json();
};

const updateProfileImage = async (uploadUrl, file) => {
    const response = await fetch(uploadUrl, {
        method: "put",
        headers: {"Content-Type": file.type},
        body: file
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Upload failed ${response.status}: ${text}`);
    }

    return {
        status: "success"
    };
}

module.exports = {
    getProfile,
    updateProfile,
    updateEntries,
    updateProfileImage,
    getProfileUploadUrl
}