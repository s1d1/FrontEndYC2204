fetch("./data/restaurants.json")
  .then((response) => response.json())
  .then((restaurants) => {
    const listEl = document.getElementById("list");
    
    let htmlString = "";
    restaurants.forEach((restaurant) => {
      htmlString += template(restaurant);
    });
    listEl.innerHTML = htmlString;
  });

function template(data) {
  return `
    <li class = "border">
      <a class="restitel" href="/menukaart.html?id=${data.id}">
        <div>
          <p class = naam>${data.naam}</p>
          <p>${data.openingstijden}</p>
          <p>${data.telefoonnummer}</p>
          <p>${data.adres}</p>
        </div>
        <div>
        <img class="plaatje" src="${data.gerechten[0].afbeelding}" />
        </div>
      </a>
    </li>
  `;

}
