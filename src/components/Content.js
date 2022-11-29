import React, { Component } from "react";

import "./Content.css";
import defaultCardComputer from "../assets/img/default_card_computer.png";
import defaultCardPlayer from "../assets/img/default_card_player.png";
import heartIcon from "../assets/img/heart.png";

export class Content extends Component {
  onStartClick = () => {
    this.props.startAction();
  };

  onDrawClick = () => {
    const { deck, computerCard, attempts } = this.props;
    this.props.drawAction(deck.deck_id, computerCard, attempts);
  };

  render() {
    const { started, fail, computerCard, playerCard, result, attempts } = this.props;
    let hearts = [];
    for (let i = 1; i < 4; i++) {
      hearts.push(
        <div key={i} className={`attempts__hearts-img ${i > attempts ? "lost" : ""}`}>
          <img src={heartIcon} alt="Heart"></img>
        </div>
      );
    }

    return (
      <div className="content">
        <h1>Test your luck! Draw a better card than computer!</h1>

        {!fail && (
          <React.Fragment>
            <div className={`attempts ${started && !result && "visible"}`}>
              {started && !result && (
                <React.Fragment>
                  <p>Attempts left:</p>
                  <div className="attempts__hearts">{hearts}</div>
                </React.Fragment>
              )}
            </div>

            <div className="cards">
              <div className="card card_computer">
                <h2 className="card__title">Computer's card</h2>
                <div className="card__img">
                  <img src={computerCard ? computerCard.image : defaultCardComputer} alt="Card"></img>
                </div>
              </div>
              <div className="card card_player">
                <h2 className="card__title">Your card</h2>
                <div className="card__img">
                  <img src={playerCard ? playerCard.image : defaultCardPlayer} alt="Card"></img>
                </div>
              </div>
            </div>

            <div className="buttons">
              {started && !result && (
                <button
                  className="button button_draw"
                  onClick={this.onDrawClick}>
                  Draw a card
                </button>
              )}
              {!started && (
                <button
                  className="button button_start"
                  onClick={this.onStartClick}>
                  Start
                </button>
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}