import React from "react";

import "./Fail.css";

export class Fail extends React.Component {
  render() {
    const { fail } = this.props;
    return (
      <React.Fragment>
        {fail && (
          <div className="fail">
            <p>
              Oops! Seems like something went wrong. Refresh the page and try
              again!
            </p>
          </div>
        )}
      </React.Fragment>
    );
  }
}
