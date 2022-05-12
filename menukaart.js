import { renderWinkelmandje, setWinkelmandjeData } from './winkelmandje.js';


// Met Azure Backend
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const restaurantid = parseInt(urlParams.get("id"), 10);
export let restaurantbanner;

fetch("https://backendyc2204bezorging.azurewebsites.net/restaurantbyid/" + restaurantid)
.then((Response) => Response.json())
.then((data) => {
    const restaurant = data;
    var restaurantnaam = restaurant.naam;
    var openingstijden = restaurant.openingstijden;
    restaurantbanner = restaurant.banner;
    console.log(restaurantbanner)

    const headerEL = document.getElementById("header");
    headerEL.innerHTML = template_header(restaurantnaam, openingstijden, restaurantbanner);

    const restaurant_infoblok = document.getElementById("restaurantinfo");
    restaurant_infoblok.innerHTML = template_restaurant_info(restaurant);

});

function template_header(restaurantnaam, openingstijden, restaurantbanner) {
    return `
    <header class="bannerimg w3-display-container" id="home" style="--background: url('${restaurantbanner}');">
        <div class="w3-display-bottomleft w3-padding">
            <span class="w3-tag w3-xlarge">Bezorgingstijden: ${openingstijden}</span>
            </div>
            <div class="w3-display-middle w3-center" style="padding-top: 20px;">
            <span class="w3-text-white w3-hide-small font-shadow" style="font-size:100px"><b>${restaurantnaam}</b></span>
            <span class="w3-text-white w3-hide-large w3-hide-medium" style="font-size:60px"><b>${restaurantnaam}</b></span>
            <p><a href="#menu" class="w3-button w3-xlarge w3-black">Menu</a></p>
            <p><a href="#restaurantinfo" class="w3-button w3-large w3-black">Informatie</a></p>
        </div>
    </header>
  `
}

fetch("https://backendyc2204bezorging.azurewebsites.net/toonmenu/" + restaurantid)
.then((Response) => Response.json())
.then((gerechten) => {

    const listEL = document.getElementById("gerechten");
    let htmlString = "";
    gerechten.forEach((gerecht) => {
        htmlString += template_gerecht(gerecht);
    })
    listEL.innerHTML = htmlString;

    document.querySelectorAll('[data-btn-add]').forEach(btn => {
        btn.addEventListener('click', (ev) => {
            const el = ev.target;
            let data = localStorage.getItem('winkelmandje');
            if (!data) {
                data = {};  
            } else {
                data = JSON.parse(data);
            }
            const id = parseInt(el.getAttribute('data-id'), 10);
            const naam = el.getAttribute('data-naam');
            const prijs = parseFloat(el.getAttribute('data-prijs'));
            if (
                typeof data[restaurantid] === 'object' && 
                typeof data[restaurantid][id] === 'object' && 
                data[restaurantid][id].hoeveelheid
            ) {
                data[restaurantid][id].hoeveelheid++;
            } else {
                const newGerecht = {
                    naam,
                    prijs,
                    hoeveelheid: 1
                }
                if (typeof data[restaurantid] === 'object') {
                    data[restaurantid][id] = newGerecht
                } else {
                    data[restaurantid] = {
                        [id]: newGerecht
                    }
                }
            }
            setWinkelmandjeData(JSON.stringify(data));
            renderWinkelmandje(restaurantid);
        })
    })

});

function template_gerecht(gerecht) {
    return `
    <li class="menukaart-flex-item">
        <h3><b>${gerecht.naam}</b></h3> <span class="w3-right w3-tag w3-dark-grey w3-round prijs-font">€ ${gerecht.prijs}</span>
        <img class="gerecht-img" src=${gerecht.afbeelding}>
        <button class="btn-toevoegen" data-btn-add data-id="${gerecht.id}" data-prijs="${gerecht.prijs}" data-naam="${gerecht.naam}" onclick="open_winkelmandje()">
            Toevoegen
        </button>
    </li>`
}

renderWinkelmandje(restaurantid);


function template_restaurant_info(restaurant) {
    return `
        <div class="w3-content">
        <h2><b>${restaurant.naam}</b></h2>
        <div class="flex">
            <div class= "flex-column"> 
                <h3><b>Bezorgtijden</b></h3>
                <div>
                    <p>Maandag: ${restaurant.openingstijden}</p>
                    <p>Dinsdag: ${restaurant.openingstijden}</p>
                    <p>Woensdag: ${restaurant.openingstijden}</p>
                    <p>Donderdag: ${restaurant.openingstijden}</p>
                </div>
            </div>
            <div class="flex-column">
                <div>
                    <br></br>
                    <p>Vrijdag: ${restaurant.openingstijden}</p>
                    <p>Zaterdag: ${restaurant.openingstijden}</p>
                    <p>Zondag: ${restaurant.openingstijden}</p>
                </div>
            </div>

            <div class="flex-column"> 
                <h3><b>Restaurantgegevens</b></h3>
                <div>
                    <p>Adres: ${restaurant.adres}</p>
                    <p>Telefoonnummer: ${restaurant.telefoonnummer}</p>
                </div>
            </div>
        </div>
        </div>
`}