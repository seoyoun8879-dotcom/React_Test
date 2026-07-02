import style from "./CheckList.module.scss";

function CheckList({ checkItem, priority }: { checkItem: string; priority: string }) {
    return (
        <div className={style["check-list"]}>
            <input type="checkbox" />
            <label>{checkItem}</label>
        </div>
    );
}

export default CheckList;