import React, { Component } from "react";

class Mission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      missionId: this.props.missionId
    };
  }
  
  
render(){
  let {missionId} = this.state;
  console.log(missionId)
 return(
<button>
  Click herer for the mission {missionId}
</button>
 )
};
}

export default Mission;