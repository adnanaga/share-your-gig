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
    // this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);

    const numSubscribersURL = 'http://share-your-gig-dev.herokuapp.com/api/v1/subscribe/num-of-subscribed-users';

    fetch(numSubscribersURL)
      .then((response) => response.json())
      .then((data) => this.setState({ numSubs: data.numSubscribedUsers, subsFetched: true }))
      .catch((err) => {
        console.log(err);
      });

    const getMission = 'http://share-your-gig-dev.herokuapp.com/api/v1/missions/current';

    fetch(getMission)
      .then((response) => response.json())
      .then((data) => this.setState({ missionId: data.missionId }))
      .catch((err) => {
        console.log(err);
      });
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

    // if (!subsFetched) {
    //   return (
    //     <div style={{ textAlign: 'center' }}>
    //       <h1> Hi!</h1>
    //     </div>
    //   );
    // }

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
                style={{ marginLeft: '10vw' }}
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
