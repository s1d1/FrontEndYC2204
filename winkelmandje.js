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


// TO DO: winkelmandje naar de backend sturen 
function nieuweBestelling() {
  // RestaurantID verkrijgen (nu hardcode)
  let restaurantid = 1;

  // KlantID verkrijgen (nu hardcode)
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

gerechtenToevoegen(klantid, restaurantid);
}

function gerechtenToevoegen(klantid, id) {
  let klant_id = klantid

  // Voeg gerechten aan nieuwe bestelling

  // BestellingID verkrijgen
  let bestelling_id;

  fetch("https://backendyc2204bezorging.azurewebsites.net/geefbestellingenvanklant/" + klant_id)
  .then((Response) => Response.json())
  .then((data) => {
    var laatste_bestelling = data[(data.length - 1)]
    bestelling_id = laatste_bestelling.id
  })

  // GerechtID verkrijgen !!!!hiergebleven 
  const winkelmandjeData = localStorage.getItem('winkelmandje');
  let data;

  if (
    winkelmandjeData && // <-- not null/undefined/false
    typeof JSON.parse(winkelmandjeData) === 'object' && // <-- {}
    typeof JSON.parse(winkelmandjeData)[id] === 'object' // <-- { 0: { .. } }
  ) {
    data = Object.values(JSON.parse(winkelmandjeData));
    var inhoud_winkelmandje = data[0]
    const gerechten_ids = Object.keys(inhoud_winkelmandje)


  }


   //// Bestelling meegegeven aan betalingpagina
  // window.location.href = "/betalen.html" + bestelling_id;
}