import {
  CHANGE_ACTION_STATUS,
  CHANGE_CURRENT_SUM,
  CHANGE_FIRST_DICE,
  CHANGE_PLAYER,
  CHANGE_SECOND_DICE,
  CHANGE_TOTAL_SUM,
  CHANGE_TOTAL_WINS,
  RESET_GAME,
  SET_DOUBLE_SIX,
  SET_GOAL,
  SET_WINNER_STATUS,
} from "../actions/actionTypes";

const initialState = {
  currentPlayer: 1,
  players: {
    1: {
      totalCount: 0,
      currentCount: 0,
      totalWins: 0,
    },
    2: {
      totalCount: 0,
      currentCount: 0,
      totalWins: 0,
    },
  },
  dices: {
    1: "initial",
    2: "initial",
  },
  goal: 100,
  isWinner: false,
  isDoubleSix: false,
  actionStatus: false,
};

export default function game(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PLAYER:
      return {
        ...state,
        currentPlayer: action.payload,
      };
    case CHANGE_FIRST_DICE:
      return {
        ...state,
        dices: {
          ...state.dices,
          1: action.payload,
        },
      };
    case CHANGE_SECOND_DICE:
      return {
        ...state,
        dices: {
          ...state.dices,
          2: action.payload,
        },
      };
    case CHANGE_CURRENT_SUM:
      return {
        ...state,
        players: {
          ...state.players,
          [state.currentPlayer]: {
            ...state.players[state.currentPlayer],
            currentCount: action.payload,
          },
        },
      };
    case CHANGE_TOTAL_SUM:
      return {
        ...state,
        players: {
          ...state.players,
          [state.currentPlayer]: {
            ...state.players[state.currentPlayer],
            totalCount: action.payload,
          },
        },
      };
    case CHANGE_TOTAL_WINS:
      return {
        ...state,
        players: {
          ...state.players,
          [state.currentPlayer]: {
            ...state.players[state.currentPlayer],
            totalWins: action.payload,
          },
        },
      };
    case SET_WINNER_STATUS:
      return {
        ...state,
        isWinner: action.payload,
      };
    case RESET_GAME:
      return {
        ...state,
        currentPlayer: 1,
        players: {
          1: {
            ...state.players[1],
            totalCount: 0,
            currentCount: 0,
          },
          2: {
            ...state.players[2],
            totalCount: 0,
            currentCount: 0,
          },
        },
        dices: {
          1: "initial",
          2: "initial",
        },
        isWinner: false,
        isDoubleSix: false,
        actionStatus: false,
      };
    case SET_DOUBLE_SIX:
      return {
        ...state,
        isDoubleSix: action.payload,
      };
    case SET_GOAL:
      return {
        ...state,
        goal: action.payload,
      };
    case CHANGE_ACTION_STATUS:
      return {
        ...state,
        actionStatus: action.payload,
      };
    default:
      return state;
  }
}
