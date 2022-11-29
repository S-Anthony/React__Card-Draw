export const DEFAULT_REQUEST = "DEFAULT_REQUEST";
export const START_SUCCESS = "START_SUCCESS";
export const DEFAULT_FAILURE = "DEFAULT_FAILURE";

export const DRAW_SUCCESS = "DRAW_SUCCESS";
export const RESTART_SUCCESS = "RESTART_SUCCESS";

export function startAction() {
  return (dispatch) => {
    dispatch({
      type: DEFAULT_REQUEST,
    });

    async function getCard() {
      try {
        let deckResponce = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        let deck = await deckResponce.json();

        let cardResponce = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
        let cards = await cardResponce.json();

        if (cards.success === true) {
          dispatch({
            type: START_SUCCESS,
            payload: {
              deck: Object.assign({}, deck),
              card: Object.assign({}, cards.cards[0]),
            },
          });
        } else {
          throw new Error(`Error! Responce.success = ${cards.success}`);
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: DEFAULT_FAILURE,
        });
      }
    }
    getCard();
  };
}

export function drawAction(deck_id, computerCard, attempts) {
  return (dispatch) => {
    dispatch({
      type: DEFAULT_REQUEST,
    });

    function comparison(playerCard, computerCard) {
      let values = {
        'ACE': 14,
        'KING': 13,
        'QUEEN': 12,
        'JACK': 11,
        '10': 10,
        '9': 9,
        '8': 8,
        '7': 7,
        '6': 6,
        '5': 5,
        '4': 4,
        '3': 3,
        '2': 2,
      };

      if (values[computerCard.value] > values[playerCard.value]) {
        return -1;
      } else if (values[computerCard.value] === values[playerCard.value]) {
        return 0;
      } else if (values[computerCard.value] < values[playerCard.value]) {
        return 1;
      }
    }

    async function getCard() {
      try {
        let cardResponce = await fetch(
          `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
        );
        let cards = await cardResponce.json();

        if (cards.success === true) {
          const comparisonResult = comparison(cards.cards[0], computerCard);
          let result = "";

          if (comparisonResult === 1) {
            result = "victory";
          } else if (attempts + comparisonResult <= 0) {
            result = "defeat";
            attempts = attempts + comparisonResult;
          } else {
            attempts = attempts + comparisonResult;
          }

          dispatch({
            type: DRAW_SUCCESS,
            payload: { card: cards.cards[0], result, attempts },
          });
        } else {
          throw new Error(`Error! Responce.success = ${cards.success}`);
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: DEFAULT_FAILURE,
        });
      }
    }

    getCard();
  };
}

export function restartAction(deck_id) {
  return (dispatch) => {
    dispatch({
      type: DEFAULT_REQUEST,
    });

    async function restart() {
      try {
        let responce = await fetch(
          `https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/`
        );
        let result = await responce.json();

        if (result.success !== true) {
          throw new Error(`Error! Responce.success = ${result.success}`);
        }

        let cardResponce = await fetch(
          `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
        );
        let cards = await cardResponce.json();

        if (cards.success === true) {
          dispatch({
            type: RESTART_SUCCESS,
            payload: { card: cards.cards[0] },
          });
        } else {
          throw new Error(`Error! Responce.success = ${cards.success}`);
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: DEFAULT_FAILURE,
        });
      }
    }
    restart();
  };
}
