import React, { Component } from 'react';

class Mission extends Component {
  constructor(props) {
    super(props);

    const { missionId } = this.props;
    this.state = {
      missionId,
    };
  }

  render() {
    const { missionId } = this.state;

    return (
      <div>
        <button type="button">
          {missionId}
        </button>
      </div>
    );
  }
}

export default Mission;
