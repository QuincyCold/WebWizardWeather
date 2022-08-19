//var
let dashCardDiv=document.querySelector('.dash-card');
let cardDiv = document.querySelector('.card-fetch');
let newsDiv = document.querySelector('.news-fetch');

let dt= new Date(localStorage.getItem('choicesDt')*1000);
let temp=(localStorage.getItem('choicesT') - 273.15).toFixed(1);
let tempMin=(localStorage.getItem('choicesMin') -273.15).toFixed(1);
let tempMax=(localStorage.getItem('choicesMax') -273.15).toFixed(1) ;
let humidity=localStorage.getItem('choicesHumidity');
let cloud=localStorage.getItem('choicesCloud');
let visibility=localStorage.getItem('choicesVisibility');
let wspeed=localStorage.getItem('choicesWindSpeed');
let wdegree=localStorage.getItem('choicesWindDegree');
let pressure=localStorage.getItem('choicesPressure');
let name=localStorage.getItem('choicesName');
let description=localStorage.getItem('choicesDes');
let icon = localStorage.getItem('choicesIcon');
let mainWeather = localStorage.getItem('choicesMain');
let lat = localStorage.getItem('choicesLat');
let lon = localStorage.getItem('choicesLon');

function OutputWeather(){
  let output=``;
  output =`
      <div class="top-decor">
        <div class="top-text">
          <p>${dt.toDateString()}</p>
          <p>${name}</p>
        </div>
      </div>
      <div class="row forecast">
        <div class="col-md-6 mr1">
          <div class="row d-flex justify-content-center">
            <img class="icon-decor col-sm-6" src=" http://openweathermap.org/img/wn/${icon}@2x.png" alt="">
            <p class="col-sm-6 temp">${temp}°<span class="temp-decor">C</span></p>
          </div>
          <div class="col-sm-6 info1">
            <h1>${mainWeather}</h1>
            <p style='font-size: 20px'>${description}</p>
          </div>
        </div>
        <div class="col-md-6 mr">
          <p>Temperature max/min: ${tempMax}°C / ${tempMin} °C</p>
          <hr>
          <p>Wind and Direction: speed ${wspeed} m/s / degree ${wdegree}° </p>
          <hr>
          <p>Cloud: ${cloud}%</p>
          <hr>
          <p>Visibility: ${visibility} m</p>
          <hr>
          <p>Pressure: ${pressure} mb</p>                  <hr>
          <p>Humidity: ${humidity}%</p>
        </div>
      </div>`;
  dashCardDiv.innerHTML= output;
}

init();

function init(){
  OutputWeather();
  getWeatherCard();
  getNewsCard();
}

function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";

    if(h == 0){
        h = 12;
    }

    if(h > 12){
        h = h - 12;
        session = "PM";
    }

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;

    setTimeout(showTime, 1000);

}

showTime();

//Column 4 cards
let cardArrayWeather = [];
async function getWeatherCard(){
  let data2 = await fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon +"&appid=65c0cd2922479e62ddd6206cff203966")
   .then(res => res.json()) .then(json => json);

  console.log(data2);
  outputWeatherCard(data2);
}

function outputWeatherCard(el){
  let output = '';
  for(let i = 8; i <= 32; i+=8){
    let datetime = new Date(el.list[i].dt *1000);
    output +=  `<div class="col-lg-3 col-md-6 ">
      <div class="card col4-decor">
        <div class="info">
          <div class="title-decor">
            <h2 class="date-col4">${datetime.toDateString()}</h2>
          </div>
          <div class="ucard-decor">
            <div class="icon">

            </div>
            <div class="noidung">
              <p>Max Temp/Min Temp: ${(el.list[i].main.temp_max - 273.15).toFixed(1)}°C/ ${(el.list[i].main.temp_min - 273.15).toFixed(1)}°C</p>
              <p>Wind and direction:  speed ${el.list[i].wind.speed} m/s / degree ${el.list[i].wind.deg}° </p>
              <p>Cloud: ${el.list[i].clouds.all}% </p>
              <p>Visibility: ${el.list[i].visibility} m</p>
              <p>Pressure: ${el.list[i].main.pressure} mb</p>
              <p>Humidity: ${el.list[i].main.humidity}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  cardDiv.innerHTML = output;
}

function getNewsCard(){
  let news = fetch("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=92ade5a21f9a4b8ab7282f0567afd1ac")
  .then(res => res.json()) .then(json => json);
  console.log(news);
}

// function outputNews(){
//
// }
