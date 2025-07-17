const submitImageToServer = async (imageUrl) => {
    const response = await fetch('http://localhost:3000/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json', 'Authorization': window.sessionStorage.getItem('token')},
        body: JSON.stringify({
            input: imageUrl
        })
    })
    const data = await response.json();
    return data;
}

module.exports = {
    submitImageToServer
}