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

let countriesList = [];
let latList = [20.865139, 9.602521, 16.463713, 10.924067, 18.679585,  20.959902, 16, 21.028511    , 10.045162, 16.461109, 10.964112, 22.679281, 20.351387, 21.716768, 20.962406, 10.950630, 11.375031, 21.033333, 10.762622, 10.028680, 9.251556, 9.824959, 21.626793];
let longList = [106.683830, 105.973907, 107.590866, 106.713028, 105.681335, 107.042542, 108, 105.804817, 105.746857, 107.570183, 106.856461, 106.260452, 105.221214, 104.898590, 105.698448, 107.211456, 106.131363, 105.849998, 106.660172, 105.217903, 105.513649, 105.125893, 103.158875];
let options = '';
let datalistCountry = document.getElementById('country');
let countries = [];
let choicesCountries;
loadCountries();

datalistCountry.addEventListener("click", function(event){
  for(let i=0;i<countriesList.length;i++)
  {
    if(event.target.value==countriesList[i].name)
    {
        choicesCountries=countriesList[i];
        break;
    }
  }
    country.style.display = 'none';
    localStorage.setItem("choicesName",choicesCountries.name);
    localStorage.setItem("choicesT",choicesCountries.main.temp);
    localStorage.setItem("choicesMin",choicesCountries.main.temp_min);
    localStorage.setItem("choicesMax",choicesCountries.main.temp_max);
    localStorage.setItem("choicesHumidity",choicesCountries.main.humidity);
    localStorage.setItem("choicesDt",choicesCountries.dt);
    localStorage.setItem("choicesCloud",choicesCountries.clouds.all);
    localStorage.setItem("choicesVisibility",choicesCountries.visibility);
    localStorage.setItem("choicesWindSpeed",choicesCountries.wind.speed);
    localStorage.setItem("choicesWindDegree",choicesCountries.wind.deg);
    localStorage.setItem("choicesPressure",choicesCountries.main.pressure);
    localStorage.setItem("choicesDes",choicesCountries.weather[0].description);
    localStorage.setItem("choicesIcon", choicesCountries.weather[0].icon);
    localStorage.setItem("choicesMain", choicesCountries.weather[0].main);
    localStorage.setItem("choicesLat", choicesCountries.coord.lat);
    localStorage.setItem("choicesLon", choicesCountries.coord.lon);

    window.document.location='Second.html';
});

async function loadCountries() {
  for (let i = 0; i< latList.length; i++)
  {
    countries = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + latList[i] + "&lon=" + longList[i] + "&appid=65c0cd2922479e62ddd6206cff203966")
    .then(res => res.json())
    .then(json => json);
    countriesList.push(countries);
     console.log(countries);
  }
  searchOption();
}

function searchOption(){
  for (let i = 0; i < countriesList.length; i++){
    options += '<option value="' + countriesList[i].name + '">' + countriesList[i].name +'</option>';
  }
  datalistCountry.innerHTML = options;
}

//search custom
input.addEventListener('focusin', (event) => {
  if(input.value.length == 0){
    country.style.display = "none";
  } else {
    country.style.display = "block";
  }
  input.style.borderRadius = "5px 5px 0 0";
});

input.oninput = function() {
  currentFocus = -1;
  let text = input.value.toUpperCase();
  let countOptionHide = 0;

  for (let option of country.options) {
    if(option.value.toUpperCase().indexOf(text) > -1){
      option.style.display = "block";
    }else{
      option.style.display = "none";
      countOptionHide++;
    }
  };

  if (countOptionHide == country.options.length) {
    country.style.display = "none";
  } else {
    if(text.length == 0){
      country.style.display = "none";
    } else {
      country.style.display = "block";
    }
  }
}

var currentFocus = -1;
input.onkeydown = function(e) {
  if(e.keyCode == 40){
    currentFocus++;
   addActive(country.options);
  }
  else if(e.keyCode == 38){
    currentFocus--;
    addActive(country.options);
  }
  else if(e.keyCode == 13){
    e.preventDefault();
    if (currentFocus > -1) {
      /*and simulate a click on the "active" item:*/
      if (country.options) country.options[currentFocus].click();
    }
  }
}

function addActive(x) {
  if (!x) return false;
  removeActive(x);
  if (currentFocus >= x.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = (x.length - 1);
  x[currentFocus].classList.add("active");
}

function removeActive(x) {
  for (var i = 0; i < x.length; i++) {
    x[i].classList.remove("active");
  }
}
