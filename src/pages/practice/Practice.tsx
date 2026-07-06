import { useState, Fragment } from "react";
// common
import Content from "./components/common/Content";

// 버튼 클릭 상태관리
import Button from "./components/Button/Button"; // component
import useButtonClickState from "./hooks/useButtonClickState"; // hook

// Todo List
import TodoList from "./components/TodoList/TodoList"; // component
import CheckList from "./components/TodoList/CheckList"; // component
import useTodoList from "./hooks/useTodoList"; // hook

// Today Weather
import CurrentWeather from "./components/TodayWeather/CurrentWeather"; // component
import HourWeatherItem from "./components/TodayWeather/HourWeatherItem"; // component
import useTodayWeather from "./hooks/useTodayWeather"; // hook

import style from "./Practice.module.scss";

function Practice() {
  // 버튼 클릭 상태관리 hooks
  const { count, handleButtonClickCount, handleButtonClickCountReset } =
    useButtonClickState();

  // Todo List 상태관리 hooks
  const {
    todos,
    inputCompleted,
    handleAddTodoItem,
    handleChangeTodo,
    handleListEmptyCheck,
    handleToggleCheck,
    handleResetTodos,
    handleEditTodos,
  } = useTodoList();

  const { location, currentWeather, hourlyWeather, loading, error } =
    useTodayWeather();

  const temps = hourlyWeather.map((weather) => weather.temp);
  const maxTemp = temps.length ? Math.max(...temps) : 0;
  const minTemp = temps.length ? Math.min(...temps) : 0;
  const middleTemp = (maxTemp + minTemp) / 2;

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
            <div className={style["option-btn"]} onClick={handleResetTodos}>
              새 TODO 작성
            </div>
            <div className={style["option-btn"]} onClick={handleEditTodos}>
              수정
            </div>
          </div>
        ) : (
          <div className={style["option-btn"]} onClick={handleListEmptyCheck}>
            완료
          </div>
        )}
      </Content>

      <Content secondClass="today-weather">
        <p className={style["test-title"]}>오늘의 날씨</p>
        <div className={style["weather-panel"]}>
          {loading ? (
            <p>날씨를 불러오는 중입니다 . . .</p>
          ) : error ? (
            <p>{error}</p>
          ) : currentWeather ? (
            <div className={style["weather-display"]}>
              <CurrentWeather
                location={location}
                imgSrc={currentWeather.image}
                temp={Math.round(currentWeather.temp)}
              />
              <div className={style["hour-info"]}>
                {hourlyWeather.map((weather, _) => (
                  <HourWeatherItem
                    hour={
                      weather.isCurrent
                        ? "지금"
                        : `${new Date(weather.time).getHours()}시`
                    }
                    img={weather.image}
                    temp={Math.round(weather.temp)}
                    middleTemp={middleTemp}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p>날씨 정보가 없습니다.</p>
          )}
        </div>
      </Content>
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
