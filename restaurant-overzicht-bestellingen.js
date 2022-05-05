

// haalt restaurantid op uit url.
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const restaurantid = parseInt(urlParams.get("id"), 10);

// template voor lijstitems van bestelling
function template_bestelling(bestelling, bestellingInhoud) {
  
    return `
    <div class="bestelling">
        <div>
            <h3>Bestelgegevens</h3>
            <p>#${bestelling.id}</p>
            <p>Tijdstip: ${bestelling.tijdstip}</p>
            <p>Status:${bestelling.status}</p>
            <p>Betaald: ${bestelling.betaald}</p>
        </div>
        <div>

            <h3>Klantgegevens</h3>
            <p>Naam: ${bestelling.klant.voornaam} ${bestelling.klant.achternaam}</p>
            <p>Afleveradres: ${bestelling.klant.adress}, ${bestelling.klant.postcode}</p>
            <p>Telefoonnummer:</p>
            <p>email: ${bestelling.klant.email}</p>


        </div>
        <div>

            <h3>Gerechten</h3>
            
            <ul>
            ${bestellingInhoud}
            </ul>
       


        </div>


        <button>
            Bestelling annuleren
        </button>
        <button>
            Bestelling bereid
        </button>
        <button>
            Bezorger toewijzen
        </button>

    </div>`

}

// template voor gerechtenitems van bestelling
function template_gerecht(gerecht) {
  
    return `<li>   
    <div>   
            <p>${gerecht.naam}</p>
   
        </div>

         


    </li>`

}


        // hier wordt de restaurantnaam opgehaald uit DATABASE en aan bezNav gegeven.
        fetch("https://backendyc2204bezorging.azurewebsites.net/restaurantbyid/" + restaurantid)
            //fetch("https://localhost:8080/restaurantbyid/" + restaurantid)
            .then((response) => response.json())
            .then((restaurant) => {
                let restaurantnaam = restaurant.naam;
                const bezNav = document.querySelector("bez-nav");
                bezNav.title = restaurantnaam + " - Adminpagina - Bestellingoverzicht";
            })
            

    //   hier worden de bestellingen van het restaurant opgehaald uit DATABASE en in lijstitems gestopt.
        fetch("https://backendyc2204bezorging.azurewebsites.net/geefbestellingenvanres/" + restaurantid)
            //fetch("https://localhost:8080/toonmenu/" + restaurantid)
            .then((response) => response.json())
            .then((bestellingendata) => {
                const listEL = document.getElementById("bestellingen");
                let htmlString = "";
                
            // binnen elke bestelling wordt er ook gelooped over de lijst van gerechten die de bestelling heeft.
              bestellingendata.forEach((bestelling) => {
                    let bestellingInhoud = "";
                    bestelling.gerechten.forEach((gerecht) => {
                    console.log("Er gebeurt iets.")
                    bestellingInhoud += template_gerecht(gerecht);

                    
                  })

                    htmlString += template_bestelling(bestelling, bestellingInhoud);
                })
                listEL.innerHTML = htmlString;
            })

window.statusAnnuleren = function () {
    console.log("Hallo, dit is statusAnnuleren()")
}


window.statusBereiden = function () {
    console.log("Hallo, dit is statusBereiden")
}

window.statusReady = function () {
    console.log("Hallo, dit is statusReady()")
}