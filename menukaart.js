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
    const bezNav = document.querySelector("bez-nav");
    bezNav.title = restaurantnaam;
});

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
        <div>
            <p>${gerecht.naam}</p>
            <p>Prijs: € ${gerecht.prijs}</p>
        </div>

        <div>
            <img src=${gerecht.afbeelding}>
        </div> 
        <button data-btn-add data-id="${gerecht.id}" data-prijs="${gerecht.prijs}" data-naam="${gerecht.naam}">
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
