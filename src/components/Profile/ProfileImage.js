import React, { useRef } from 'react';
import './ProfileImage.css';

const ProfileImage = () => {
    const fileInputRef = useRef(null);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append("profileImage", file);
        }
    };

    return (
        <div className="profile-image-container" onClick={handleImageClick}>
            <img src="https://www.shutterstock.com/image-vector/vector-male-face-avatar-logo-600nw-426321556.jpg" className="br-100 h3 w3 dib" alt="avatar"/>
            <div className="pencil-overlay">
                <i className="fa fa-pencil"></i>
            </div>
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                style={{ display: 'none' }} 
                accept="image/*"
            />
        </div>
    );
};

export default ProfileImage; 