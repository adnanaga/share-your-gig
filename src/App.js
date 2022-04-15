import React, { Component } from "react";
import Mission from "./components/Mission";
import Help from "./components/Help";

import "./App.css"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 0,
      windowHeight: 0,
      numSubs:'',
      subsFetched:false,
      helpPage: false,
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);

    let numSubscribersURL = 'http://share-your-gig-dev.herokuapp.com/api/v1/subscribe/num-of-subscribed-users'

    fetch(numSubscribersURL)
    .then(response => response.json())
    .then(data => this.setState({ numSubs: data.numSubscribedUsers, subsFetched:true}));
    
    let getMission = 'http://share-your-gig-dev.herokuapp.com/api/v1/missions/current'

    fetch(getMission)
    .then(response => response.json())
    .then(data => this.setState({ missionId: data.missionId}));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

    this.setState({ windowWidth, windowHeight });
  }


  render() {

    let { windowWidth, numSubs, subsFetched, helpPage } = this.state;

    const styles = {
      // white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      // black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    };

    if (!subsFetched) return
     <div style={{textAlign:"center"}}>
    <h1> Hi!</h1> 
    </div> ;

    return (
      <div>
        {helpPage ?
        <div>
          <button onClick={()=> this.setState({helpPage: false})}>
          Go Back
        </button>
          <Help numSubs={numSubs} styles={styles} />
        </div>
        :
        <div>
          <Mission></Mission>
          <button onClick={()=> this.setState({helpPage: true})}>
            What is this
          </button>
        </div>
        }
        <p style={{textAlign:"center"}}>Made by Andres Adnan Agency</p>
      </div>
    );
  }
}

export default App;