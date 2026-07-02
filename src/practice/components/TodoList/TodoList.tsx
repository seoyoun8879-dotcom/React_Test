import { useState } from "react";
import style from "./TodoList.module.scss";

type Todo = {
    text: string;
    priority: string;
};

type Props = {
    inputCompleted: boolean;
    todo: Todo;
    onChange: (field: "text" | "priority", value: string) => void;
};

function TodoList({ inputCompleted, todo, onChange }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleSelectItemPut = (value: string) => {
        onChange("priority", value);
        setIsOpen(false);
    };

    return (
        <div
            className={style["input-box"]}
            style={{ display: inputCompleted ? "none" : "flex" }}
        >
            <input
                type="text"
                placeholder="목록 입력"
                className={style.data}
                value={todo.text}
                onChange={(e) => onChange("text", e.target.value)}
            />

            <div className={style["select-box"]}>
                <div className={style["toggle-box"]} onClick={handleToggleDropdown}>
                    <input
                        type="text"
                        className={style["select-data"]}
                        value={todo.priority}
                        readOnly
                    />
                </div>

                <ul
                    className={style["dropdown-box"]}
                    style={{ display: isOpen ? "flex" : "none" }}
                >
                    <li className={style.item} onClick={() => handleSelectItemPut("상")}>상</li>
                    <li className={style.item} onClick={() => handleSelectItemPut("중")}>중</li>
                    <li className={style.item} onClick={() => handleSelectItemPut("하")}>하</li>
                </ul>
            </div>
        </div>
    );
}

export default TodoList;