import style from "./HourWeatherItem.module.scss";

type Props = {
  hour: string;
  img: string;
  temp: number;
  middleTemp: number;
};

function HourWeatherItem({ hour, img, temp, middleTemp }: Props) {
  const offsetY = (middleTemp - temp) * 5;

  return (
    <div
      className={style["info-item"]}
      style={{
        transform: `translateY(${offsetY}px)`,
      }}
    >
      <div className={style["top"]}>
        <p className={style["point-hour"]}>{hour}</p>
        <img className={style["point-img"]} src={img} />
      </div>

      <div className={style["bottom"]}>
        <p className={style["point-temp"]}>{temp}°</p>
        <div className={style["point"]}></div>
      </div>
    </div>
  );
}

export default HourWeatherItem;
