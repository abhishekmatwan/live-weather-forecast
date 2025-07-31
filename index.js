let cityName=document.querySelector(".weather_city");
let dateTime=document.querySelector(".weather_date_time");
let w_forecast=document.querySelector(".weather_forecast");
let w_temperature=document.querySelector(".weather_temperature");
let w_icon=document.querySelector(".weather_icon");
let w_minTem=document.querySelector(".weather_min");
let w_maxTem=document.querySelector(".weather_max");

let w_feelsLike=document.querySelector(".weather_feelsLike");
let w_humidity=document.querySelector(".weather_humidity");
let w_wind=document.querySelector(".weather_wind");
let w_pressure=document.querySelector(".weather_pressure");

let citySearch=document.querySelector(".weather-search");



//to get country name
const getcountryName=(code)=>{
    return new Intl.DisplayNames([code], { type: "region" }).of(code);

}
//to get dateAndTime
    const getDateTime=(dt)=>{
     
   const curDate=new Date(dt*1000);

    const option={
      weekday:"long",
      year:"numeric",
      month:"long",
      day:"numeric",
      hour:"numeric",
      minute:"numeric",

}
     const formatter=new Intl.DateTimeFormat("en-US",option);
     return formatter.format(curDate);


   };

   let city="pune";
   //search functionality
   citySearch.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName=document.querySelector(".city_name");
    city=cityName.value;
    getWeatherData();
    cityName.value="";


   })
     

const getWeatherData=async() => {
   const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dc00a19bf05cfeeafaa2d73fb1900d31&units=metric`;


    try{

        const res=await fetch(weatherUrl);
        const data=await res.json();//to convert string in object
        const { main,name,weather,wind,sys,dt}=data;//object destructing
         
        cityName.innerHTML=`${name},${getcountryName(sys.country)}`
        dateTime.innerHTML=getDateTime(dt);

        w_forecast.innerHTML=weather[0].main;
       w_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@4x.png" alt="weather icon"/>`;

        w_temperature.innerHTML=`${main.temp}&#176`;
        w_minTem.innerHTML=`Min: ${main.temp_min.toFixed()}&#176`;
        w_maxTem.innerHTML=`Max: ${main.temp_max.toFixed()}&#176`;

        w_feelsLike.innerHTML=`${main.feels_like.toFixed(2)}&#176`;
        w_humidity.innerHTML=`${main.humidity}%`;
        w_wind.innerHTML=`${wind.speed} m/s`;
        w_pressure.innerHTML=`${main.pressure} hPa`;





    }
    catch(error){
        console.log(error);
    }

}

window.addEventListener("load", getWeatherData);





