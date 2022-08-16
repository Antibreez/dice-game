import PlayerCard from "./components/PlayerCard";
import { connect } from "react-redux";
import cl from "classnames";
import {
  changeFirstDice,
  changeSecondDice,
  changePlayer,
  changeCurrentSum,
  changeTotalSum,
  setWinnerStatus,
  resetGame,
  setDoubleSix,
  setGoal,
  changeTotalWins,
  changeActionStatus,
} from "./redux/actions/game";
import refresh from "./assets/img/refresh.svg";
import hold from "./assets/img/hold.png";
import { getRandomDice, randomInteger } from "./helpers/math";
import click from "./assets/sounds/click.wav";
import fail from "./assets/sounds/trambon.mp3";
import switchSound from "./assets/sounds/switch.mp3";
import applause from "./assets/sounds/applause.mp3";
import Inputmask from "inputmask";
import { useEffect } from "react";

const audioClick = new Audio(click);
const audioFail = new Audio(fail);
const audioSwitch = new Audio(switchSound);
const audioApplause = new Audio(applause);

const im = new Inputmask({
  alias: "numeric",
  allowMinus: false,
  digits: 0,
});

const dices = new Array(50).fill(null).map(() => {
  const size = randomInteger(50, 100);

  return {
    animationDuration: randomInteger(10, 50) / 10,
    left: randomInteger(5, 95),
    width: size,
    height: size,
  };
});

function App(props) {
  const {
    currentPlayer,
    changePlayer,
    players,
    diceFirst,
    diceSecond,
    goal,
    isWinner,
    changeFirstDice,
    changeSecondDice,
    changeCurrentSum,
    changeTotalSum,
    changeTotalWins,
    setWinnerStatus,
    resetGame,
    isDoubleSix,
    setDoubleSix,
    setGoal,
    changeActionStatus,
    actionStatus,
  } = props;

  const onDiceRoll = () => {
    changeFirstDice(0);
    changeSecondDice(0);
    setTimeout(() => {
      const a = getRandomDice();
      const b = getRandomDice();
      changeFirstDice(a);
      changeSecondDice(b);

      if (a === 6 && b === 6) {
        audioFail.play();
        setDoubleSix(true);
        changeCurrentSum(0);
        changeActionStatus(true);

        setTimeout(() => {
          changeFirstDice(0);
          changeSecondDice(0);
          changePlayer(currentPlayer === 1 ? 2 : 1);
          setDoubleSix(false);
          changeActionStatus(false);
        }, 6000);
      } else {
        audioClick.play();
        changeCurrentSum(players[currentPlayer].currentCount + a + b);
      }
    }, 100);
  };

  const onHold = () => {
    const x = players[currentPlayer].currentCount;
    const sum = players[currentPlayer].totalCount + x;
    changeTotalSum(sum);

    if (sum >= goal) {
      setWinnerStatus(true);
      const wins = +players[currentPlayer].totalWins + 1;
      changeTotalWins(wins);
      localStorage.setItem(`player${currentPlayer}`, wins);
      audioApplause.play();
    } else {
      changeCurrentSum(0);
      changePlayer(currentPlayer === 1 ? 2 : 1);
      audioSwitch.play();
      changeFirstDice(0);
      changeSecondDice(0);
    }
  };

  const onGameReset = () => {
    resetGame();
  };

  const onGoalChange = (e) => {
    const amount = e.target.value;
    setGoal(amount);
  };

  useEffect(() => {
    im.mask(document.querySelector(".max-count"));

    changePlayer(2);
    const wins2 = localStorage.getItem(`player2`);
    changeTotalWins(wins2 ? wins2 : 0);

    changePlayer(1);
    const wins1 = localStorage.getItem(`player1`);
    changeTotalWins(wins1 ? wins1 : 0);
  }, []);

  return (
    <>
      <div className={cl("winner-window", { show: isWinner })}>
        <h2>Игрок {currentPlayer} победил!!!</h2>
        <button onClick={onGameReset}>ОК</button>
      </div>

      <div className={cl("double-six-window", { show: isDoubleSix })}>
        {dices.map((dice, idx) => {
          return (
            <div
              key={idx}
              className="dice"
              style={{
                animationDuration: `${dice.animationDuration}s`,
                left: `${dice.left}%`,
                width: `${dice.width}px`,
                height: `${dice.height}px`,
              }}
            ></div>
          );
        })}

        <div className="double-six-window-message">
          Увы! Вам выпали две <span>ШЕСТЁРКИ</span>!
          <br />
          Текущие очки сброшены, ход переходит к сопернику!
        </div>
      </div>

      <div className="field">
        <div className={cl("field-card", { current: currentPlayer === 1 })}>
          <PlayerCard
            name="Игрок 1"
            count={players[1].totalCount}
            current={players[1].currentCount}
            totalWins={players[1].totalWins}
            isCurrent={currentPlayer === 1}
            isWinning={players[1].currentCount + players[1].totalCount >= goal}
          />
        </div>
        <div className={cl("field-card", { current: currentPlayer === 2 })}>
          <PlayerCard
            name="Игрок 2"
            count={players[2].totalCount}
            current={players[2].currentCount}
            totalWins={players[2].totalWins}
            isCurrent={currentPlayer === 2}
            isWinning={players[2].currentCount + players[2].totalCount >= goal}
          />
        </div>
        <div className="field-actions">
          <button
            className="new-game-btn"
            onClick={resetGame}
            disabled={actionStatus}
          >
            Новая игра
          </button>
          <div className="dices">
            <div className="dice" data-dice={diceFirst}></div>
            <div className="dice" data-dice={diceSecond}></div>
          </div>
          <button
            className="dice-roll text-btn"
            onClick={onDiceRoll}
            disabled={actionStatus}
          >
            <img src={refresh}></img>
            Бросить кубики
          </button>
          <button
            className="dice-hold text-btn"
            onClick={onHold}
            disabled={actionStatus}
          >
            <img src={hold}></img>
            Удержать
          </button>
          <label className="max-count-label">
            <span>Финальный счёт</span>
            <input
              className="input max-count"
              defaultValue="100"
              onChange={onGoalChange}
            ></input>
          </label>
        </div>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    currentPlayer: state.game.currentPlayer,
    players: state.game.players,
    diceFirst: state.game.dices[1],
    diceSecond: state.game.dices[2],
    goal: state.game.goal,
    isWinner: state.game.isWinner,
    isDoubleSix: state.game.isDoubleSix,
    actionStatus: state.game.actionStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changePlayer: (value) => dispatch(changePlayer(value)),
    changeFirstDice: (value) => dispatch(changeFirstDice(value)),
    changeSecondDice: (value) => dispatch(changeSecondDice(value)),
    changeCurrentSum: (value) => dispatch(changeCurrentSum(value)),
    changeTotalSum: (value) => dispatch(changeTotalSum(value)),
    changeTotalWins: (value) => dispatch(changeTotalWins(value)),
    setWinnerStatus: (value) => dispatch(setWinnerStatus(value)),
    resetGame: (value) => dispatch(resetGame(value)),
    setDoubleSix: (value) => dispatch(setDoubleSix(value)),
    setGoal: (value) => dispatch(setGoal(value)),
    changeActionStatus: (value) => dispatch(changeActionStatus(value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
