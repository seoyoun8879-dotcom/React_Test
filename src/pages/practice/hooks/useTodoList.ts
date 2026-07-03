import { useState } from "react";

type Todo = {
  text: string;
  priority: string;
  checked: boolean;
};

function useTodoList() {
  const [inputCompleted, setInputCompleted] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([
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

  const handleResetTodos = () => {
    setTodos([{ text: "", priority: "하", checked: false }]);
    setInputCompleted(false);
  };

  const handleEditTodos = () => {
    setInputCompleted(false);
  };

  return {
    todos,
    inputCompleted,
    handleAddTodoItem,
    handleChangeTodo,
    handleListEmptyCheck,
    handleToggleCheck,
    handleResetTodos,
    handleEditTodos,
  };
}

export default useTodoList;
