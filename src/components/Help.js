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
    this.setState({ value: event.target.value, showHelp: false });
  }

  checkConfirmationCode() {
    const { phoneNumber, value } = this.state;
    if (value === undefined) {
      console.log('no confirmation code');
    } else {
      this.setState({
        confirmationScreen: true,
      });

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
          console.log(requestOptions)
        // this.setState({ postId: data.id });
          if (data.response === 'success') {
            this.setState({ value: '' });
          } else {
            // error out here
          }
        }).catch((err) => {
          console.log(err);
        });
    }
  }

  sendVerificationText() {
    const { value } = this.state;

    if (value === undefined) {
      // should error here
      console.log('undefiend');
    } else {
      this.setState({ signedUp: true, phoneNumber: value });
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
            this.setState({ signedUp: true, value: '' });
          } else {
            // error out here
            console.log('error with number');
          }
        }).catch((err) => {
          console.log(err);
        });
    }
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

    const subbedUsers = (
      <div>
        {numSubs}
        +
        <div style={{ fontSize: '12px' }}>
          subbed users
        </div>
      </div>
    );

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
                  {numSubs
                    ? subbedUsers
                    : ''}
                </div>
                <button
                  type="button"
                  onClick={this.showHelpBox}
                  className="questionButton"
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

                  <input className="numberInput" type="text" value={value || ''} onChange={this.handleChange} />
                </fieldset>
              </div>

              {signedUp
                ? (
                  <button
                    style={{
                      padding: '10px 20px', marginTop: '10px', backgroundColor: '#282A37', color: '#FFFFFF', borderRadius: '35px',
                    }}
                    type="button"
                    onClick={this.checkConfirmationCode}
                  >
                    Confirm
                  </button>
                )
                : (
                  <button
                    style={{
                      padding: '10px 20px', marginTop: '10px', backgroundColor: '#282A37', color: '#FFFFFF', borderRadius: '35px',
                    }}
                    type="button"
                    onClick={this.sendVerificationText}
                  >
                    Sign me up!
                  </button>
                )}
            </div>
          )}
      </div>
    );
  }
}

export default Help;
