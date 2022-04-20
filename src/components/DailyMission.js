import React, { Component } from 'react';

class DailyMission extends Component {
  constructor(props) {
    super(props);

    const { missionId } = this.props;
    this.state = {
      missionId,
    };
  }

  render() {
    const { checkWin } = this.props;
    const {
      missionId,
    } = this.state;

    let page = '';

    if (missionId === 'singleButton') {
      page = (
        <button
          type="button"
          className="whatIsThis"
          onClick={() => checkWin('YouWonBitch')}
        >
          Click here to try the mission

        </button>
      );

      return (
        <div>
          {page}
        </div>
      );
    }
  }
}

export default DailyMission;
