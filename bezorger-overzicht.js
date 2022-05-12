const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const bezorgid = parseInt(urlParams.get("id"), 10);


fetch("http://localhost:8080/geefbestellingvanbezorger/"+bezorgid)
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
            <button>Afgeleverd!</button>
        </div>
     `;
}