const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const klantid = parseInt(urlParams.get("id"), 10);
let bestelstatus;
let bestelbetaald;

fetch("https://backendyc2204bezorging.azurewebsites.net/geefbestellingenvanklant/"+klantid)
.then((response) => response.json())
  .then((bestellingen) => {
    const listEl = document.getElementById("list");
    let htmlString = "";
    bestellingen.forEach((bestelling) => {

      setStatus(bestelling);
      htmlString += template(bestelling);

    });
    listEl.innerHTML = htmlString;
  });


function template(data)
{
    return`
    <li>
    <div class = "restitel">
        <div>
            <p class = naam>${data.restaurant.naam}</p>
            <p><b>${bestelbetaald}</b></p>
            <p><b>Status:</b> ${bestelstatus}</p>
            <p><b>Bestelling is geplaatst op:</b> ${data.tijdstip}</p>
        </div>
        <div>
            <img class="plaatje" src="${data.restaurant.logo}" />
        </div>
    </div>
  </li>
     `;
}

function setStatus(data)
{
  if (data.betaald == true)
  {
    bestelbetaald = "Bestelling is betaald";
  }
  if (data.status == 0)
  {
    bestelstatus = "Ontvangen.";
  }
  else if (data.status == 1)
  {
    bestelstatus = "Wordt bereid!";
  }
  else if (data.status == 2)
  {
    bestelstatus = "Bestelling is meegegeven aan de bezorger.";
  }
  else if (data.status == 3)
  {
    bestelstatus = "Bestelling is afgerond.";
  }
  else if (data.status == 4)
  {
    bestelstatus = "Bestelling is geannuleerd";
  }

}