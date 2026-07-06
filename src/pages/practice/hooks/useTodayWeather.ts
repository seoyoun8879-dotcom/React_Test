import { useEffect, useState } from "react";

// 날씨 상태별 이미지
import clearImg from "../assets/TodayWeather/images/clear.png";
import partlyCloudyImg from "../assets/TodayWeather/images/partly-cloudy.png";
import cloudyImg from "../assets/TodayWeather/images/cloudy.png";
import rainImg from "../assets/TodayWeather/images/rain.png";

// OpenWeather API Key
const API_KEY = "ef2c1415bc8b7f5f3d15af9824372143";

// OpenWeather 날씨 상태를
// clear / partlyCloudy / cloudy / rain
// 4가지 타입으로 변환
const getWeatherType = (main: string, clouds?: number) => {
  // 비
  if (main === "Rain" || main === "Drizzle" || main === "Thunderstorm")
    return "rain";

  // 맑음
  if (main === "Clear") return "clear";

  // 구름
  if (main === "Clouds") {
    // 구름량 70% 미만 -> 조금 흐림
    if (clouds !== undefined && clouds < 70) {
      return "partlyCloudy";
    }

    // 구름량 70% 이상 -> 흐림
    return "cloudy";
  }

  // 기본값
  return "clear";
};

// 날씨 타입별 이미지 매핑
const weatherImages: Record<string, string> = {
  clear: clearImg,
  partlyCloudy: partlyCloudyImg,
  cloudy: cloudyImg,
  rain: rainImg,
};

function useTodayWeather() {
  // 현재 지역명
  const [location, setLocation] = useState("");

  // 현재 시간 날씨
  const [currentWeather, setCurrentWeather] = useState<any>(null);

  // 시간별 날씨 목록
  const [hourlyWeather, setHourlyWeather] = useState<any[]>([]);

  // 로딩 상태
  const [loading, setLoading] = useState(true);

  // 에러 상태
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 현재 위치 기반 날씨 조회
    const getWeather = () => {
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          try {
            const { latitude, longitude } = coords;

            // 현재 날씨 API
            const currentUrl =
              `https://api.openweathermap.org/data/2.5/weather` +
              `?lat=${latitude}` +
              `&lon=${longitude}` +
              `&appid=${API_KEY}` +
              `&units=metric` +
              `&lang=kr`;

            // 5일 / 3시간 단위 예보 API
            const forecastUrl =
              `https://api.openweathermap.org/data/2.5/forecast` +
              `?lat=${latitude}` +
              `&lon=${longitude}` +
              `&appid=${API_KEY}` +
              `&units=metric` +
              `&lang=kr`;

            // 좌표 -> 지역명 변환 API
            const locationUrl =
              `https://api.openweathermap.org/geo/1.0/reverse` +
              `?lat=${latitude}` +
              `&lon=${longitude}` +
              `&limit=1` +
              `&appid=${API_KEY}`;

            // 3개 API 동시 호출
            const [currentRes, forecastRes, locationRes] = await Promise.all([
              fetch(currentUrl),
              fetch(forecastUrl),
              fetch(locationUrl),
            ]);

            const currentData = await currentRes.json();
            const forecastData = await forecastRes.json();
            const locationData = await locationRes.json();

            // 현재 날씨 API 실패
            if (!currentRes.ok) {
              throw new Error(currentData.message || "현재 날씨 조회 실패");
            }

            // 예보 API 실패
            if (!forecastRes.ok) {
              throw new Error(forecastData.message || "예보 조회 실패");
            }

            // 지역 API 실패
            if (!locationRes.ok) {
              throw new Error("지역 정보 조회 실패");
            }

            if (!currentData.weather?.[0]) {
              throw new Error("현재 날씨 데이터가 없습니다.");
            }

            console.log("현재 날씨", currentData.weather[0]);

            // 현재 시간을 정시 기준으로 맞춤
            const now = new Date();
            now.setMinutes(0, 0, 0);

            // 현재 날씨 타입 계산
            const currentType = getWeatherType(
              currentData.weather[0].main,
              currentData.clouds?.all,
            );

            // 현재 시간 날씨 데이터 생성
            const currentHourWeather = {
              time: now.toISOString(),

              temp: currentData.main.temp,
              feelsLike: currentData.main.feels_like,

              description: currentData.weather[0].description,
              icon: currentData.weather[0].icon,

              image: weatherImages[currentType],
              weatherType: currentType,

              humidity: currentData.main.humidity,

              isCurrent: true,
            };

            // 오늘 날짜
            const today = new Date().toISOString().slice(0, 10);

            // 오늘 남은 시간대 예보만 추출
            const forecastList = forecastData.list
              // 오늘 날짜만
              .filter((item: any) => item.dt_txt.startsWith(today))

              // 현재 시간 이후만
              .filter((item: any) => new Date(item.dt_txt) > now)

              // 화면에서 사용할 데이터 형태로 변환
              .map((item: any) => {
                const weatherType = getWeatherType(
                  item.weather[0].main,
                  item.clouds?.all,
                );

                return {
                  time: item.dt_txt,

                  temp: item.main.temp,
                  feelsLike: item.main.feels_like,

                  description: item.weather[0].description,
                  icon: item.weather[0].icon,

                  image: weatherImages[weatherType],
                  weatherType,

                  humidity: item.main.humidity,

                  isCurrent: false,
                };
              });

            // 지역명 설정
            // 한국어 지역명 -> 기본 지역명 -> 현재 날씨 지역명
            setLocation(
              locationData[0]?.local_names?.ko ||
                locationData[0]?.name ||
                currentData.name,
            );

            // 현재 날씨 저장
            setCurrentWeather(currentHourWeather);

            // 현재 시간 + 시간별 예보 저장
            setHourlyWeather([currentHourWeather, ...forecastList]);
          } catch (error: any) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        },

        // 위치 권한 거부
        () => {
          setError("위치 권한이 필요합니다.");
          setLoading(false);
        },
      );
    };

    getWeather();
  }, []);

  return {
    location,
    currentWeather,
    hourlyWeather,
    loading,
    error,
  };
}

export default useTodayWeather;
