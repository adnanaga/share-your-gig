import React, { Component } from 'react';
import HelpBox from './HelpBox';

class Help extends Component {
  constructor(props) {
    super(props);
    const { numSubs } = this.props;
    this.state = {
      showHelp: false,
      phoneNumber: '',
      numSubs,
      signedUp: false,
      confirmationScreen: false,
    };

    this.showHelpBox = this.showHelpBox.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendVerificationText = this.sendVerificationText.bind(this);
    this.checkConfirmationCode = this.checkConfirmationCode.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  checkConfirmationCode() {
    this.setState({
      confirmationScreen: true,
    });

    const { phoneNumber, value } = this.state;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phoneNumber,
        confirmationCode: value,
      }),
    };
    fetch('http://share-your-gig-dev.herokuapp.com/api/v1/subscribe/verify', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // this.setState({ postId: data.id });
        if (data.response === 'success') {
          this.setState({ value: '' });
        }
      });
  }

  sendVerificationText() {
    const { value } = this.state;
    this.setState({ signedUp: true });
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber: value }),
    };
    fetch('http://share-your-gig-dev.herokuapp.com/api/v1/subscribe/send-verification', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // this.setState({ postId: data.id });
        if (data.response === 'success') {
          this.setState({ value: '' });
        }
      });
  }

  showHelpBox() {
    // console.log(showHelp);
    this.setState({
      showHelp: true,
    });
  }

  render() {
    const {
      signedUp,
      numSubs,
      confirmationScreen,
      showHelp,
      value,
    } = this.state;

    const contentStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: 40,
      paddingLeft: 40,
      textAlign: 'center',
    };

    return (
      <div style={contentStyle}>
        {confirmationScreen

          ? (
            <div>
              All done!
              Get ready for the upcoming missions!
              <br />
              <br />
              Icon here

            </div>
          )

          : (
            <div style={{ margin: '15%' }}>
              <div style={{ marginBottom: 40 }}>
                <div style={{ fontSize: '40px' }}>
                  {numSubs}
                  +
                </div>
                <div style={{ fontSize: '12px' }}>
                  subbed users
                </div>
                <button
                  type="button"
                  onClick={this.showHelpBox}
                  style={{
                    width: '100%',
                    textAlign: 'right',
                  }}
                >
                  ?
                </button>
                {showHelp
                  ? <HelpBox key={new Date()} />
                  : null}

                {signedUp
                  ? (
                    <div className="helpCopy">
                      We sent a confirmation code to the number you provided.
                      Please enter it below.
                    </div>
                  )
                  : (
                    <div className="helpCopy">
                      Every day, we’ll send a simple mission via text.
                      Solve it and get a chance to get selected.
                      If selected, you can send a text to everyone subscribed!
                    </div>
                  )}
              </div>

              <div>
                <fieldset>
                  <legend>{signedUp ? 'Confirmation Code' : 'Phone Number'}</legend>

                  <input type="text" value={value || ''} onChange={this.handleChange} />
                </fieldset>
              </div>

              {signedUp
                ? <button type="button" onClick={this.checkConfirmationCode}>Confirm</button>
                : <button type="button" onClick={this.sendVerificationText}>Sign me up!</button>}
            </div>
          )}
      </div>
    );
  }
}

export default Help;
