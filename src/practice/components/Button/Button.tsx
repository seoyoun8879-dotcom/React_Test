import style from "./Button.module.scss";

type ButtonType = {
  clickCount: number;
  onClick: () => void;
  isEnd: boolean;
};

function Button({ clickCount, onClick, isEnd }: ButtonType) {
  return (
    <div
      className={`${style.btn} ${isEnd ? style.disable : ""}`}
      onClick={onClick}
    >
      {isEnd ? (
        <p className={style.text}>Cannot click (Total count: {clickCount})</p>
      ) : (
        <>
          <p className={style.text}>Click here</p>
          <p className={style.count}>{clickCount}</p>
        </>
      )}
    </div>
  );
}

export default Button;
