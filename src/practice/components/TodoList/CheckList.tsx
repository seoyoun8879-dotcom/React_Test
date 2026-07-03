import style from "./CheckList.module.scss";

function CheckList({
  checkItem,
  priority,
  isChecked,
  onCheck,
}: {
  checkItem: string;
  priority: string;
  isChecked: boolean;
  onCheck: () => void;
}) {
  return (
    <label
      className={`${style["check-list"]}
                  ${
                    priority === "상"
                      ? style.high
                      : priority === "중"
                        ? style.middle
                        : style.low
                  }`}
    >
      <div className={style["label-box"]}>
        <input type="checkbox" checked={isChecked} onChange={onCheck} />
        <i></i>
        <span>{checkItem}</span>
      </div>
      {(priority === "상" || priority === "중") && (
        <p className={style.priority}>{priority === "상" ? "상" : "중"}</p>
      )}
    </label>
  );
}

export default CheckList;
