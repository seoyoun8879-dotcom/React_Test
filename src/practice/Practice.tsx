import { useState } from "react";
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
  const [todos, setTodos] = useState([{ text: "", priority: "하" }]);

  const handleAddTodoItem = () => {
    setTodos((prev) => [...prev, { text: "", priority: "하" }]);
  };

  const handleChangeTodo = (
    idx: number,
    field: "text" | "priority",
    value: string
  ) => {
    setTodos((prev) =>
      prev.map((todo, i) =>
        i === idx ? { ...todo, [field]: value } : todo
      )
    );
  };

  return (
    <div className={style.container}>

      {/* 컴포넌트 & 상태관리 */}
      <div className={`${style.content} ${style["component-and-state"]}`}>
        <p className={style["test-title"]}>컴포넌트 & 상태관리</p>

        <Button clickCount={count[0]} onClick={() => handleButtonClickCount(0)} isEnd={count[0] >= 5} />
        <Button clickCount={count[1]} onClick={() => handleButtonClickCount(1)} isEnd={count[1] >= 5} />
        <Button clickCount={count[2]} onClick={() => handleButtonClickCount(2)} isEnd={count[2] >= 5} />

        <div className={style["reset-btn"]} onClick={handleButtonClickCountReset}>
          RESET
        </div>
      </div>

      {/* Todo List */}
      <div className={`${style.content} ${style["todo-list"]}`}>
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
                  key={idx}
                  checkItem={todo.text}
                  priority={todo.priority}
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

        <div
          className={style["complete-btn"]}
          style={{ display: todos.length >= 5 ? "grid" : "none" }}
          onClick={() => setInputCompleted((prev) => !prev)}
        >
          {inputCompleted ? "새 Todo 작성" : "완료"}
        </div>
      </div>
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