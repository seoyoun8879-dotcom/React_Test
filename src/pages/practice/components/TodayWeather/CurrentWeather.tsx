import style from "./CurrentWeather.module.scss";

type Props = {
  location: string;
  imgSrc: string;
  temp: number;
};

function CurrentWeather({ location, imgSrc, temp }: Props) {
  return (
    <div className={style["current-info"]}>
      <p className={style["location"]}>{location}</p>
      <img className={style["weather-img"]} src={imgSrc} />
      <p className={style["temp"]}>{temp}°C</p>
    </div>
  );
}

export default CurrentWeather;
