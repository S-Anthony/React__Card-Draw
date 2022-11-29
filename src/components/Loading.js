import React from "react";

import "./Loading.css";

export class Loading extends React.Component {
  render() {
    const { isLoading } = this.props;
    return (
      <React.Fragment>
        {isLoading && (
          <div className={"loading-screen"}>
            <div className="lds-heart">
              <div></div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
