const form = document.getElementById('form');
const weatherContainer = document.getElementById('weatherContainer')
const locationInput = document.getElementById('locationInput');

const infoHeader = document.getElementById('infoHeader');
const conditionData = document.getElementById('condition');
const locationData = document.getElementById('location');

const weatherIcon = document.getElementById('weatherIcon')
const temperatureData = document.getElementById('temperature');
const feelsLikeData = document.getElementById('feelsLike');
const humidityData = document.getElementById('humidity');
const windData = document.getElementById('wind');






function fetchData(loc) {
//   weatherContainer.classList.add('active')
   
   const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=50f03ee5442a42158f2155107232205&q=${loc}&aqi=no`;
    fetch(weatherUrl)
     .then(response => {
        if(response.ok){
            return response.json();
        } else {
            throw new Error('Request failed');
        }
     })
     .then(data => {
        console.log(data);
       
        
        condition.innerHTML = data.current.condition.text;
        locationData.innerHTML = data.location.name+", "+data.location.region;


        if(data.current.condition.text === 'Overcast') {
         weatherIcon.src ='./img/overcast.svg'
        } else if (data.current.condition.text === 'Partly cloudy') {
         weatherIcon.src ='./img/partly_cloudy.svg'
        } else if (data.current.condition.text === 'Clear') {
         weatherIcon.src ='./img/clear.svg'
        } else if (data.current.condition.text === 'Sunny') {
         weatherIcon.src ='./img/sunny.svg'
        }

        temperature.innerHTML = data.current.temp_f+' °F';
        feelsLike.innerHTML = 'Feels like: '+data.current.feelslike_f;
        humidity.innerHTML =  'Humidity: '+data.current.humidity;
        wind.innerHTML = 'Wind '+data.current.wind_mph+'mph';

        
     
   
       
     })
    

     .catch(error => {
        console.log(error)
     });
}
weatherContainer.classList.add('active')
fetchData('Los Angeles')


form.addEventListener('submit', function(e){
   
   e.preventDefault();

   // Remove the "active" class
   weatherContainer.classList.remove('active');
  

   fetchData(locationInput.value);

   // Delay adding the "active" class to allow the removal animation to complete
   setTimeout(function() {
      weatherContainer.classList.add('active');
   }, .1);


})


