import React, { Component } from "react";
import Help from "./components/Help";

import "./App.css"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 0,
      windowHeight: 0
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
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

    const { windowWidth } = this.state;

    const styles = {
      // white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      // black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    };

    let numSubs = 100;

    return (
      <div>
        <Help numSubs={numSubs} styles={styles} />
        <p style={{textAlign:"center"}}>Made by Andres Adndn Agency</p>
      </div>
    );
  }
}

export default App;