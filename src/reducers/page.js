import {
  DEFAULT_REQUEST,
  START_SUCCESS,
  DEFAULT_FAILURE,
  DRAW_SUCCESS,
  RESTART_SUCCESS,
} from "../actions/pageActions";

const initialState = {
  started: false,
  isLoading: false,
  fail: false,
  attempts: 3,
  result: "",
};

export function pageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_REQUEST:
      return { ...state, started: true, isLoading: true };
    case START_SUCCESS:
      return {
        ...state,
        started: true,
        isLoading: false,
        deck: action.payload.deck,
        computerCard: action.payload.card,
      };
    case DRAW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        playerCard: action.payload.card,
        result: action.payload.result,
        attempts: action.payload.attempts,
      };
    case RESTART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        playerCard: null,
        computerCard: action.payload.card,
        result: "",
        attempts: 3,
      };
    case DEFAULT_FAILURE:
      return { ...state, started: true, isLoading: false, fail: true };
    default:
      return state;
  }
}
