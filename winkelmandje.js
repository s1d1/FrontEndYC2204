function mandjeTemplate(data){
  return `
    <ul class="aside__list">
      ${data.map((value) => {
        return `
          <li>
            <p>${value.hoeveelheid} x ${value.naam} €${value.hoeveelheid * value.prijs}</p>
          </li>
        `;
      }).reduce((acc, curr) => `${acc}${curr}`)}
    </ul>
    <p>
    Totaal: €${data.reduce((acc, curr) => {
      return acc + (curr.hoeveelheid * curr.prijs);
    }, 0)}
    </p>
    <button id="winkelmandje-clear">Winkelmandje legen</button>
    <button id="winkelmandje-betalen"> Betalen </button> 
  `
}


export function renderWinkelmandje(id) {
  const winkelmandjeEl = document.getElementById('winkelmandje-container');
  const winkelmandjeData = localStorage.getItem('winkelmandje');
  
  let aantalItems = 0;
  let template;
  let data;

  if (
    winkelmandjeData && // <-- not null/undefined/false
    typeof JSON.parse(winkelmandjeData) === 'object' && // <-- {}
    typeof JSON.parse(winkelmandjeData)[id] === 'object' // <-- { 0: { .. } }
  ) {
    data = Object.values(JSON.parse(winkelmandjeData)[id]);
    aantalItems = data.length
  }

  if (aantalItems === 0) {
    template = `<p>Uw winkelmandje is nog leeg</p>`
  } else {
    template = mandjeTemplate(data)
  }

  winkelmandjeEl.innerHTML = template;
  if (aantalItems !== 0) {
    document.getElementById('winkelmandje-clear').addEventListener('click', clearWinkelmandje);
    document.getElementById('winkelmandje-betalen').addEventListener('click', nieuweBestelling);
  }
}

export function setWinkelmandjeData(data) {
  localStorage.setItem('winkelmandje', data);
}

function clearWinkelmandje() {
  localStorage.setItem('winkelmandje', JSON.stringify({}));
  renderWinkelmandje();
}


// Functie om nieuw bestellingobject aan te maken
function nieuweBestelling() {
  // RestaurantID ophalen uit url
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const restaurantid = parseInt(urlParams.get("id"), 10);

  // KlantID verkrijgen (nu hardcode; kan pas dynamisch als we klantlogin hebben)
  let klantid = 51;

  // Maak nieuwe bestelling aan
  const url = "https://backendyc2204bezorging.azurewebsites.net/nieuwebestelling/" + klantid + "/" + restaurantid

  const nieuweBestelling = {
    "betaald": true
  };

  const options = {
    method: 'POST',
    body: JSON.stringify(nieuweBestelling),
    headers: {
        'Content-Type': 'application/json'
    },
  };

  fetch(url, options)
  .then(response => console.log(response))

  // Wacht even voordat je bestelling_id gaat zoeken vanwege database updaten; anders niet meest recente bestelling
  setTimeout(() => { bestellingID(klantid, restaurantid); }, 2000);
  
}


// Functie om bestellingid van net aangemaakte bestelling te verkrijgen
function bestellingID(klantid, id) {
  let bestelling_id;

  fetch("https://backendyc2204bezorging.azurewebsites.net/geefbestellingenvanklant/" + klantid)
  .then((Response) => Response.json())
  .then((data) => {
    let laatste_bestelling = data[(data.length - 1)]
    bestelling_id = laatste_bestelling.id
    gerechtenToevoegen(id, bestelling_id);
  })
}


// Functie om elk gerecht in het winkelmandje toe te voegen aan het bestellingobject 
function gerechtenToevoegen(id, bestellingid) {
  let winkelmandjeData = localStorage.getItem('winkelmandje');
  let winkelmandje_items;

  if (
    winkelmandjeData && // <-- not null/undefined/false
    typeof JSON.parse(winkelmandjeData) === 'object' && // <-- {}
    typeof JSON.parse(winkelmandjeData)[id] === 'object' // <-- { 0: { .. } }
    ){
    winkelmandje_items = Object.values(JSON.parse(winkelmandjeData)); // haalt data van winkelandje op
    let inhoud_winkelmandje = winkelmandje_items[0] // slaat de inhoud van winkelmandje op

    let gerecht_id;
    let gerecht;
    let hoeveelheid; 
    let url_gerechttoevoegen;
    let requestoptions = {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json'
      },
    }

    // Voor elk gerecht in het winkelmandje
    for (const key in inhoud_winkelmandje) {
      // Sla gerecht_id en hoeveelheid op
      gerecht_id = key;
      gerecht = inhoud_winkelmandje[key]
      hoeveelheid = gerecht.hoeveelheid

      url_gerechttoevoegen = "https://backendyc2204bezorging.azurewebsites.net/voeggerechttoe/" + bestellingid + "/" + gerecht_id;
      
      // Voeg elk gerecht toe voor zo vaak ze in het winkelmandje staan
      for (let i = 0; i < hoeveelheid; i ++){
        fetch(url_gerechttoevoegen, requestoptions)
        .then(response => (window.location.href = "betalen.html?id=" + bestellingid))
      }
    }
  }
}
