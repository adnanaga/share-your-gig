import React, { Component } from 'react';
import DailyMission from './DailyMission';

class Mission extends Component {
  constructor(props) {
    super(props);

    const { missionId, userKey } = this.props;
    this.state = {
      missionId,
      gameState: 'normal',
      page: '',
      charCount: 0,
      userKey,
      position: -1,
      token: '',
      sentYet: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkWin = this.checkWin.bind(this);
    this.sendFinalPlug = this.sendFinalPlug.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
      charCount: event.target.value.length,
    });
  }

  async checkWin(answer) {
    const { missionId, userKey, position } = this.state;
    const particpateURL = 'http://share-your-gig-dev.herokuapp.com/api/v1/missions/participate';
    console.log(userKey);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer, missionKey: userKey }),
    };

    const response = await fetch(particpateURL, requestOptions);
    const json = await response.json();
    console.log(json);
    await this.setState({ gameState: json.response, position: json.position, token: json.successKey });
  }

  async sendFinalPlug() {
    const { value, token } = this.state;
    const particpateURL = 'http://share-your-gig-dev.herokuapp.com/api/v1/missions/winning-message/send-for-verification';

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: value, winningRedirectURLToken: token }),
    };

    const response = await fetch(particpateURL, requestOptions);
    const json = await response.json();

    if (json.response === 'success') {
      this.setState({ sentYet: true });
    }
  }

  render() {
    let {
      missionId, gameState, page, value, charCount, userKey, position,
    } = this.state;

    if (gameState === 'normal') {
      page = (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
        }}
        >

          <DailyMission missionId={missionId} checkWin={this.checkWin} />
          {/* <button type="button">
            {missionId}
          </button> */}
          {/* <button
            type="button"
            onClick={() => this.checkWin('loss')}
          >
            click here to Lose
          </button>
          <button
            type="button"
            onClick={() => this.checkWin('win')}
          >
            click here to Win
          </button>
          <button
            type="button"
            onClick={() => this.checkWin('expired')}
          >
            click here to expired
          </button>
          <button
            type="button"
            onClick={() => this.checkWin('winnerFound')}
          >
            click here to winner already found
          </button> */}
        </div>
      );
    } else if (gameState === 'MissionNotSelectedAnswer') {
      page = (
        <div className="mainCopy">
          <div style={{
            textAlign: 'center',
            fontSize: '40px',
            fontWeight: 700,
          }}
          >
            {`#${position}`}
          </div>
          <div>Try again tomorrow!</div>
        </div>
      );
    } else if (gameState === 'success') {
      page = (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-around',
        }}
        >

          <div className="helpNumber">
            You win!
          </div>

          {sentYet
            ? (
              <div>
                <div className="helpCopy">
                  Congratulations, you can now send a message to everyone.
                  <br />
                  <br />
                  Some fun examples:
                  <li>Send over your latest instagram post</li>
                  <li>Your new Spotify Track</li>
                  <li>A nice complement 😊</li>

                  <span style={{
                    color: 'red',
                    fontSize: '20px',
                  }}
                  >
                    Don’t refresh your browser.
                  </span>
                </div>
                <div>
                  <fieldset>
                    <legend>Plug Your Gig!</legend>
                    <textarea className="messageInput" value={value || ''} onChange={this.handleChange} maxLength="280" />
                  </fieldset>
                  <div
                    style={{
                      fontSize: '13px',
                      textAlign: 'right',
                    }}
                  >
                    {charCount}
                    /280

                  </div>
                </div>
                <button
                  style={{
                    padding: '10px 20px',
                    marginTop: '10px',
                    backgroundColor: '#282A37',
                    color: '#FFFFFF',
                    borderRadius: '35px',
                  }}
                  type="button"
                  onClick={() => { this.sendFinalPlug(); }}
                >
                  Send!
                </button>
              </div>
            )
            : (
              <div>
                Sent the message
              </div>
            )}
        </div>
      );
    } else if (gameState === 'winnerFound') {
      page = (
        <div className="mainCopy">
          <div style={{ textAlign: 'center' }}>Today’s mission is over. The next one will be released shortly!</div>
        </div>
      );
    } else if (gameState === 'MissionEnded') {
      page = (
        <div className="mainCopy">
          <div style={{ textAlign: 'center' }}>This link has already expired. Please try again next time!</div>
        </div>
      );
    }

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        {page}
      </div>
    );
  }
}

export default Mission;
