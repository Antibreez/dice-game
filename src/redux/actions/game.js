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
} from "./actionTypes";

export const changePlayer = (value) => {
  return {
    type: CHANGE_PLAYER,
    payload: value,
  };
};

export const changeFirstDice = (value) => {
  return {
    type: CHANGE_FIRST_DICE,
    payload: value,
  };
};

export const changeSecondDice = (value) => {
  return {
    type: CHANGE_SECOND_DICE,
    payload: value,
  };
};

export const changeCurrentSum = (value) => {
  return {
    type: CHANGE_CURRENT_SUM,
    payload: value,
  };
};

export const changeTotalSum = (value) => {
  return {
    type: CHANGE_TOTAL_SUM,
    payload: value,
  };
};

export const setWinnerStatus = (value) => {
  return {
    type: SET_WINNER_STATUS,
    payload: value,
  };
};

export const resetGame = () => {
  return {
    type: RESET_GAME,
  };
};

export const setDoubleSix = (value) => {
  return {
    type: SET_DOUBLE_SIX,
    payload: value,
  };
};

export const setGoal = (value) => {
  return {
    type: SET_GOAL,
    payload: value,
  };
};

export const changeTotalWins = (value) => {
  return {
    type: CHANGE_TOTAL_WINS,
    payload: value,
  };
};

export const changeActionStatus = (value) => {
  return {
    type: CHANGE_ACTION_STATUS,
    payload: value,
  };
};
