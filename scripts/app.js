const cityForm  = document.querySelector('form');

const card = document.querySelector('.card');
const details = document.querySelector('.details');

const time = document.querySelector('img.time'); 
const weatherIcon = document.querySelector('.icon img');

const updateUI = (data) =>{

   // const cityDetails = data.cityDetails;
   // const weather = data.weather;

   const {cityDetails, weather} = data;
   console.log(data);

   //updating images and weather icon

   const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    weatherIcon.setAttribute('src', iconSrc);

   //let timeSrc = null;
  

    // if(weather.IsDayTime){
    //     timeSrc = 'img/day.svg';
    // }else{
    //     timeSrc = `img/night.svg`;
    // }

    let timeSrc = weather.IsDayTime ? 'img/day.svg':  `img/night.svg`;


    time.setAttribute('src', timeSrc);



    //Upadating the ui values
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
        </div>
    `;

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

}



const updateCity = async (city) =>{
    
    const cityDetails = await getCity(city);

    const weather = await getWeather(cityDetails.Key);

    return{cityDetails, weather}
}



cityForm.addEventListener('submit', e =>{
    //prevent the default setting

    e.preventDefault();
    
    //gets the value of the input
    const city = cityForm.city.value.trim();
    cityForm.reset();


    updateCity(city)
       .then(data => updateUI(data))
       .catch(err => console.log(err));

    //Set to local storage
    localStorage.setItem('city', city);   

});

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
     .then(data => updateUI(data))
     .catch(err => console.log(err));
}