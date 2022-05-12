

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
        let bzgr_view = "";
        let stts_view = "";

        // binnen elke bestelling wordt er ook gelooped over de lijst van gerechten die de bestelling heeft.
        bestellingendata.forEach((bestelling) => {
            let bestellingInhoud = "";
            bestelling.gerechten.forEach((gerecht) => {
                bestellingInhoud += template_gerecht(gerecht);
            })

            bzgr_view = setBezorger(bestelling);
            stts_view = setStatus(bestelling);

            htmlString += template_bestelling(bestelling, bestellingInhoud, stts_view, bzgr_view);
        })
        listEL.innerHTML = htmlString;
        alleBezorgers();
    })



// TEMPLATE: bestellingitems, bevat ook knoppen voor status wijzigen en bezorger koppelen
function template_bestelling(bestelling, bestellingInhoud, stts_view, bzgr_view) {
   

    return `
    <div class="bestelling" id="${bestelling.id}">
        <div>
            <h3>Bestelgegevens</h3>
            <p>#${bestelling.id}</p>
            <p>Tijdstip: ${bestelling.tijdstip}</p>
            <p>Status:${stts_view}</p>
            <p>Betaald: ${bestelling.betaald}</p>
            <p>Bezorger: ${bzgr_view}</p>
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


       
    <button button type="button" onclick="statusAnnuleren(${bestelling.id}, ${bestelling.status})">
    Bestelling annuleren
    </button>
    
    <button button type="button" onclick="statusBereiden(${bestelling.id}, ${bestelling.status})">
    Bestelling accepteren/bereiden
    </button>
    <form id="form-bezorger-koppelen" onsubmit="return statusReady(${bestelling.id}, ${bestelling.status})">
    <label>Kies bezorger:</label>
    <select class="bezorger_dropdown" id="bezorger_${bestelling.id}">
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

// FUNCTIE: vaststellen van bezorger met if-statement in geval van geen bezorger.
function setBezorger(bestelling) {
    if (bestelling.bezorger == null) {
        return 'Geen bezorger'
    }
    else {
        return bestelling.bezorger.name;
    }
}

// FUNCTIE: vertaling van statusnummers in leesbare output
function setStatus(bestelling) {
    if (bestelling.status == 0) {
        return 'Ontvangen'
    }
    else if (bestelling.status == 1) {
        return 'Bereiden'
    }
    
    else if (bestelling.status == 2) {
        return 'Klaar voor bezorging'
    }

    else if (bestelling.status == 4) {
        return 'Geannuleerd'
    }
}

// FUNCTIE: status van bestelling ophalen (werkt momenteel nog niet, andere methode gebruikt.)
window.statusBestelling = function (bestelid) {

    let bestelstatus = "";
    console.log("Initieel:" + bestelstatus);

    fetch("https://backendyc2204bezorging.azurewebsites.net/geefbestelling/" + bestelid)
        .then((response) => response.json())
        .then((bestelling) => {
            bestelstatus = bestelling.status;
            console.log("statusBestelling() return 1: " + bestelstatus) // VRAAG: Hier heeft hij wél de geüpdate bestelstatus.
         //   return bestelstatus; // (de return werkt niet, hij blijft ‘undefined’.)
    
           
        })
        console.log(bestelstatus) // VRAAG: Maar heeft hij niet meer de geüpdate bestelstatus dus níet meer. Hoe kan dat??
       
    }
    


// TEMPLATE: bezorgeritems
function template_bezorger(bezorger) {
    return `
        <option value=${bezorger.id}>${bezorger.name}</option>
        `
}






// FUNCTIES: voor het wijzigen van de status van de bestellingen.

window.statusAnnuleren = function (bestelid, bestelstatus) {
    console.log("Hallo, dit is statusAnnuleren()")
    let pathvariable = bestelid;
    console.log("Bestelid:" + bestelid)
    console.log("Huidige bestelstatus:" + bestelstatus)

    

    const url = 'https://backendyc2204bezorging.azurewebsites.net/setstatus/' + pathvariable + '/4';

    const options = {
        method: 'POST',

    };
    //B INIT FETCH POST
    fetch(url, options)
        .then((response) => response.json())
        .then((result) => {
            if (result.result == true) { // bij bestelstatus == 0
                console.log("statusAnnuleren(): Success");
                alert(`Je hebt bestelling #${bestelid} geannuleerd.`)
            }
            else {
                if (bestelstatus == 4) {
                    alert(`Je kan bestelling #${bestelid} niet meer annuleren, want hij is al geannuleerd.`);
                }
                else if (bestelstatus > 1) {
                    alert(`Je kan bestelling #${bestelid} niet meer annuleren, want hij is al geaccepteerd.`);
                }

                // else if (bestelstatus == 2) {
                //     alert(`Je kan bestelling #${bestelid} niet meer annuleren, want hij is reeds klaargemaakt.`);
                // }
                else {
                    alert(`Je kan bestelling #${bestelid} niet meer annuleren. (Onbekende reden.)`);
                   
                }

            }


        })


    return false;

}


window.statusBereiden = function (bestelid, bestelstatus) {
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
            if (result.result == true) { // bij bestelstatus == 0
                console.log("statusBereiden(): Success");
                alert(`Je hebt bestelling #${bestelid} geaccepteerd en gaat hem bereiden.`)
            }
            else {
                if (bestelstatus == 4) {
                    alert(`Je kan bestelling #${bestelid} niet accepteren, want hij is geannuleerd.`);
                }
                else if (bestelstatus > 1) {
                    alert(`Je kan bestelling #${bestelid} niet accepteren, want hij is al geaccepteerd.`);
                }

                // else if (bestelstatus == 2) {
                //     alert(`Je kan bestelling #${bestelid} niet accepteren, want hij is al bereid.`);
                // }

                else {
                    alert(`Je kan bestelling #${bestelid} niet accepteren. (Onbekende reden.)`);
                   
                }

            }
        })


    return false;

}

window.statusReady = function (bestelid, bestelstatus) {
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
            if (result.result == true) { // bij bestelstatus == 0 of bestelstatus == 1
                console.log("statusReady(): success!");
                koppelBezorger(bestelid); // Nested zodat je niet een bezorger kan toewijzen zonder dat de bestelling ook op Ready wordt gezet
            }
            else {
                if (bestelstatus == 4) {
                    alert(`Je kan bestelling #${bestelid} niet op ‘Klaar voor bezorgen" zetten, want hij is geannuleerd.`);
                }
              
                else if (bestelstatus == 2) {

                    koppelBezorger(bestelid);
                }
                else {
                    alert("De bestelling kan niet op “Klaar voor bezorgen” gezet worden. (Onbekende reden).");
                   
                }

            }


        }


        )


    return false;
}

// FUNCTIE: geselecteerde bezorger met FETCH PUT koppelen aan bestelling

window.koppelBezorger = function (bestelid) {
    // A GET FORM DATA
   
   let bezorgerid = document.getElementById("bezorger_" + bestelid).value;
   console.log(bezorgerid);
   
   const url = 'http://backendyc2204bezorging.azurewebsites.net/bezorgeraanbestelling/' +  bestelid + '/' + bezorgerid;
   
   const options = {
       method: 'PUT',
       headers: {
           'Content-Type': 'application/json'
       },
   };
   // B INIT FETCH POST
   fetch(url, options)
       .then((response) => console.log(response))
    
       alert(`Je hebt bezorger #${bezorgerid} toegewezen aan bestelling #${bestelid}`)
      
   
    return false;
   }
   