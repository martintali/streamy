import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '938988506492-f7kgnvgv4cas6vn24s8p79aneqqli24h.apps.googleusercontent.com',
        scope: 'email',
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();

        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui button red google" onClick={this.onSignOutClick}>
          <i className="google icon" />
          Sign out
        </button>
      );
    } else {
      return (
        <button className="ui button red google" onClick={this.onSignInClick}>
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderAuthButton()}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
}

export default connect(mapStateToProps, {
  signIn,
  signOut
})(GoogleAuth);