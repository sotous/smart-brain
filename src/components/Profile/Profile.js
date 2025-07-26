import React from 'react';
import './Profile.css';
import { updateProfile } from '../../helpers/profile';
import ProfileImage from './ProfileImage';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.user.name,
            age: this.props.user.age,
            pet: this.props.user.pet,
        }
    }

    onFormChange = (event) => {
        switch (event.target.name) {
            case 'user-name':
                this.setState({name: event.target.value});
                break;
            case 'user-age':
                this.setState({age: event.target.value});    
                break;
            case 'user-pet':
                this.setState({pet: event.target.value});
                break;
            default:
                return;
        }
    }

    onProfileUpdate = async (data) => {
        const response = await updateProfile(this.props.user.id, {formInput: data});
        if (response === "success") {
            this.props.loadUser({...this.props.user, ...data});
            this.props.toggleModal();
        }
    };

    render() {
        const { user, toggleModal } = this.props;
        const { name, age, pet } = this.state;
        return (
            <div className="profile-modal">
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
                    <main className="pa4 black-80 w-80">
                        <ProfileImage userId={user.id} />
                        <h1>{this.state.name}</h1>
                        <h4>Images Submitted: {user.entries}</h4>
                        <p>Member since: {new Date(user.joined).toLocaleDateString()}</p>
                        <hr />
                        <label className="mt2 fw6" htmlFor="name">Name:</label>
                        <input
                            onChange={this.onFormChange}
                            className="pa2 ba w-100"
                            placeholder={user.name}
                            type="text"
                            name="user-name"
                            id="name"
                        />
                        <label className="mt2 fw6" htmlFor="name">Age:</label>
                        <input
                            onChange={this.onFormChange}
                            className="pa2 ba w-100"
                            placeholder={user.age}
                            type="text"
                            name="user-age"
                            id="age"
                        />
                        <label className="mt2 fw6" htmlFor="name">Pet:</label>
                        <input
                            onChange={this.onFormChange}
                            className="pa2 ba w-100"
                            placeholder={user.pet}
                            type="text"
                            name="user-pet"
                            id="pet"
                        />
                        <div className='mt4' style={{display: 'flex', justifyContent: 'space-evenly'}}>
                            <button className='w-40 grow f4 link dim black ph3 pv2 mb2 dib' onClick={() => this.onProfileUpdate({name, age, pet})}>Save</button>   
                            <button className='w-40 grow f4 link dim black ph3 pv2 mb2 dib' onClick={toggleModal}>Cancel</button>
                        </div>
                    </main>
                    <div className="modal-close" onClick={toggleModal}>&times;</div>
                </article>
            </div>
        );
    };
};

export default Profile;