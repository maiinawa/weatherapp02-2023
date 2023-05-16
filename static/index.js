/* Application météo : on écoute le click sur la loupe ou la touche "Entrée" pour récupérer les données utilisateurs
via le champ input. Ces données sont utilisées pour former la requête API. On récupère la réponse et selon 
le statut (400-404-200), on mets à jour le HTML */

const apiKey = "f923dab56802811e05570d441579986d";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?&lang=fr&units=metric&q=";
const searchBox  = document.querySelector(".search input");
const searchBtn  = document.querySelector(".search button")

//fonction app météo
async function checkWeather(location){
    
    //requête vers API
    const response = await fetch(apiURL + location + `&appid=${apiKey}`);

    if(response.status === 404 || response.status === 400){
        //ajoute un message d'erreur en lieu et place de l'absence de météo
        document.querySelector('#location').innerHTML = "Invalid Location"
        
        //masque les blocs HTML en cas d'absence de météo
        document.querySelector("#weatherIcon").style.display = "none"
        document.querySelector(".moreInfos").style.display = "none"
        document.querySelector("#temp").style.display = "none"


    } else {
        //stocke les données dans "var" si la requête est réussie
        var data = await response.json();
        
        //affiche les blocs HTML qui vont contenir les infos météo lors de la réponse 200 de la requête 
        document.querySelector(".moreInfos").style.display = "flex"
        document.querySelector("#temp").style.display = "inline"
        document.querySelector("#weatherIcon").style.display = "inherit"

         //modifie le HTML selon les données reçue via API
        document.querySelector("#location").innerHTML = data.name
        document.querySelector("#temp").innerHTML = Math.round(data.main.temp)  + ' °c'
        document.querySelector("#humidty").innerHTML = data.main.humidity
        document.querySelector("#wind").innerHTML = data.wind.speed


        //modifie l'icône météo selon les données reçues via API
       if(data.weather[0].main === "Clouds"){
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
        }
        
        /*switch (data.weather[0].main){
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
        }*/

    }
}

    //écoute user input et lance la fonction pour récupérer les données météo et les afficher
    //au click sur la loupe ou en pressant la touche "Entrée"
window.onload = searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value)
})
document.addEventListener('keydown', function(eventkey){
    if (eventkey.key === 'Enter'){
        checkWeather(searchBox.value)    
    }
  })
