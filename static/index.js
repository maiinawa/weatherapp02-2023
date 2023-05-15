import "../src/main.css"
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

const apiKey = "f923dab56802811e05570d441579986d";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?&lang=fr&units=metric&q=";
const searchBox  = document.querySelector(".search input");
const searchBtn  = document.querySelector(".search button")


async function checkWeather(location){
    const response = await fetch(apiURL + location + `&appid=${apiKey}`);

    if(response.status === 404 || response.status === 400){
        document.querySelector('#location').innerHTML = "Invalid Location"

        document.querySelector(".moreInfos").style.display = "none"
        document.querySelector("#temp").style.display = "none"


    } else {
        var data = await response.json();        
        document.querySelector(".moreInfos").style.display = "flex"
        document.querySelector("#temp").style.display = "inline"

        document.querySelector("#location").innerHTML = data.name
        document.querySelector("#temp").innerHTML = Math.round(data.main.temp)  + ' °c'
        document.querySelector("#humidty").innerHTML = data.main.humidity
        document.querySelector("#wind").innerHTML = data.wind.speed


        //modifie l'icône météo selon les données
/*         if(data.weather[0].main === "Clouds"){
            document.querySelector("#weatherIcon").innerHTML = `<i class="fa-solid fa-cloud"></i>`
        }
        if(data.weather[0].main === "Clear"){
            document.querySelector("#weatherIcon").innerHTML = `<i class="fa-solid fa-sun"></i>`
        }
        if(data.weather[0].main === "Snow"){
            document.querySelector("#weatherIcon").innerHTML = `<i class="fa-regular fa-snowflake"></i>`
        }
        if(data.weather[0].main === "Mist"){
            document.querySelector("#weatherIcon").innerHTML = `<i class="fa-solid fa-smog"></i>`
        }
        if(data.weather[0].main === "Rain"){
            document.querySelector("#weatherIcon").innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`
        }
        if(data.weather[0].main === "Drizzle"){
            document.querySelector("#weatherIcon").innerHTML = `<i class="fa-solid fa-cloud-sun-rain"></i>`
        }
        if(data.weather[0].main === "Thunderstorm"){
            document.querySelector("#weatherIcon").innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`
        } */

        switch (data.weather[0].main){
            case "Clouds":
            document.querySelector("#weatherIcon").innerHTML = `<i class="fa-solid fa-cloud"></i>`
            case "Clear":
            document.querySelector("#weatherIcon").innerHTML = `<i class="fa-solid fa-sun"></i>`
            case "Snow":
            document.querySelector("#weatherIcon").innerHTML = `<i class="fa-regular fa-snowflake"></i>`            
            case "Mist":
            document.querySelector("#weatherIcon").innerHTML = `<i class="fa-solid fa-smog"></i>`
            case "Rain":
            document.querySelector("#weatherIcon").innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`
            case "Drizzle":
            document.querySelector("#weatherIcon").innerHTML = `<i class="fa-solid fa-cloud-sun-rain"></i>`
            case "Thunderstorm":
            document.querySelector("#weatherIcon").innerHTML = `<i class="fa-solid fa-cloud"></i>`


        }

    }
}

    //recherche la météo au click sur la loupe ou en pressant "Entrer"
window.onload = searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value)
})
document.addEventListener('keydown', function(eventkey){
    if (eventkey.key === 'Enter'){
        checkWeather(searchBox.value)    
    }
  })
