import React, { Component } from "react";
import HelpBox from "./HelpBox";

class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHelp: false,
      phoneNumber: '',
      verificationCode: '',
      numSubs: this.props.numSubs,
      signedUp: false,
      confirmationScreen: false,
      question: 0,
    };

    this.showHelpBox = this.showHelpBox.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendVerificationText = this.sendVerificationText.bind(this);
    this.checkConfirmationCode = this.checkConfirmationCode.bind(this);
  }

  sendVerificationText() {
    this.setState({
      signedUp:true})
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber: this.state.value })
  };
  fetch('http://share-your-gig-dev.herokuapp.com/api/v1/subscribe/send-verification', requestOptions)
      .then(response => response.json())
      .then(data => {
        // this.setState({ postId: data.id });
          if(data.response === 'success'){
            this.setState({value: ''})
          }
        });
  }

  checkConfirmationCode() {
    this.setState({
      confirmationScreen:true,
    });
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        phoneNumber: this.state.phoneNumber,
        confirmationCode: this.state.value 
      })
  };
  fetch('http://share-your-gig-dev.herokuapp.com/api/v1/subscribe/verify', requestOptions)
      .then(response => response.json())
      .then(data => {
        // this.setState({ postId: data.id });
          if(data.response === 'success'){
            this.setState({value: ''})
          }
        });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  showHelpBox() {
    console.log(this.state.showHelp)
    this.setState({
      showHelp: true,
    });
  }



render(){
  let {signedUp, 
    numSubs, 
    confirmationScreen, 
    question,
    showHelp
  } = this.state;

  const contentStyle = {
    height:"90vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 40,
    paddingLeft:40,
    textAlign:"center"
  };

  return (
    <div style={contentStyle}>
      {confirmationScreen ?

<div>All done! 
Get ready for the upcoming missions!
<br></br>
<br></br>
Icon here</div>

:
      <div>
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ marginBottom: 0 }}>{numSubs}+</h2>
              subbed users

              <button onClick={this.showHelpBox}>?</button>
        {showHelp ?
           <HelpBox key={new Date()}/> :
           null
        }

            {signedUp ?
              <div className="helpCopy">
                `We sent a confirmation code to the number you provided.
              Please enter it below.`
              </div> 
            :
              <div className="helpCopy">
                `Every day, we’ll send a simple mission via text. Solve it and get a chance to get selected. If selected, you can send a text to everyone subscribed!`
              </div>
            }1
          </div>

      <div>
        <fieldset>
          <legend>{signedUp ? 'Confirmation Code' : 'Phone Number'}</legend>

          <input type="text" value={this.state.value || ''} onChange={this.handleChange} />
        </fieldset>
      </div>

    {signedUp ?
    <button onClick={this.checkConfirmationCode}>Confirm</button>
    :
    <button onClick={this.sendVerificationText}>Sign me up!</button>
    }
    </div>
    }
    </div>
  );
};
}



export default Help;