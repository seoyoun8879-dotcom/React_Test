import { useState } from "react";
import Content from "./components/common/Content";
import Button from "./components/Button/Button";
import TodoList from "./components/TodoList/TodoList";
import CheckList from "./components/TodoList/CheckList";
import style from "./Practice.module.scss";

function Practice() {
  // 컴포넌트 & 상태관리
  const [count, setCount] = useState([0, 0, 0]);

  const handleButtonClickCount = (idx: number) => {
    setCount((prev) => prev.map((count, i) => (i === idx ? count + 1 : count)));
  };

  const handleButtonClickCountReset = () => {
    setCount([0, 0, 0]);
  };

  // Todo List
  const [inputCompleted, setInputCompleted] = useState(false);
  const [todos, setTodos] = useState([
    { text: "", priority: "하", checked: false },
  ]);

  const handleAddTodoItem = () => {
    setTodos((prev) => [...prev, { text: "", priority: "하", checked: false }]);
  };

  const handleChangeTodo = (
    idx: number,
    field: "text" | "priority",
    value: string,
  ) => {
    setTodos((prev) =>
      prev.map((todo, i) => (i === idx ? { ...todo, [field]: value } : todo)),
    );
  };

  const handleListEmptyCheck = () => {
    const filteredTodos = todos.filter((todo) => todo.text.trim() !== "");

    if (filteredTodos.length === 0) {
      alert("작성된 목록이 없습니다");
      return;
    }

    setTodos(filteredTodos);
    setInputCompleted((prev) => !prev);
  };

  const handleToggleCheck = (idx: number) => {
    setTodos((prev) =>
      prev.map((todo, i) =>
        i === idx ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  };

  return (
    <div className={style.container}>
      {/* 컴포넌트 & 상태관리 */}
      <Content secondClass="component-and-state">
        <p className={style["test-title"]}>컴포넌트 & 상태관리</p>

        <Button
          clickCount={count[0]}
          onClick={() => handleButtonClickCount(0)}
          isEnd={count[0] >= 5}
        />
        <Button
          clickCount={count[1]}
          onClick={() => handleButtonClickCount(1)}
          isEnd={count[1] >= 5}
        />
        <Button
          clickCount={count[2]}
          onClick={() => handleButtonClickCount(2)}
          isEnd={count[2] >= 5}
        />

        <div
          className={style["reset-btn"]}
          onClick={handleButtonClickCountReset}
        >
          RESET
        </div>
      </Content>
      {/* Todo List */}
      <Content secondClass="todo-list">
        <div className={style["list-conetnt"]}>
          <p className={style["test-title"]}>Todo List</p>

          <div className={style["list-box"]}>
            {todos.map((todo, idx) => (
              <TodoList
                key={idx}
                inputCompleted={inputCompleted}
                todo={todo}
                onChange={(field, value) => handleChangeTodo(idx, field, value)}
              />
            ))}

            {inputCompleted &&
              todos.map((todo, idx) => (
                <CheckList
                  checkItem={todo.text}
                  priority={todo.priority}
                  isChecked={todo.checked}
                  onCheck={() => handleToggleCheck(idx)}
                />
              ))}

            <div
              className={style["add-btn"]}
              onClick={handleAddTodoItem}
              style={{
                display: inputCompleted || todos.length >= 5 ? "none" : "grid",
              }}
            >
              +
            </div>
          </div>
        </div>

        {inputCompleted ? (
          <div className={style["option-btn-box"]}>
            <div
              className={style["option-btn"]}
              onClick={() => {
                setTodos([{ text: "", priority: "하", checked: false }]);
                setInputCompleted((prev) => !prev);
              }}
            >
              새 TODO 작성
            </div>
            <div
              className={style["option-btn"]}
              onClick={() => {
                setInputCompleted((prev) => !prev);
              }}
            >
              수정
            </div>
          </div>
        ) : (
          <div className={style["option-btn"]} onClick={handleListEmptyCheck}>
            완료
          </div>
        )}
      </Content>

      <Content secondClass=""></Content>
      <Content secondClass=""></Content>
      <Content secondClass=""></Content>
      <Content secondClass=""></Content>
      <Content secondClass=""></Content>
      <Content secondClass=""></Content>
      <Content secondClass=""></Content>
    </div>
  );
}

export default Practice;
