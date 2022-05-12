

// VARIABELEN: haalt restaurantid op uit url.
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const restaurantid = parseInt(urlParams.get("id"), 10);

// TEMPLATE: gerechtenitems
function template_gerecht(gerecht) {
    return `
    <li class="flex listitem">
        <div>
            <p class="gerecht_aanpas bold">${gerecht.naam}</p>
            <p class="gerecht_aanpas"><span class="w3-text-grey"> Prijs: </span> € ${gerecht.prijs}</p>
            <p class="gerecht_aanpas_URL"><span class="w3-text-grey">IMG-url: </span> ${gerecht.afbeelding}</p>
        </div>

        <div class="image-box-aanpassen">
            <img src=${gerecht.afbeelding}>
        </div> 
        <div class="verwijder-container">
            <button class="w3-button verwijderen" onclick="deleteGerecht(${gerecht.id})">
                Verwijderen
            </button> 
        </div>

    </li>`

}

//FUNCTIE: gerecht verwijderen

window.deleteGerecht = function (gerechtid) {
    const url = 'http://backendyc2204bezorging.azurewebsites.net/gerechtverwijderen/' +  gerechtid;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    fetch(url, options)
        .then(response => console.log(response))

}

// FUNCTIE: restaurantnaam ophalen en aan beznav geven
fetch("https://backendyc2204bezorging.azurewebsites.net/restaurantbyid/" + restaurantid)
    //fetch("https://localhost:8080/restaurantbyid/" + restaurantid)
    .then((response) => response.json())
    .then((restaurant) => {
        let restaurantnaam = restaurant.naam;
        const bezNav = document.querySelector("bez-nav");
        bezNav.title = restaurantnaam + " - Adminpagina - Gerechten toevoegen";
    })


// FUNCTIE: gerechten van restaurant ophalen en in menulijst stoppen
fetch("https://backendyc2204bezorging.azurewebsites.net/toonmenu/" + restaurantid)
    //fetch("https://localhost:8080/toonmenu/" + restaurantid)
    .then((response) => response.json())
    .then((gerechtendata) => {
        const listEL = document.getElementById("gerechten");
        let htmlString = "";
        gerechtendata.forEach((gerecht) => {
            htmlString += template_gerecht(gerecht);
        })
        listEL.innerHTML = htmlString;
    })


// FUNCTIE: formulierdata posten met fetch
// referentie: https://code-boxx.com/post-form-data-javascript-fetch/#sec-post

window.sendData = function () {
    // A GET FORM DATA
    let rawData = new FormData();
    rawData.append("naam", document.getElementById("gerechtnaam").value);
    rawData.append("prijs", document.getElementById("gerechtprijs").value);
    rawData.append("afbeelding", document.getElementById("gerechturl").value);

    // snippet om fordata te converteren in JSON
    const data = {};
    rawData.forEach((value, key) => (data[key] = value));

    const url = 'http://backendyc2204bezorging.azurewebsites.net/gerechttoevoegen/' + restaurantid;

    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    };
    // B INIT FETCH POST
    fetch(url, options)
        .then((response) => console.log(response))
    return false;
}

