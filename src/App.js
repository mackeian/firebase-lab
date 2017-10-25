import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import fire from './fire';
import firebase from 'firebase';

class App extends Component {

  constructor(props) {
    super();
    this.state = {
      currentUid: null,
      currentUser: null,
      authStatus: null
    };
  }

  componentDidMount() {
    const checkAuth = this._checkAuth.bind(this);
    checkAuth();
  }

  _checkAuth() {
    console.log('This:', this);
    this.setState({authStatus: 'CHECKING'});
    console.log('Checking auth...');
    console.log('Current user:', firebase.auth().currentUser);
    const state = this.state;
    const setState = this.setState.bind(this);


    firebase.auth().onAuthStateChanged(function(user) {
      // onAuthStateChanged listener triggers every time the user ID token changes.
      // This could happen when a new user signs in or signs out.
      // It could also happen when the current user ID token expires and is refreshed.
      if (user && user.uid != state.currentUid) {
       // Update the UI when a new user signs in.
       // Otherwise ignore if this is a token refresh.
       // Update the current user UID.
        console.log('Done - Logged in!', user);
        setState({authStatus: null, currentUid: user.uid, currentUser: user.email});

      } else {
       // Sign out operation. Reset the current user UID.
        console.log("no user signed in");
        setState({authStatus: null, currentUid: null, currentUser: null});

      }
    });
  }

  openSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  openLogOut() {
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

  saveUserData(email) {
    // Get a reference to the database service
    console.log('Saving data for userId:', this.state.currentUid);
    var database = firebase.database();
    firebase.database().ref('test_users/' + this.state.currentUid).set({
      email: this.state.currentUser,
      lastUpdated: new Date().toISOString()
    });
  }

  render() {
    if (this.state.authStatus === 'CHECKING') {
      return (<div className="App"><p>Checking auth...</p></div>);
    }
    if (this.state.currentUid) {
      return (<div className="App">
        <h2>Logged in {this.state.currentUser}!</h2>
        <button onClick={() => this.saveUserData('test@test.com')}>Save data</button>
        <button onClick={() => this.openLogOut()}>Sign out</button>
      </div>);
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <button onClick={() => this.openSignIn()}>SIGN IN</button>
      </div>
    );
  }
}

export default App;
