import React, { Component } from 'react';

const arrow = require('../assets/arrow.png');

class HelpBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: 1,
      mainCopy: '',
    };
  }

  setPage(direction) {
    const { question } = this.state;
    if (direction === 'back') {
      this.setState({ question: 0 });
    } else if (direction === 'left') {
      this.setState({ question: question - 1 });
    } else {
      this.setState({ question: question + 1 });
    }
  }

  render() {
    let {
      question,
      mainCopy,
    } = this.state;

    if (question === 1) {
      mainCopy = (
        <div className="mainCopy">
          <div className="helpCopy">

            A simple mission will be sent to your phone at a random time every day.
            For example, it might get sent at 8:00am on Tuesday and 9:00pm on Wednesday.

          </div>

          <div className="helpCopy">
            <br />
            Here are some examples of missions:
            <br />
            <b>8th person to click a button</b>
            <br />
            <b>speak a phrase</b>
            <br />
            <b>wave to the camera</b>
            <br />
            <b>trivia question</b>
            ...

          </div>
        </div>
      );
    }

    if (question === 2) {
      mainCopy = (
        <div className="mainCopy">
          <div className="helpCopy">
            When you succesfully complete the mission,
            you’ll be told whether you are the selected winner for that day.
            If you are selected,
            you’ll be allowed to send a 280-character text message to all subscribers.
          </div>
          <div className="helpCopy">
            Please be mindful of the message you send.
            If you wouldn’t send that message to your friends and family, don’t send it.
          </div>
        </div>
      );
    }

    if (question === 3) {
      mainCopy = (
        <div className="mainCopy">
          <div className="helpCopy">
            24 hours after you send the message, we’ll text you some informative data:
            <li>How many users your message was sent to.</li>
            <li>How many users opened your link, if one was specified.</li>
            <li>How many users liked your message.</li>
          </div>
        </div>
      );
    }

    if (question === 4) {
      mainCopy = (
        <div className="mainCopy">
          <div className="helpCopy">
            Reply  with “👍” if you
            <b> like </b>
            the message.
            <br />
            <br />
            Reply  with “❤️” if you
            <b> love </b>
            the message.
            <br />
            <br />
            Reply  with “✋” to
            <b> stop </b>
            receving messages.
          </div>
        </div>
      );
    }

    if (question > 4) {
      mainCopy = '';
    }

    if (mainCopy === '') {
      return ('');
    }
    return (
      <div>
        <div>
          {/* {helpSection} */}
          <div className="greyout">
            <div className="whiteBox">
              <div className="whiteBoxContents">
                <button
                  type="button"
                  onClick={() => this.setPage('back')}
                  style={{
                    display: 'flex',
                    width: 'fit-content',
                  }}
                >
                  X
                </button>
                <div className="helpNumber">
                  {question}
                  .
                </div>
                {mainCopy}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
                >
                  <button type="button" onClick={() => this.setPage('left')}>
                    <img src={arrow} alt="Backward" />
                  </button>

                  <button type="button" onClick={() => this.setPage('right')}>
                    <img src={arrow} alt="Forward" style={{ transform: 'rotate(180deg)' }} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HelpBox;
