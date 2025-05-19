import instance from "./api/api";
import { useQuery } from "@tanstack/react-query";
import { useRef, useEffect, useState } from "react";
import "./App.scss";
import logo from "./assets/icons/logo.svg";
import max from "./assets/image/max.png";
import min from "./assets/image/min.png";
import rain from "./assets/image/rain.png";
import wind from "./assets/image/wind.png";

function App() {
  const [satate, setState] = useState("Qarshi");
  const [val, setVal] = useState("");

  const { data, refetch} = useQuery({
    queryKey: ["api", satate],
    queryFn: () =>
      instance.get(`/v1/forecast.json?key=${apiKey}&q=${satate}&days=${day}`),
    enabled: false,
    
    
  });
  
  
  function searchRef() {
    setState(val.trim() || "Qarshi");
  }

  useEffect(() => {
    refetch();
  }, [satate]);
  

  const apiKey = "e7f7536f27964360967121249251805";
  
  const day = 5;

  const scrollRef = useRef<HTMLDivElement>(null);

  

  const weatherData:any = data
  

  useEffect(() => {
    if (!weatherData) return;

    const slider = scrollRef.current;
    if (!slider) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      slider.classList.add("drag-active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      slider.classList.remove("drag-active");
    };

    const handleMouseUp = () => {
      isDown = false;
      slider.classList.remove("drag-active");
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mouseleave", handleMouseLeave);
    slider.addEventListener("mouseup", handleMouseUp);
    slider.addEventListener("mousemove", handleMouseMove);

    return () => {
      slider.removeEventListener("mousedown", handleMouseDown);
      slider.removeEventListener("mouseleave", handleMouseLeave);
      slider.removeEventListener("mouseup", handleMouseUp);
      slider.removeEventListener("mousemove", handleMouseMove);
    };
  }, [weatherData]);

  

  return (

    <div className="wrapper">
      <header>
        <img src={logo} alt="logo" />
        <div className="inputs">
          <input type="text" placeholder="Search Location..." onChange={(e)=>setVal(e.target.value)} />
          <button onClick={()=>searchRef()}>SUBMIT</button>
        </div>
      </header>

      {weatherData ? (
        <main>
          <div className="divayder">
            <h1>{weatherData?.current.temp_c}°C</h1>
            <div>
              <h2>
                {weatherData?.location.name}, {weatherData?.location.country}
              </h2>
              <p>{weatherData?.location.localtime}</p>
            </div>
            <img
              src={`https:${weatherData?.current.condition.icon}`}
              alt="icon"
            />
          </div>

          <div className="info">
            <h3>Weather Details...</h3>
            <div className="div">
              <div className="card">
                <h4>thunderstorm with light drizzle</h4>
                <div className="temp">
                  <p>Temp max</p>
                  <div>
                    <h5>{weatherData?.forecast.forecastday[0].day.maxtemp_c}°</h5>
                    <img src={max} alt="" />
                  </div>
                </div>
                <div className="temp">
                  <p>Temp min</p>
                  <div>
                    <h5>{weatherData?.forecast.forecastday[0].day.maxtemp_c}°</h5> 
                    <img src={min} alt="" />
                  </div>
                </div>
                <div className="temp">
                  <p>Humidity</p>
                  <div>
                    <h5>{weatherData?.current.humidity}%</h5>
                    <img src={rain} alt="" />
                  </div>
                </div>
                <div className="temp">
                  <p>Wind</p>
                  <div>
                    <h5>{weatherData?.current.wind_kph} km/h</h5>
                    <img src={wind} alt="" />
                  </div>
                </div>
              </div>
            </div>

            <div className="line"></div>

            <div className="hourly">
              <h3>Hourly Forecast</h3>
              <div className="hourly-cards" ref={scrollRef}>
                {weatherData?.forecast.forecastday[0].hour.map(
                  (hourData: any, index: number) => (
                    <div className="hour-card" key={index}>
                      <p>{hourData.time.split(" ")[1]}</p>
                      <img
                        src={`https:${hourData.condition.icon}`}
                        alt="icon"
                      />
                      <p>{hourData.temp_c}°C</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </main>
      ) : (
        <div className="loading-card">
          <div className="skeleton skeleton-temp"></div>
          <div className="skeleton skeleton-city"></div>
          <div className="skeleton skeleton-icon"></div>
          <div className="skeleton skeleton-row"></div>
          <div className="skeleton skeleton-row"></div>
          <div className="skeleton skeleton-row"></div>
        </div>
      )}
    </div>
  );
}

export default App;
