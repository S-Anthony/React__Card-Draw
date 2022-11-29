import React, { Component } from "react";
import { Loading } from "../components/Loading";
import { Content } from "../components/Content";
import { Result } from "../components/Result";
import { Fail } from "../components/Fail";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as pageActions from "../actions/pageActions";

import "./App.css";

class App extends Component {
  render() {
    const { startAction, drawAction, restartAction } = this.props.pageActions;
    const { page } = this.props;

    return (
      <React.Fragment>
        <Content
          started={page.started}
          fail={page.fail}
          playerCard={page.playerCard}
          computerCard={page.computerCard}
          startAction={startAction}
          deck={page.deck}
          drawAction={drawAction}
          attempts={page.attempts}
          result={page.result}
        />
        <Loading isLoading={page.isLoading} />
        <Result
          result={page.result}
          restartAction={restartAction}
          deck={page.deck}
        />
        <Fail fail={page.fail} />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    page: state.page,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);