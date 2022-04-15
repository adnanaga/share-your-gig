import React, { Component } from "react";

class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numSubs: this.props.numSubs,
      signedUp: false,
      confirmationScreen: false,
      question: false,
    };
  }


render(){
  const {signedUp, numSubs, confirmationScreen, question} = this.state;
  let helpSection = "";
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

  if(question === 1){
    helpSection = (
<div className="greyout">
      <div className="whiteBox">
         <div>
                <div className="helpNumber">1.</div>
                <div>A simple mission will be sent to your phone at a random time every day. For example, it might get sent at 8:00am on Tuesday and 9:00pm on Wednesday.</div>

                <div>
                <br></br>
                Here are some examples of missions:
                <br></br>
                <b>8th person to click a button</b>
                <br></br>
                <b>speak a phrase</b>
                <br></br>
                <b>wave to the camera</b>
                <br></br>
                <b>trivia question</b>
                ...</div>
                <div>
 {/* Arrow functions here */}
                <button onClick={() => this.setState({question:0})}> Left Arrow</button>
                <button onClick={() => this.setState({question:question+1})}> Right Arrow</button>
                </div>
          </div>

      </div>
      </div>
    )
  } else if(question === 2){
    helpSection = (
<div className="greyout">
      <div className="whiteBox">
         <div>
                <div className="helpNumber">2.</div>

                    <div>When you succesfully complete the mission, you’ll be told whether you are the selected winner for that day. If you are selected, you’ll be allowed to send a 280-character text message to all subscribers.</div>
<div>
Please be mindful of the message you send. If you wouldn’t send that message to your friends and family, don’t send it.
</div>

<div>

            {/* Arrow functions here */}
            <button onClick={() => this.setState({question:question-1})}> Left Arrow</button>
                <button onClick={() => this.setState({question:question+1})}> Right Arrow</button>

                </div>
                  </div>
                  </div>
                  </div>
    )
      } else if(question === 3){
        helpSection = (
<div className="greyout">
      <div className="whiteBox">
         <div>
                <div className="helpNumber">3.</div>
         <div>24 hours after you send the message, we’ll text you some informative data:
           <li>How many users your message was sent to.</li>
           <li>How many users opened your link, if one was specified.</li>
           <li>How many users liked your message.</li>
           </div>
            {/* Arrow functions here */}
            <button onClick={() => this.setState({question:question-1})}> Left Arrow</button>
                <button onClick={() => this.setState({question:question+1})}> Right Arrow</button>

       </div>
     </div>
     </div>
        )
          } else if(question === 4){
            helpSection = (
        <div className="greyout">
              <div className="whiteBox">
                <div>
                <div className="helpNumber">4.</div>
                <div>If you’re receiving a text message, you can do the following:</div>

                  <div>
                  <li>Reply  with “👍” if you like the message.</li>
                  <li>Reply  with “❤️” if you love the message.</li>
                  <li>Reply  with “✋” to stop receving messages.</li>
                  </div>
                </div>
                <div>
                   {/* Arrow functions here */}
                <button onClick={() => this.setState({question:question-1})}> Left Arrow</button>
                <button onClick={() => this.setState({question:0})}> Right Arrow</button>
                </div>
              </div>
            </div>
            )
              }

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
              <button onClick={() => this.setState({question:question+1})}>?</button>

            {helpSection}

            {signedUp ?
              <div className="helpCopy">
                `We sent a confirmation code to the number you provided.
              Please enter it below.`
              </div> 
            :
              <div className="helpCopy">
                `Every day, we’ll send a simple mission via text. Solve it and get a chance to get selected. If selected, you can send a text to everyone subscribed!`
              </div>
            }
          </div>

      <div>
        <fieldset>
          <legend>Input</legend>

          <input className="numberInput"
                  onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
                  }}/>
        </fieldset>
      </div>

    {signedUp ?
    <button onClick={() => this.setState({confirmationScreen:true})}> Confirm</button>
    :
    <button onClick={() => this.setState({signedUp:true})}>Sign me up!</button>
    }
    </div>
    }
    </div>
  );
};
}

export default Help;