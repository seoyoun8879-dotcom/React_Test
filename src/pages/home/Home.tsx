import { useNavigate } from "react-router-dom";
import style from "./Home.module.scss";

function Home() {
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      <div
        className={`${style.btn} ${style.practice}`}
        onClick={() => navigate("/practice")}
      >
        Practice
      </div>
      <div
        className={`${style.btn} ${style["layout-test"]}`}
        onClick={() => navigate("/layout-test")}
      >
        Layout Test
      </div>
      <div
        className={`${style.btn} ${style["component-test"]}`}
        onClick={() => navigate("//component-test")}
      >
        Component Test
      </div>
    </div>
  );
}

export default Home;
