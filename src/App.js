import React, { Component } from 'react';
import Mission from './components/Mission';
import Help from './components/Help';

import './App.css';

const arrow = require('./assets/arrow.png');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // windowWidth: 0,
      // windowHeight: 0,
      numSubs: '',
      subsFetched: false,
      helpPage: false,
    };
    // this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    const numSubscribersURL = 'http://share-your-gig-dev.herokuapp.com/api/v1/subscribe/num-of-subscribed-users';
    const getMission = 'http://share-your-gig-dev.herokuapp.com/api/v1/missions/current';

    Promise.all([fetch(numSubscribersURL), fetch(getMission)])

      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([res1, res2]) => {
        this.setState({
          numSubs: res1.numSubscribedUsers,
          missionId: res2.missionId,
          subsFetched: true,
        });
      // set state in here
      });
    // this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  // updateDimensions() {
  // const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  // const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

  // this.setState({ windowWidth, windowHeight });
  // }

  render() {
    const {
      // windowWidth,
      numSubs,
      subsFetched,
      helpPage,
      missionId,
    } = this.state;

    const styles = {
      // white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      // black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    };

    if (!subsFetched) {
      return (
        <div style={{ textAlign: 'center' }}>
          <h1> Hi!</h1>
        </div>
      );
    }

    const dateObj = new Date();
    // Request a weekday along with a long date
    const options = {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    };

    const date = dateObj.toLocaleString('en-US', options);

    return (
      <div className="main">
        {helpPage
          ? (
            <div>
              <button
                type="button"
                onClick={() => this.setState({ helpPage: false })}
                style={{
                  position: 'fixed',
                  top: '10vh',
                  left: '5vh',
                }}
              >
                <img src={arrow} alt="Back" />
              </button>
              <Help numSubs={numSubs} styles={styles} />
            </div>
          )
          : (
            <div className="mainPage">
              <header>
                The date today is
                <br />
                {date}
              </header>
              <Mission missionId={missionId} className="mission" />
              <button className="whatIsThis" type="button" onClick={() => this.setState({ helpPage: true })}>
                ?
              </button>
            </div>
          )}
        <footer style={{ textAlign: 'center' }}>Made by Andres Adnan Agency</footer>
      </div>
    );
  }
}

export default App;
