import React from 'react'

import './Result.css';

export class Result extends React.Component {
    
	onRestartClick = () => {
		this.props.restartAction(this.props.deck.deck_id);
	}

	render() {
    const { result } = this.props
		return (
      <React.Fragment>
        { result && <div className={result}>
          { 
            result === 'victory' ? <p><span>Congratulations!</span> You are the mightier man ever! Even the computer can't beat you!</p> :
            result === 'defeat' ? <p><span>Sorry</span>, but you are too weak to fight the computer! If you believe in yourself, you can try again!</p> :
            result === 'draw' ? <p>You have the same result as the computer,<span> are you a computer???</span></p> : ''
          }
          <button className="button button_restart" onClick={this.onRestartClick}>Restart</button>
        </div>}
      </React.Fragment>
		)
	}
}