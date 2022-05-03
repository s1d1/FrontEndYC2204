// BestellingID uit url halen
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const bestellingid = parseInt(urlParams.get("id"), 10);

fetch("https://backendyc2204bezorging.azurewebsites.net/geefbestelling/" + bestellingid)
.then((Response) => Response.json())
.then((bestelling) => {
    console.log(bestelling.gerechten)
    let gerechten = bestelling.gerechten
    
    const listEL = document.getElementById("bestellingen");
    let htmlString = "";

    gerechten.forEach((gerecht) => {
        console.log(gerecht)
        htmlString+= template_item(gerecht)
    })
    listEL.innerHTML = htmlString;

    const El = document.getElementById("totaalprijs")
    El.innerHTML = template_totaal(gerechten);
})

document.getElementById('bevestigen').addEventListener('click', bevestigBetaling);

function template_item(gerecht) {
    return `
    <li class="flex-item">
        <div>
            <p>${gerecht.naam}</p>
            <p>Prijs: € ${gerecht.prijs}</p>
        </div>
    </li>`
}

function template_totaal(gerechten) {
    return `
    <p>
        Totaal: €${gerechten.reduce((acc, curr) => {
        return acc + (curr.prijs);
        }, 0)}
    </p>`
}

function bevestigBetaling() {
    alert("Betaling bevestigd!")
}