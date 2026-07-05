import Button from "./components/Button";
import style from "./Home.module.scss";

function Home() {
  return (
    <div className={style.container}>
      <Button
        subClass="practice"
        text="Practice"
      />
      <Button
        subClass="layout-test"
        text="Layout Test"
      />
      <Button
        subClass="component-test"
        text="Component Test"
      />
    </div>
  );
}

export default Home;
