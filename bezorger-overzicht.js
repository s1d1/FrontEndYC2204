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
      htmlString += template(bestelling);

      

    });
    listEl.innerHTML = htmlString;
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
        <button button type="button" onclick="klikken(${data.id})">Bestelling afgeleverd!!</button>
        </div>
     `;
}

window.klikken = function(bestelid)
{
  fetch('https://backendyc2204bezorging.azurewebsites.net/setstatus/' + bestelid + '/3', { method: "POST", })
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
