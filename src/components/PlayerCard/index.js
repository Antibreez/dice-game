import s from "./PlayerCard.module.scss";
import cl from "classnames";

function PlayerCard(props) {
  const { name, count, current, isCurrent, isWinning, totalWins } = props;

  return (
    <div
      className={cl(
        s.Card,
        { [s.current]: isCurrent },
        { [s.winning]: isWinning }
      )}
    >
      <h2 className={s.CardName}>{name}</h2>
      <p className={s.CardCount}>{count}</p>
      <p className={s.CardTotalWins}>Всего побед: {totalWins}</p>
      <div className={s.CardCurrent}>
        <span className={s.CardCurrentTitle}>Текущий счёт</span>
        <span className={s.CardCurrentValue}>{current}</span>
      </div>
    </div>
  );
}

export default PlayerCard;
