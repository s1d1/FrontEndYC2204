const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const bezorgid = parseInt(urlParams.get("id"), 10);
let bestellingid;

fetch("https://backendyc2204bezorging.azurewebsites.net/geefdtobestellingvanbezorger/"+bezorgid)
.then((response) => response.json())
  .then((bestellingen) => {
    const listEl = document.getElementById("list");
    let htmlString = "";
    bestellingen.forEach((bestelling) => {
    listEl.innerHTML += template(bestelling);
    
    var b = document.createElement("button");
     b.innerHTML = "Bestelling geleverd!";
     b.onclick = klikken;
     b.id = bestelling.id;
     document.getElementById("knopje").appendChild(b);
    });  
  });


function template(data)
{
    return`
    <li>
        <div class = "restitel">
            <p><b>Naam:</b> ${data.klant.voornaam} ${data.klant.achternaam}</p>
            <p><b>Adres:</b> ${data.klant.adress}, ${data.klant.postcode}</p>
        </div>
        <div>
         <span id = knopje></span>
        </div>
      </li>
     `;
}

function klikken()
{
  fetch('https://backendyc2204bezorging.azurewebsites.net/setstatus/' + this.id + '/3', { method: "POST", })
    .then((response) => response.json())
    .then((result) => {
      if (result.result == true) {
        alert("Bestelling is succesvol afgeleverd!");
        }
      else {
        alert("Bestelling is nog niet/of was al afgeleverd");

        }
    }
    )

}
