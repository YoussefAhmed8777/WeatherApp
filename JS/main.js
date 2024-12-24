// API KEY : bc1qvkqpuu4fly6lwaq4lvk7ycplsr974856h9pjmq
// API : https://api.weatherapi.com/v1/forecast.json?q=cairo&days=3&key=bc1qvkqpuu4fly6lwaq4lvk7ycplsr974856h9pjmq

const findLocation = document.getElementById('findLocation');
const links = document.querySelectorAll('.nav-link');

for (let i=0; i < links.length; i++){
  links[i].addEventListener('click', function(){
    links.forEach(function(link){
      link.classList.remove('active');
    });
    links.classList.add('active');
  });
};

findLocation.addEventListener('input', function(e){
  console.log(e.target.value);
  getData(e.target.value);
});

async function getDataApi(cityName){
  if (cityName.length > 2) {
    let response = await fetch (`https://api.weatherapi.com/v1/forecast.json?q=${cityName}&days=3&key=bc1qre8jdw2azrg6tf49wmp652w00xltddxmpk98xp`);
    // console.log(response);
    let data= await response.json();
    console.log(data);
    displayData(data);
  }
};
getDataApi();

function displayData(data){
  let dateToday = new Date(data.current.last_updated);
  // console.log(dateToday.getDate());
  document.getElementById('todayName').innerHTML = dateToday.toLocaleString('en-us',{weekday:'long'});
  document.getElementById('todayDate').innerHTML = dateToday.getDate()+' '+dateToday.toLocaleString('en-us',{month:'long'});
  document.getElementById('location').innerHTML = data.location.name;
  document.getElementById('todayTemp').innerHTML = data.current.temp_c;

  let container='';

  for (let i = 1; i <= 2; i++) {
    let dateNext = new Date(data.forecast.forecastday[i].date);
    container = `
          <div class="cards-content p-4 rounded-3 text-white text-center h-100">
            <div class="day">${dateNext.toLocaleString('en-us',{weekday:'long'})}</div>
            <div class="fs-1">${data.forecast.forecastday[i].day.maxtemp_c} <sup>o</sup>C</div>
            <div class="fs-1">${data.forecast.forecastday[i].day.mintemp_c} <sup>o</sup>C</div>
            <div class="text-primary">${data.forecast.forecastday[i].day.condition.text}</div>
          </div>
    `
    document.querySelectorAll('.card-days')[i-1].innerHTML = container;
  };
};

if (navigator.geolocation){
  navigator.geolocation.getCurrentPosition(function(position){
    console.log(position);
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getDataApi(`${latitude},${longitude}`)
  });
};