import React from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';

class ProfileIcon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        return (
            <div className="pa4 tc">
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} direction="down">
                    <DropdownToggle
                        data-toggle="dropdown"
                        tag="span"
                    >
                        <img src="https://www.shutterstock.com/image-vector/vector-male-face-avatar-logo-600nw-426321556.jpg" className="br-100 h3 w3 dib" alt="avatar"/>
                    </DropdownToggle>
                    <DropdownMenu 
                        className="b--transparent shadow-5" 
                        style={{marginTop: '20px', backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
                        <DropdownItem onClick={this.props.toggleModal}>View Profile</DropdownItem>
                        <DropdownItem onClick={() => this.props.onRouteChange('signout')}>Sign Out</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }
}

export default ProfileIcon;