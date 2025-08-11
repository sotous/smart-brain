import React, { Component } from 'react';
// import Particles from 'react-particles-js'; 
import ParticlesBg from 'particles-bg'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile';
import { getProfile, updateEntries } from './helpers/profile';
import { isAuthenticated, removeAuthTokenFromSession } from './helpers/auth';
import './App.css';
import { uploadImage } from './helpers/uploadImage';

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    pet: '',
    age: '',
    profilePic: ''
  }
}


class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    isAuthenticated()
      .then(async userId => {
        if (userId) {
          const profile = await getProfile(userId);
          if (profile && profile.email) {
            this.loadUser(profile);
            this.onRouteChange('home');
          }
        }
      })
      .catch(console.log)
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
      pet: data.pet,
      age: data.age
    }})
  }

  calculateFaceLocations = (data) => {
    if (data && data.outputs) {
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);

      const boxes = data.outputs[0].data.regions.map(face => {
        return {
          leftCol: face.region_info.bounding_box.left_col * width,
          topRow: face.region_info.bounding_box.top_row * height,
          rightCol: width - (face.region_info.bounding_box.right_col * width),
          bottomRow: height - (face.region_info.bounding_box.bottom_row * height)
        }
      });
      return boxes;
    }
    return [];
  }

  displayFaceBoxes = (boxes) => {
    this.setState({boxes: boxes});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = async () => {
    this.setState({imageUrl: this.state.input});
    const uploadedImage = await uploadImage(this.state.input);
    if (uploadedImage) {
      const updatedEntries = await updateEntries(this.state.user.id);
      this.setState(Object.assign(this.state.user, { entries: updatedEntries}))
      this.displayFaceBoxes(this.calculateFaceLocations(uploadedImage))
    }
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      removeAuthTokenFromSession();
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  toggleModal = () => {
    this.setState(prevState => ({...prevState, isProfileOpen: !prevState.isProfileOpen}));
  }

  render() {
    const { isSignedIn, imageUrl, route, boxes, isProfileOpen, user } = this.state;
    const isTransient = route === 'signin' || route === 'signout';
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation 
          isSignedIn={isSignedIn} 
          onRouteChange={this.onRouteChange} 
          toggleModal={this.toggleModal}
          profilePic={user.profilePic}
        />
        {isProfileOpen && (
          <Modal>
            <Profile isProfileOpen={isProfileOpen} toggleModal={this.toggleModal} user={user} loadUser={this.loadUser}/>
          </Modal>
        )}
        { route === 'home' && (
           <div>
              <Logo />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
            </div>
          )
        }
        { isTransient && (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )}
        { route === 'register' && (
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )}
      </div>
    );
  }
}

export default App;
