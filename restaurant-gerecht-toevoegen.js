
// haalt restaurantid op uit url.
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const restaurantid = parseInt(urlParams.get("id"), 10);

// hier wordt de restaurantnaam opgehaald en aan bezNav gegeven.
fetch("https://backendyc2204bezorging.azurewebsites.net/restaurantbyid/" + restaurantid)
    .then((response) => response.json())
    .then((restaurantdata) => {
        let restaurantnaam = restaurantdata.naam;
        const bezNav = document.querySelector("bez-nav");
        bezNav.title = restaurantnaam + " - Adminpagina - Gerechten toevoegen";
    })

// hier worden de restaurantgerechten opgehaald en in lijstitems gestopt.
fetch("https://backendyc2204bezorging.azurewebsites.net/toonmenu/" + restaurantid)
    .then((response) => response.json())
    .then((gerechtendata) => {
        const listEL = document.getElementById("gerechten");
        let htmlString = "";
        gerechtendata.forEach((gerecht) => {
            htmlString += template_gerecht(gerecht);
        })
        listEL.innerHTML = htmlString;

    })

// template voor lijstitems van gerechten
function template_gerecht(gerecht) {
    return `
    <li class="flex-item">
        <div>
            <p>${gerecht.naam}</p>
            <p>Prijs: € ${gerecht.prijs}</p>
        </div>

        <div>
            <img src=${gerecht.afbeelding}>
        </div> 
        <button>
            Verwijderen
        </button> 

    </li>`
}

