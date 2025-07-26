import React from 'react';
import './ProfileImage.css';
import { updateProfileImage } from '../../helpers/profile';

class ProfileImage extends React.Component {
    constructor(props) {
        super(props);
        this.fileInputRef = React.createRef();
    }

    handleImageClick = () => {
        this.fileInputRef.current.click();
    };

    handleFileChange = async (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append("profileImage", file);
            const response = await updateProfileImage(this.props.userId, formData);
            console.log(response);
        }
    };

    render() {
        return (
        <div className="profile-image-container" onClick={this.handleImageClick}>
            <img src="https://www.shutterstock.com/image-vector/vector-male-face-avatar-logo-600nw-426321556.jpg" className="br-100 h3 w3 dib" alt="avatar"/>
            <div className="pencil-overlay">
                <i className="fa fa-pencil"></i>
            </div>
            <input 
                type="file" 
                ref={this.fileInputRef} 
                onChange={this.handleFileChange} 
                style={{ display: 'none' }} 
                accept="image/*"
            />
        </div>
        );
    }
}

export default ProfileImage; 