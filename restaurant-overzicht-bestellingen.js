

// VARIABELE: haalt restaurantid op uit url.
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const restaurantid = parseInt(urlParams.get("id"), 10);

// FETCH + ASSIGNMENT: hier wordt de restaurantnaam opgehaald uit DATABASE en aan bezNav gegeven.
fetch("https://backendyc2204bezorging.azurewebsites.net/restaurantbyid/" + restaurantid)
    //fetch("https://localhost:8080/restaurantbyid/" + restaurantid)
    .then((response) => response.json())
    .then((restaurant) => {
        let restaurantnaam = restaurant.naam;
        const bezNav = document.querySelector("bez-nav");
        bezNav.title = restaurantnaam + " - Adminpagina - Bestellingoverzicht";
    })

// FUNCTIE: bestellingen ophalen + renderen als lijstitems
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
                bestellingInhoud += template_gerecht(gerecht);
            })

            htmlString += template_bestelling(bestelling, bestellingInhoud);
        })
        listEL.innerHTML = htmlString;
        alleBezorgers();
    })

// TEMPLATE: bestellingitems, bevat ook knoppen voor status wijzigen en bezorger koppelen
function template_bestelling(bestelling, bestellingInhoud) {

    return `
    <div class="bestelling" id="${bestelling.id}">
        <div>
            <h3>Bestelgegevens</h3>
            <p>#${bestelling.id}</p>
            <p>Tijdstip: ${bestelling.tijdstip}</p>
            <p>Status:${bestelling.status}</p>
            <p>Betaald: ${bestelling.betaald}</p>
            <p>Bezorger: ${bestelling.bezorger}</p>
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


       
    <button button type="button" onclick="statusAnnuleren(${bestelling.id})">
    Bestelling annuleren
    </button>
    
    <button button type="button" onclick="statusBereiden(${bestelling.id})">
    Bestelling accepteren/bereiden
    </button>
    <form id="form-bezorger-koppelen" onsubmit="return koppelBezorger(${bestelling.id})">
    <label>Kies bezorger:</label>
    <select class="bezorger_dropdown" id="bezorger">
    </select>
    <input type="submit" value="Bestelling klaar / bezorger toewijzen">
    </form>

    
    </div>`
}

// TEMPLATE: gerechtenitems 
function template_gerecht(gerecht) {

    return `<li>   
    <div>   
            <p>${gerecht.naam}</p>
   
        </div>

         


    </li>`

}


// FUNCTIE: bezorgers ophalen en in dropdownmenu stoppen
window.alleBezorgers = function () {
    fetch("https://backendyc2204bezorging.azurewebsites.net/toonbezorgers")
        .then((response) => response.json())
        .then((bezorgers) => {
            console.log(bezorgers)
            const dropDowns = document.getElementsByClassName('bezorger_dropdown');
            let htmlString = "";
            bezorgers.forEach((bezorger) => {
                console.log(bezorger);
                htmlString += template_bezorger(bezorger);
            })
            for (let i = 0; i < dropDowns.length; i++) {
                dropDowns[i].innerHTML = htmlString;
            }




        })
}

// FUNCTIE: geselecteerde bezorger met FETCH koppelen aan bestelling

window.koppelBezorger = function (bestellingid) {
 // A GET FORM DATA
 
 let rawData = new FormData();
 rawData.append("bezorger", document.getElementById("gerechtnaam").value);
 rawData.append("prijs", document.getElementById("gerechtprijs").value);
 rawData.append("afbeelding", document.getElementById("gerechturl").value);

 // snippet om fordata te converteren in JSON
 const data = {};
 rawData.forEach((value, key) => (data[key] = value));
 console.log(data);

}

// TEMPLATE: bezorgeritems
function template_bezorger(bezorger) {
    return `
                    <option value=${bezorger.name}>${bezorger.name}</option>
                    `
}



// FUNCTIES: voor het wijzigen van de status van de bestellingen.

window.statusAnnuleren = function (bestelid) {
    console.log("Hallo, dit is statusAnnuleren()")
    let pathvariable = bestelid;

    const url = 'https://backendyc2204bezorging.azurewebsites.net/setstatus/' + pathvariable + '/4';

    const options = {
        method: 'POST',

    };
    // B INIT FETCH POST
    fetch(url, options)
        .then((response) => response.json())
        .then((result) => {
            if (result.result == true) {
                console.log("statusAnnuleren(): Success");
            }
            else {
                alert("statusAnnuleren(): Failed");

            }


        }


        )


    return false;

}


window.statusBereiden = function (bestelid) {
    console.log("Hallo, dit is statusBereiden")

    let pathvariable = bestelid;

    const url = 'https://backendyc2204bezorging.azurewebsites.net/setstatus/' + pathvariable + '/1';

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    // B INIT FETCH POST
    fetch(url, options)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            if (result.result == true) {
                console.log("statusBereiden(): Success");
            }
            else {
                alert("statusBereiden(): Failed");
            }


        }
        )


    return false;

}

window.statusReady = function (bestelid) {
    console.log("Hallo, dit is statusReady()")

    let pathvariable = bestelid;

    const url = 'https://backendyc2204bezorging.azurewebsites.net/setstatus/' + pathvariable + '/2';

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    // B INIT FETCH POST
    fetch(url, options)
        .then((response) => response.json())
        .then((result) => {
            if (result.result == true) {
                console.log("statusReady(): success!");
            }
            else {
                alert("statusReady(): Failed");
            }


        }


        )


    return false;
}

