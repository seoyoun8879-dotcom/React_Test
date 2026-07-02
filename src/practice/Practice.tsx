import { useState } from "react";
import Button from "./components/Button/Button";
import style from "./Practice.module.scss";

function Practice() {
  const [count, setCount] = useState([0, 0, 0]);

  const handleButtonClickCount = (idx: number) => {
    setCount((prev) => prev.map((count, i) => (i === idx ? count + 1 : count)));
  };

  const handleButtonClickCountReset = () => {
    setCount([0, 0, 0]);
  };

  return (
    <div className={style.container}>
      {/* 컴포넌트 & 상태관리 (useState) */}
      <div className={`${style.content} ${style["component-and-state"]}`}>
        <p className={style["test-title"]}>컴포넌트 & 상태관리</p>

        <Button
          clickCount={count[0]}
          onClick={() => handleButtonClickCount(0)}
          isEnd={count[0] >= 5}
        ></Button>
        <Button
          clickCount={count[1]}
          onClick={() => handleButtonClickCount(1)}
          isEnd={count[1] >= 5}
        ></Button>
        <Button
          clickCount={count[2]}
          onClick={() => handleButtonClickCount(2)}
          isEnd={count[2] >= 5}
        ></Button>

        <div
          className={style["reset-btn"]}
          onClick={handleButtonClickCountReset}
        >
          RESET
        </div>
      </div>

      {/* Todo List */}
      <div className={`${style.content} ${style[""]}`}></div>
      <div className={`${style.content} ${style[""]}`}></div>
      <div className={`${style.content} ${style[""]}`}></div>
      <div className={`${style.content} ${style[""]}`}></div>
      <div className={`${style.content} ${style[""]}`}></div>
      <div className={`${style.content} ${style[""]}`}></div>
      <div className={`${style.content} ${style[""]}`}></div>
      <div className={`${style.content} ${style[""]}`}></div>
    </div>
  );
}

export default Practice;
