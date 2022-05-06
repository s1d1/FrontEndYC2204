import { renderWinkelmandje, setWinkelmandjeData } from './winkelmandje.js';


// Met Azure Backend
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const restaurantid = parseInt(urlParams.get("id"), 10);


fetch("https://backendyc2204bezorging.azurewebsites.net/restaurantbyid/" + restaurantid)
.then((Response) => Response.json())
.then((data) => {
    const restaurant = data;
    var restaurantnaam = restaurant.naam;
    var openingstijden = restaurant.openingstijden;

    const headerEL = document.getElementById("header");
    // let htmlTitel = "";
    // let htmlTitel = template_header(restaurantnaam, openingstijden);
    headerEL.innerHTML = template_header(restaurantnaam, openingstijden);

    // const bezNav = document.querySelector("bez-nav");
    // bezNav.title = restaurantnaam;
});

function template_header(restaurantnaam, openingstijden) {
    return `
    <div class="w3-display-bottomleft w3-padding">
        <span class="w3-tag w3-xlarge">Bezorgingstijden: ${openingstijden}</span>
        </div>
        <div class="w3-display-middle w3-center" style="padding-top: 20px;">
        <span class="w3-text-white w3-hide-small" style="font-size:100px"><b>${restaurantnaam}</b></span>
        <span class="w3-text-white w3-hide-large w3-hide-medium" style="font-size:60px"><b>${restaurantnaam}</b></span>
        <p><a href="#menu" class="w3-button w3-xlarge w3-black">Naar het menu</a></p>
    </div>
  `
}

{/* <h2 class="menukaart-header-titel">${restaurantnaam}</h2> */}

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
        <div >
            <p>${gerecht.naam}</p>
            <p>Prijs: € ${gerecht.prijs}</p>
        </div>

        <div>
            <img src=${gerecht.afbeelding}>
        </div> 
        <button class="w3-button btn-toevoegen" data-btn-add data-id="${gerecht.id}" data-prijs="${gerecht.prijs}" data-naam="${gerecht.naam}">
            Toevoegen
        </button> 
    </li>`
}

renderWinkelmandje(restaurantid);



// Met dummy data
// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const restaurantid = parseInt(urlParams.get("id"), 10);

// fetch("./data/restaurants.json")
// .then((response) => response.json())
// .then((restaurants) => {
//     const restaurant = restaurants.find(restaurants => restaurants.id === restaurantid);

//     var restaurantnaam = restaurant.naam;
//     const bezNav = document.querySelector("bez-nav");
//     console.log(restaurantnaam, bezNav);
//     bezNav.title = restaurantnaam;


//     const listEL = document.getElementById("gerechten");
//     let htmlString = "";
//     restaurant.gerechten.forEach((gerecht) => {
//         htmlString += template_gerecht(gerecht);
//     })
//     listEL.innerHTML = htmlString;

//     document.querySelectorAll('[data-btn-add]').forEach(btn => {
//         btn.addEventListener('click', (ev) => {
//             const el = ev.target;
//             let data = localStorage.getItem('winkelmandje');
//             if (!data) {
//                 data = {};  
//             } else {
//                 data = JSON.parse(data);
//             }
//             const id = parseInt(el.getAttribute('data-id'), 10);
//             const naam = el.getAttribute('data-naam');
//             const prijs = parseFloat(el.getAttribute('data-prijs'));
//             if (
//                 typeof data[restaurantid] === 'object' && 
//                 typeof data[restaurantid][id] === 'object' && 
//                 data[restaurantid][id].hoeveelheid
//             ) {
//                 data[restaurantid][id].hoeveelheid++;
//             } else {
//                 const newGerecht = {
//                     naam,
//                     prijs,
//                     hoeveelheid: 1
//                 }
//                 if (typeof data[restaurantid] === 'object') {
//                     data[restaurantid][id] = newGerecht
//                 } else {
//                     data[restaurantid] = {
//                         [id]: newGerecht
//                     }
//                 }
//             }
//             setWinkelmandjeData(JSON.stringify(data));
//             renderWinkelmandje(restaurantid);
//         })
//     })
// })


// function template_gerecht(gerecht) {
//     return `
//     <li class="flex-item">
//         <div>
//             <p>${gerecht.naam}</p>
//             <p>Prijs: € ${gerecht.prijs}</p>
//         </div>
//         <div>
//             <img src=${gerecht.afbeelding}>
//         </div> 
//         <button data-btn-add data-id="${gerecht.id}" data-prijs="${gerecht.prijs}" data-naam="${gerecht.naam}">
//             Toevoegen
//         </button> 
//     </li>`
// }

// renderWinkelmandje(restaurantid); 
